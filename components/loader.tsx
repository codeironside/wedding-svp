"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeartIcon, Sparkles } from "lucide-react";

// Pre-defined configurations to avoid Math.random() during SSR
const sparkleConfigs = [
  { x: 10, y: 15, size: 18, delay: 0, duration: 4.2 },
  { x: 80, y: 25, size: 22, delay: 0.3, duration: 3.8 },
  { x: 25, y: 70, size: 20, delay: 0.6, duration: 4.5 },
  { x: 75, y: 60, size: 16, delay: 0.9, duration: 3.5 },
  { x: 50, y: 20, size: 24, delay: 1.2, duration: 4.0 },
  { x: 15, y: 85, size: 19, delay: 1.5, duration: 3.9 },
  { x: 90, y: 80, size: 21, delay: 1.8, duration: 4.3 },
  { x: 60, y: 90, size: 17, delay: 0.2, duration: 3.7 },
  { x: 30, y: 10, size: 23, delay: 0.8, duration: 4.1 },
  { x: 85, y: 45, size: 20, delay: 1.4, duration: 3.6 },
];

const loadingTexts = [
  "Preparing your invitation...",
  "Arranging the flowers...",
  "Setting up the venue...",
  "Sending out the invites...",
  "Almost ready...",
];

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(
    "Preparing your invitation..."
  );
  const [textIndex, setTextIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    // Change loading text periodically with deterministic sequence
    const textInterval = setInterval(() => {
      setTextIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % loadingTexts.length;
        setLoadingText(loadingTexts[nextIndex]);
        return nextIndex;
      });
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#8E4585] via-[#A855A7] to-[#8E4585] flex flex-col items-center justify-center z-50">
      {/* Floating decorative elements - only render after mount */}
      <div className="absolute inset-0 overflow-hidden">
        {mounted &&
          sparkleConfigs.map((config, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${config.x}%`,
                top: `${config.y}%`,
              }}
              initial={{
                opacity: 0,
                scale: 0.5,
                y: 50,
              }}
              animate={{
                y: [50, -100, 50],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: config.duration,
                repeat: Infinity,
                delay: config.delay,
                ease: "easeInOut",
              }}
              style={{
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
              }}
            >
              <Sparkles className="text-[#FAEEC8]" size={config.size} />
            </motion.div>
          ))}
      </div>

      {/* Traditional Nigerian pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23FAEEC8' fillOpacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='50' cy='10' r='2'/%3E%3Ccircle cx='10' cy='50' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Enhanced wedding rings illustration */}
      <div className="relative mb-8">
        <motion.div
          className="relative w-32 h-32 mx-auto"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        >
          {/* First ring with gradient border */}
          <motion.div
            className="absolute top-4 left-4 w-24 h-24 rounded-full opacity-80"
            style={{
              border: "8px solid transparent",
              background: "linear-gradient(45deg, #E8C7C8, #F5D5D6) border-box",
              WebkitMask:
                "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "subtract",
            }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(232, 199, 200, 0.3)",
                "0 0 40px rgba(232, 199, 200, 0.6)",
                "0 0 20px rgba(232, 199, 200, 0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Second ring with gradient border */}
          <motion.div
            className="absolute top-6 left-6 w-20 h-20 rounded-full opacity-90"
            style={{
              border: "6px solid transparent",
              background:
                "linear-gradient(135deg, #FAEEC8, #F5E6B8) border-box",
              WebkitMask:
                "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "subtract",
            }}
            animate={{
              rotate: -360,
              boxShadow: [
                "0 0 15px rgba(250, 238, 200, 0.4)",
                "0 0 30px rgba(250, 238, 200, 0.7)",
                "0 0 15px rgba(250, 238, 200, 0.4)",
              ],
            }}
            transition={{
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              boxShadow: { duration: 2.5, repeat: Infinity },
            }}
          />

          {/* Enhanced center heart */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#FAEEC8] to-[#E8C7C8] rounded-full p-2 shadow-lg"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              scale: { duration: 2, repeat: Infinity },
              rotate: { duration: 4, repeat: Infinity },
            }}
            style={{ willChange: "transform" }}
          >
            <HeartIcon
              className="text-[#8E4585]"
              size={32}
              fill="currentColor"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced title */}
      <motion.div
        className="text-white text-3xl md:text-4xl font-bold mb-4 font-serif text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
        style={{ willChange: "transform, opacity" }}
      >
        <motion.span
          animate={{
            textShadow: [
              "0 0 10px rgba(250, 238, 200, 0.5)",
              "0 0 20px rgba(250, 238, 200, 0.8)",
              "0 0 10px rgba(250, 238, 200, 0.5)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Adeola & Abiola
        </motion.span>
      </motion.div>

      {/* Enhanced loading text with smooth transitions */}
      <motion.div
        className="text-[#FAEEC8] text-lg mb-8 text-center h-7 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ willChange: "opacity" }}
      >
        <motion.span
          key={loadingText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {loadingText}
        </motion.span>
      </motion.div>

      {/* Enhanced progress bar */}
      <div className="w-80 h-3 bg-white/20 rounded-full overflow-hidden mb-4 shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-[#FAEEC8] via-[#E8C7C8] to-[#F5D5D6] relative"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
          style={{ willChange: "transform" }}
        >
          {/* Shimmer effect on progress bar */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* Enhanced percentage display */}
      <motion.div
        className="text-white text-lg font-medium"
        animate={{
          scale: progress === 100 ? [1, 1.1, 1] : 1,
        }}
        transition={{
          scale: { duration: 0.3 },
        }}
      >
        {progress}%
      </motion.div>

      {/* Completion celebration effect */}
      {mounted && progress === 100 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
              }}
              animate={{
                x: Math.cos((i * 45 * Math.PI) / 180) * 100,
                y: Math.sin((i * 45 * Math.PI) / 180) * 100,
                opacity: [1, 0],
                scale: [0, 1.5],
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
            >
              <HeartIcon
                className="text-[#FAEEC8]"
                size={20}
                fill="currentColor"
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
