import type React from "react";
import "@/app/globals.css";
import type { Metadata, Viewport } from "next";
import { Mona_Sans as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap", // Optimize font loading
});

// Enhanced SEO Metadata
export const metadata: Metadata = {
  title: {
    default: "Adeola & Abiola Wedding - August 8th, 2025 | Lagos, Nigeria",
    template: "%s | Adeola & Abiola Wedding",
  },
  description:
    "Join Adeola and Abiola as they celebrate their love story on August 8th, 2025 at Eko Hotels & Suites, Lagos. Traditional Nigerian wedding ceremony followed by reception. RSVP now for this beautiful celebration of love and unity.",
  keywords: [
    "Adeola Abiola wedding",
    "Nigerian wedding 2025",
    "Lagos wedding ceremony",
    "Eko Hotels wedding",
    "traditional Nigerian wedding",
    "wedding RSVP",
    "August 2025 wedding",
    "Victoria Island wedding",
    "African wedding celebration",
    "wedding invitation online",
  ],
  authors: [
    {
      name: "Adeola & Abiola",
      url: "https://adeolaandabiola.com",
    },
  ],
  creator: "Adeola & Abiola",
  publisher: "Wedding Website",
  category: "Wedding",

  // Open Graph / Social Media
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://adeolaandabiola.com",
    siteName: "Adeola & Abiola Wedding",
    title: "Adeola & Abiola Wedding - August 8th, 2025",
    description:
      "Join us in celebrating our love story! Traditional Nigerian wedding ceremony at Eko Hotels & Suites, Lagos. RSVP for our special day.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Adeola & Abiola Wedding - Beautiful couple in traditional Nigerian attire",
        type: "image/jpeg",
      },
      {
        url: "/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "Adeola & Abiola Wedding",
        type: "image/jpeg",
      },
    ],
    videos: [
      {
        url: "/wedding-promo.mp4",
        width: 1920,
        height: 1080,
        type: "video/mp4",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@AdeolaAbiola2025",
    creator: "@AdeolaAbiola2025",
    title: "Adeola & Abiola Wedding - August 8th, 2025",
    description:
      "Join us in celebrating our love story! Traditional Nigerian wedding in Lagos. RSVP now! 💕",
    images: ["/twitter-image.jpg"],
  },

  // Additional metadata
  applicationName: "Adeola & Abiola Wedding",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },

  // Verification for search engines
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      bing: "your-bing-verification-code",
    },
  },

  // App-specific metadata
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Adeola & Abiola Wedding",
    startupImage: [
      {
        url: "/apple-touch-startup-image-768x1004.png",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },

  // Structured data for rich snippets
  other: {
    "google-site-verification": "your-google-verification-code",
    "msvalidate.01": "your-bing-verification-code",
    "p:domain_verify": "your-pinterest-verification-code",

    // Rich snippets structured data
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Adeola & Abiola Wedding Ceremony",
      description:
        "Traditional Nigerian wedding ceremony celebrating the union of Adeola and Abiola",
      startDate: "2025-08-08T14:00:00+01:00",
      endDate: "2025-08-08T22:00:00+01:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "Eko Hotels & Suites",
        address: {
          "@type": "PostalAddress",
          streetAddress: "1415 Adetokunbo Ademola Street",
          addressLocality: "Victoria Island",
          addressRegion: "Lagos",
          addressCountry: "Nigeria",
          postalCode: "101241",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "6.4281",
          longitude: "3.4219",
        },
      },
      organizer: {
        "@type": "Person",
        name: "Adeola & Abiola",
        url: "https://adeolaandabiola.com",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "NGN",
        availability: "https://schema.org/InStock",
        url: "https://adeolaandabiola.com/rsvp",
      },
      image: [
        "https://adeolaandabiola.com/couple-1.png",
        "https://adeolaandabiola.com/couple-3.png",
      ],
    }),
  },
};

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#8E4585" },
    { media: "(prefers-color-scheme: dark)", color: "#A855A7" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />

        {/* Enhanced Font Loading */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Browser Icons & Favicons */}
        {/* Standard favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-touch-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon-180x180.png"
        />

        {/* Android Chrome Icons */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/android-chrome-512x512.png"
        />

        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* Windows Tiles */}
        <meta name="msapplication-TileColor" content="#8E4585" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Safari Pinned Tab */}
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#8E4585" />

        {/* Additional SEO meta tags */}
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />

        {/* Geographic targeting */}
        <meta name="geo.region" content="NG-LA" />
        <meta name="geo.placename" content="Lagos, Nigeria" />
        <meta name="geo.position" content="6.5244;3.3792" />
        <meta name="ICBM" content="6.5244, 3.3792" />

        {/* Language and locale */}
        <meta httpEquiv="content-language" content="en-ng" />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://adeolaandabiola.com"
        />
        <link
          rel="alternate"
          hrefLang="en-ng"
          href="https://adeolaandabiola.com"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://adeolaandabiola.com" />

        {/* Preload critical resources */}
        <link rel="preload" href="/couple-1.png" as="image" type="image/png" />
        <link rel="preload" href="/couple-3.png" as="image" type="image/png" />

        {/* RSS Feed (if you have a blog/updates) */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Wedding Updates"
          href="/rss.xml"
        />

        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />

        {/* Performance hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//connect.facebook.net" />

        {/* Schema.org structured data for wedding */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Event",
                  "@id": "https://adeolaandabiola.com/#wedding",
                  name: "Adeola & Abiola Wedding Ceremony",
                  description:
                    "Traditional Nigerian wedding ceremony celebrating the union of Adeola and Abiola",
                  startDate: "2025-08-08T14:00:00+01:00",
                  endDate: "2025-08-08T22:00:00+01:00",
                  eventStatus: "https://schema.org/EventScheduled",
                  eventAttendanceMode:
                    "https://schema.org/OfflineEventAttendanceMode",
                  location: {
                    "@type": "Place",
                    name: "Eko Hotels & Suites",
                    address: {
                      "@type": "PostalAddress",
                      streetAddress: "1415 Adetokunbo Ademola Street",
                      addressLocality: "Victoria Island",
                      addressRegion: "Lagos",
                      addressCountry: "Nigeria",
                      postalCode: "101241",
                    },
                  },
                  organizer: {
                    "@type": "Person",
                    name: "Adeola & Abiola",
                  },
                  image: "https://adeolaandabiola.com/og-image.jpg",
                },
                {
                  "@type": "WebSite",
                  "@id": "https://adeolaandabiola.com/#website",
                  url: "https://adeolaandabiola.com",
                  name: "Adeola & Abiola Wedding",
                  description: "Official wedding website for Adeola & Abiola",
                  potentialAction: [
                    {
                      "@type": "SearchAction",
                      target: {
                        "@type": "EntryPoint",
                        urlTemplate:
                          "https://adeolaandabiola.com/search?q={search_term_string}",
                      },
                      "query-input": "required name=search_term_string",
                    },
                  ],
                },
                {
                  "@type": "Organization",
                  "@id": "https://adeolaandabiola.com/#organization",
                  name: "Adeola & Abiola Wedding",
                  url: "https://adeolaandabiola.com",
                  logo: "https://adeolaandabiola.com/logo.png",
                  sameAs: [
                    "https://instagram.com/adeolaandabiola2025",
                    "https://facebook.com/adeolaandabiola2025",
                  ],
                },
              ],
            }),
          }}
        />

        {/* Google Analytics (replace with your tracking ID) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: 'Adeola & Abiola Wedding',
                custom_map: {'custom_parameter': 'wedding_page'}
              });
            `,
          }}
        />

        {/* Facebook Pixel (replace with your pixel ID) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'YOUR_PIXEL_ID');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>

      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="wedding-theme"
        >
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <Toaster />
        </ThemeProvider>

        {/* Additional tracking scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Custom wedding analytics
              window.weddingAnalytics = {
                trackRSVP: function(status) {
                  if (typeof gtag !== 'undefined') {
                    gtag('event', 'rsvp_submission', {
                      'event_category': 'Wedding',
                      'event_label': status,
                      'value': 1
                    });
                  }
                },
                trackGalleryView: function(imageIndex) {
                  if (typeof gtag !== 'undefined') {
                    gtag('event', 'gallery_view', {
                      'event_category': 'Engagement',
                      'event_label': 'Image ' + imageIndex,
                      'value': 1
                    });
                  }
                }
              };
            `,
          }}
        />
      </body>
    </html>
  );
}
