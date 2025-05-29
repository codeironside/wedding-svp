"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
  type ReactNode,
} from "react";

interface ScrollConfig {
  duration?: number;
  easing?: "easeInOut" | "easeOut" | "easeIn" | "linear" | "bounce" | "elastic";
  offset?: number;
  behavior?: "instant" | "smooth" | "auto";
}

interface SmoothScrollContextType {
  scrollToSection: (id: string, config?: ScrollConfig) => Promise<void>;
  scrollToTop: (config?: ScrollConfig) => Promise<void>;
  scrollToBottom: (config?: ScrollConfig) => Promise<void>;
  scrollBy: (amount: number, config?: ScrollConfig) => Promise<void>;
  isScrolling: boolean;
  scrollProgress: number;
  currentSection: string | null;
  registerSection: (id: string, element: HTMLElement) => void;
  unregisterSection: (id: string) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType | undefined>(
  undefined
);

// Advanced easing functions
const easingFunctions = {
  linear: (t: number) => t,
  easeIn: (t: number) => t * t,
  easeOut: (t: number) => t * (2 - t),
  easeInOut: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  bounce: (t: number) => {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
  },
  elastic: (t: number) => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    const p = 0.3;
    const a = 1;
    const s = p / 4;
    return (
      a * Math.pow(2, -10 * t) * Math.sin(((t - s) * (2 * Math.PI)) / p) + 1
    );
  },
};

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());
  const animationRef = useRef<number>();
  const intersectionObserverRef = useRef<IntersectionObserver>();

  // Enhanced scroll progress calculation
  useEffect(() => {
    const updateScrollProgress = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(Math.min(100, Math.max(0, scrolled)));
    };

    const throttledUpdateScrollProgress = throttle(updateScrollProgress, 16); // 60fps
    window.addEventListener("scroll", throttledUpdateScrollProgress, {
      passive: true,
    });
    updateScrollProgress(); // Initial calculation

    return () =>
      window.removeEventListener("scroll", throttledUpdateScrollProgress);
  }, []);

  // Section intersection observer for current section tracking
  useEffect(() => {
    intersectionObserverRef.current = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let activeSection = null;

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            activeSection = entry.target.id;
          }
        });

        if (activeSection && maxRatio > 0.3) {
          setCurrentSection(activeSection);
        }
      },
      {
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1],
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    // Observe all registered sections
    sectionsRef.current.forEach((element) => {
      intersectionObserverRef.current?.observe(element);
    });

    return () => {
      intersectionObserverRef.current?.disconnect();
    };
  }, []);

  // Register/unregister sections
  const registerSection = useCallback((id: string, element: HTMLElement) => {
    sectionsRef.current.set(id, element);
    intersectionObserverRef.current?.observe(element);
  }, []);

  const unregisterSection = useCallback((id: string) => {
    const element = sectionsRef.current.get(id);
    if (element) {
      intersectionObserverRef.current?.unobserve(element);
      sectionsRef.current.delete(id);
    }
  }, []);

  // Advanced smooth scroll function
  const smoothScrollTo = useCallback(
    (targetPosition: number, config: ScrollConfig = {}): Promise<void> => {
      return new Promise((resolve) => {
        const {
          duration = 800,
          easing = "easeInOut",
          behavior = "smooth",
        } = config;

        if (behavior === "instant") {
          window.scrollTo(0, targetPosition);
          resolve();
          return;
        }

        if (behavior === "auto") {
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
          // Estimate completion time for native smooth scroll
          setTimeout(resolve, 1000);
          return;
        }

        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const startTime = performance.now();

        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }

        setIsScrolling(true);

        const animateScroll = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          const easedProgress = easingFunctions[easing](progress);
          const currentPosition = startPosition + distance * easedProgress;

          window.scrollTo(0, currentPosition);

          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animateScroll);
          } else {
            setIsScrolling(false);
            resolve();
          }
        };

        animationRef.current = requestAnimationFrame(animateScroll);
      });
    },
    []
  );

  // Scroll to section with enhanced features
  const scrollToSection = useCallback(
    async (id: string, config: ScrollConfig = {}) => {
      const element =
        document.getElementById(id) || sectionsRef.current.get(id);
      if (!element) {
        console.warn(`Element with id "${id}" not found`);
        return;
      }

      // Smart navbar detection
      const navbar = document.querySelector(
        'header, nav, [data-navbar="true"]'
      );
      const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;

      // Smart offset calculation
      const defaultOffset = navbarHeight + 20;
      const { offset = defaultOffset } = config;

      const elementRect = element.getBoundingClientRect();
      const elementPosition = elementRect.top + window.pageYOffset;
      const targetPosition = Math.max(0, elementPosition - offset);

      await smoothScrollTo(targetPosition, config);
    },
    [smoothScrollTo]
  );

  // Scroll to top
  const scrollToTop = useCallback(
    async (config: ScrollConfig = {}) => {
      await smoothScrollTo(0, { duration: 600, easing: "easeOut", ...config });
    },
    [smoothScrollTo]
  );

  // Scroll to bottom
  const scrollToBottom = useCallback(
    async (config: ScrollConfig = {}) => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      await smoothScrollTo(maxScroll, {
        duration: 800,
        easing: "easeOut",
        ...config,
      });
    },
    [smoothScrollTo]
  );

  // Scroll by amount
  const scrollBy = useCallback(
    async (amount: number, config: ScrollConfig = {}) => {
      const currentPosition = window.pageYOffset;
      const targetPosition = Math.max(0, currentPosition + amount);
      await smoothScrollTo(targetPosition, {
        duration: 400,
        easing: "easeInOut",
        ...config,
      });
    },
    [smoothScrollTo]
  );

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere with form inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case "Home":
        case "h":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            scrollToTop({ duration: 600, easing: "easeOut" });
          }
          break;
        case "End":
        case "e":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            scrollToBottom({ duration: 800, easing: "easeOut" });
          }
          break;
        case "PageUp":
          e.preventDefault();
          scrollBy(-window.innerHeight * 0.8, {
            duration: 500,
            easing: "easeOut",
          });
          break;
        case "PageDown":
          e.preventDefault();
          scrollBy(window.innerHeight * 0.8, {
            duration: 500,
            easing: "easeOut",
          });
          break;
        case " ": // Spacebar
          if (!e.shiftKey) {
            e.preventDefault();
            scrollBy(window.innerHeight * 0.8, {
              duration: 500,
              easing: "easeOut",
            });
          } else {
            e.preventDefault();
            scrollBy(-window.innerHeight * 0.8, {
              duration: 500,
              easing: "easeOut",
            });
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollToTop, scrollToBottom, scrollBy]);

  // Mouse wheel enhancement (optional momentum scrolling)
  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout;
    let isWheeling = false;

    const handleWheel = (e: WheelEvent) => {
      // Only enhance wheel scrolling on non-mobile devices
      if (window.innerWidth < 768) return;

      clearTimeout(wheelTimeout);

      if (!isWheeling) {
        isWheeling = true;
        document.body.style.scrollBehavior = "smooth";
      }

      wheelTimeout = setTimeout(() => {
        isWheeling = false;
        document.body.style.scrollBehavior = "";
      }, 150);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(wheelTimeout);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      intersectionObserverRef.current?.disconnect();
    };
  }, []);

  const contextValue: SmoothScrollContextType = {
    scrollToSection,
    scrollToTop,
    scrollToBottom,
    scrollBy,
    isScrolling,
    scrollProgress,
    currentSection,
    registerSection,
    unregisterSection,
  };

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

// Custom hook with enhanced features
export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext);
  if (context === undefined) {
    throw new Error(
      "useSmoothScroll must be used within a SmoothScrollProvider"
    );
  }
  return context;
}

// Hook for auto-registering sections
export function useScrollSection(
  id: string,
  ref: React.RefObject<HTMLElement>
) {
  const { registerSection, unregisterSection } = useSmoothScroll();

  useEffect(() => {
    if (ref.current) {
      registerSection(id, ref.current);
      return () => unregisterSection(id);
    }
  }, [id, ref, registerSection, unregisterSection]);
}

// Utility functions
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T {
  let inThrottle: boolean;
  return ((...args: any[]) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
}

// Additional hook for scroll-triggered animations
export function useScrollTrigger(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollProgress } = useSmoothScroll();

  const ref = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { threshold }
      );

      observer.observe(node);
      return () => observer.disconnect();
    },
    [threshold]
  );

  return { ref, isVisible, scrollProgress };
}

// Hook for parallax effects
export function useParallax(speed = 0.5) {
  const [offset, setOffset] = useState(0);
  const { scrollProgress } = useSmoothScroll();

  useEffect(() => {
    const updateOffset = () => {
      const scrolled = window.pageYOffset;
      setOffset(scrolled * speed);
    };

    const throttledUpdate = throttle(updateOffset, 16);
    window.addEventListener("scroll", throttledUpdate, { passive: true });
    return () => window.removeEventListener("scroll", throttledUpdate);
  }, [speed]);

  return offset;
}
