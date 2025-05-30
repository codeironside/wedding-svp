"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { useSmoothScroll } from "@/components/smooth-scroll-provider";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Heart,
  Share2,
  Download,
  Phone,
  Mail,
  Navigation,
  Gift,
  Camera,
  Music,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LazyMotion, domAnimation } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import Head from "next/head";

// Enhanced invitation data structure
interface InvitationData {
  guestName: string;
  personalMessage?: string;
  guestType: "family" | "friend" | "colleague" | "vip";
  tableNumber?: number;
  dietaryRequirements?: string[];
  plusOne?: boolean;
}

// Guest-specific messaging
const getPersonalizedMessage = (name: string, guestType: string) => {
  const messages = {
    family: `As part of our beloved family, your presence means the world to us. We can't wait to celebrate this joyous occasion with you.`,
    friend: `Having you as our dear friend has brought so much joy to our lives. Please join us as we begin this new chapter together.`,
    colleague: `We are honored to share this special moment with our valued colleague and friend. Your support means everything to us.`,
    vip: `Your presence would make our wedding day truly complete. We would be deeply honored to have you celebrate with us.`,
  };
  return messages[guestType as keyof typeof messages] || messages.friend;
};

// Share functionality
const useShare = (guestName: string) => {
  const shareInvitation = useCallback(async () => {
    const shareData = {
      title: `Wedding Invitation - Adeola & Abiola`,
      text: `${guestName}, you're invited to Adeola & Abiola's wedding on August 8th, 2025!`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(window.location.href);
      alert("Invitation link copied to clipboard!");
    }
  }, [guestName]);

  return { shareInvitation };
};

// Download invitation as image/PDF functionality
const useDownload = (guestName: string) => {
  const downloadInvitation = useCallback(() => {
    // This would typically generate a PDF or high-res image
    const link = document.createElement("a");
    link.href = `/api/invitation/download?name=${encodeURIComponent(
      guestName
    )}`;
    link.download = `Wedding-Invitation-${guestName.replace(/\s+/g, "-")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [guestName]);

  return { downloadInvitation };
};

// Countdown hook
const useCountdown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};

export default function InvitationPage() {
  const params = useParams();
  const { scrollToSection } = useSmoothScroll();
  const guestName = decodeURIComponent(params.name as string);
  const weddingDate = new Date("2025-08-08T14:00:00+01:00");
  const countdown = useCountdown(weddingDate);
  const { shareInvitation } = useShare(guestName);
  const { downloadInvitation } = useDownload(guestName);

  // Guest type detection (you could enhance this with a database lookup)
  const guestType = "friend"; // This would come from your guest database
  const personalMessage = getPersonalizedMessage(guestName, guestType);

  // SEO and structured data
  const pageTitle = `Wedding Invitation for ${guestName} - Adeola & Abiola`;
  const pageDescription = `Personal wedding invitation for ${guestName}. Join Adeola and Abiola on August 8th, 2025 at Eko Hotels & Suites, Lagos for their traditional Nigerian wedding ceremony.`;

  return (
    <LazyMotion features={domAnimation}>
      <Head>
        {/* Dynamic SEO meta tags */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content={`${guestName}, wedding invitation, Adeola Abiola wedding, Nigerian wedding, Lagos wedding, personal invitation`}
        />

        {/* Open Graph / Social Media */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="/invitation-og-image.jpg" />
        <meta
          property="og:url"
          content={`https://adeolaandabiola.com/invitation/${encodeURIComponent(
            guestName
          )}`}
        />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="/invitation-twitter-image.jpg" />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href={`https://adeolaandabiola.com/invitation/${encodeURIComponent(
            guestName
          )}`}
        />

        {/* Structured Data for Personal Invitation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "Adeola & Abiola Wedding Ceremony",
              description: `Personal wedding invitation for ${guestName}`,
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
                },
              },
              organizer: {
                "@type": "Person",
                name: "Adeola & Abiola",
              },
              attendee: {
                "@type": "Person",
                name: guestName,
              },
              image: "/couple-1.png",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "NGN",
                availability: "https://schema.org/InStock",
                url: "https://adeolaandabiola.com/rsvp",
              },
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-[#FAEEC8] via-[#F5E6B8] to-[#E8C7C8]">
        <Navbar />

        <div className="container mx-auto px-4 pt-24 pb-12">
          {/* Enhanced navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center text-[#8E4585] hover:text-[#A855A7] transition-colors group mb-8"
            >
              <ArrowLeft
                className="mr-2 group-hover:-translate-x-1 transition-transform"
                size={16}
              />
              Back to Home
            </Link>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Main invitation card */}
            <motion.div
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Hero section with enhanced design */}
              <div className="relative h-80 md:h-96">
                <Image
                  src="/couple-1.png"
                  alt="Adeola & Abiola Wedding Banner"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Floating decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${20 + (i % 3) * 20}%`,
                      }}
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    >
                      <Heart
                        size={12 + (i % 3) * 4}
                        className="text-[#FAEEC8]"
                        fill="currentColor"
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="absolute inset-0 flex items-end">
                  <div className="p-8 text-white w-full">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    >
                      <h1 className="text-4xl md:text-6xl font-bold font-serif mb-2 bg-gradient-to-r from-white to-[#FAEEC8] bg-clip-text text-transparent">
                        Adeola & Abiola
                      </h1>
                      <p className="text-xl md:text-2xl font-light mb-4">
                        Request the pleasure of your company
                      </p>

                      {/* Action buttons */}
                      <div className="flex gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={shareInvitation}
                          className="text-white hover:bg-white/20 backdrop-blur-sm"
                        >
                          <Share2 size={16} className="mr-2" />
                          Share
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={downloadInvitation}
                          className="text-white hover:bg-white/20 backdrop-blur-sm"
                        >
                          <Download size={16} className="mr-2" />
                          Download
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Invitation content */}
              <div className="p-8 md:p-12">
                {/* Personalized greeting */}
                <motion.div
                  className="text-center mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#8E4585] font-serif">
                    Dear {guestName},
                  </h2>
                  <p className="text-lg md:text-xl leading-relaxed text-[#8E4585]/80 max-w-3xl mx-auto">
                    {personalMessage}
                  </p>
                </motion.div>

                {/* Countdown timer */}
                <motion.div
                  className="bg-gradient-to-r from-[#E8C7C8] to-[#F5D5D6] rounded-2xl p-6 mb-10"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <h3 className="text-xl font-bold text-center mb-4 text-[#8E4585]">
                    Time Until Our Special Day
                  </h3>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    {[
                      { value: countdown.days, label: "Days" },
                      { value: countdown.hours, label: "Hours" },
                      { value: countdown.minutes, label: "Minutes" },
                      { value: countdown.seconds, label: "Seconds" },
                    ].map((item, index) => (
                      <div
                        key={item.label}
                        className="bg-white/80 rounded-lg p-3"
                      >
                        <div className="text-2xl md:text-3xl font-bold text-[#8E4585]">
                          {item.value}
                        </div>
                        <div className="text-sm text-[#8E4585]/70">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Enhanced event details */}
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  <motion.div
                    className="bg-gradient-to-br from-[#F5E6B8] to-[#FAEEC8] p-8 rounded-2xl border border-[#E8C7C8]/30"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Calendar
                      className="mx-auto mb-4 text-[#8E4585]"
                      size={40}
                    />
                    <h3 className="text-2xl font-bold mb-4 text-[#8E4585] text-center">
                      When
                    </h3>
                    <div className="text-center space-y-2">
                      <p className="text-lg font-semibold text-[#8E4585]">
                        Friday, August 8th, 2025
                      </p>
                      <div className="flex items-center justify-center gap-2 text-[#8E4585]/80">
                        <Clock size={16} />
                        <span>2:00 PM - 10:00 PM</span>
                      </div>
                      <p className="text-sm text-[#8E4585]/60">
                        Traditional Ceremony followed by Reception
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-[#F5E6B8] to-[#FAEEC8] p-8 rounded-2xl border border-[#E8C7C8]/30"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <MapPin className="mx-auto mb-4 text-[#8E4585]" size={40} />
                    <h3 className="text-2xl font-bold mb-4 text-[#8E4585] text-center">
                      Where
                    </h3>
                    <div className="text-center space-y-2">
                      <p className="text-lg font-semibold text-[#8E4585]">
                        Eko Hotels & Suites
                      </p>
                      <p className="text-[#8E4585]/80">
                        1415 Adetokunbo Ademola Street
                      </p>
                      <p className="text-[#8E4585]/80">
                        Victoria Island, Lagos
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3 border-[#8E4585] text-[#8E4585] hover:bg-[#8E4585] hover:text-white"
                        onClick={() =>
                          window.open(
                            "https://maps.google.com/?q=Eko+Hotels+Suites+Lagos",
                            "_blank"
                          )
                        }
                      >
                        <Navigation size={14} className="mr-2" />
                        Get Directions
                      </Button>
                    </div>
                  </motion.div>
                </div>

                {/* Enhanced dress code section */}
                <motion.div
                  className="mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                >
                  <h3 className="text-2xl font-bold mb-6 text-[#8E4585] text-center">
                    Dress Code
                  </h3>
                  <div className="flex justify-center gap-8">
                    <div className="text-center group">
                      <motion.div
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8E4585] to-[#A855A7] mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform"
                        whileHover={{ rotate: 5 }}
                      />
                      <p className="font-semibold text-[#8E4585]">
                        Traditional
                      </p>
                      <p className="text-sm text-[#8E4585]/60">
                        Nigerian Attire
                      </p>
                    </div>
                    <div className="text-center group">
                      <motion.div
                        className="w-20 h-20 rounded-full bg-white border-4 border-[#8E4585] mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform"
                        whileHover={{ rotate: -5 }}
                      />
                      <p className="font-semibold text-[#8E4585]">
                        White Wedding
                      </p>
                      <p className="text-sm text-[#8E4585]/60">Formal Attire</p>
                    </div>
                  </div>
                </motion.div>

                {/* Wedding timeline */}
                <motion.div
                  className="mb-10 bg-white/50 rounded-2xl p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.8 }}
                >
                  <h3 className="text-2xl font-bold mb-6 text-[#8E4585] text-center">
                    Wedding Timeline
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        time: "2:00 PM",
                        event: "Guest Arrival & Welcome Drinks",
                        icon: Utensils,
                      },
                      {
                        time: "3:00 PM",
                        event: "Traditional Ceremony",
                        icon: Heart,
                      },
                      {
                        time: "5:00 PM",
                        event: "Photography Session",
                        icon: Camera,
                      },
                      { time: "6:00 PM", event: "Cocktail Hour", icon: Gift },
                      {
                        time: "7:00 PM",
                        event: "Reception & Dinner",
                        icon: Music,
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-white/80 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.8 + index * 0.1, duration: 0.6 }}
                      >
                        <div className="bg-[#E8C7C8] p-2 rounded-full">
                          <item.icon size={20} className="text-[#8E4585]" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-[#8E4585]">
                            {item.time}
                          </div>
                          <div className="text-[#8E4585]/80">{item.event}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Contact information */}
                <motion.div
                  className="mb-10 bg-gradient-to-r from-[#E8C7C8] to-[#F5D5D6] rounded-2xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 0.8 }}
                >
                  <h3 className="text-xl font-bold mb-4 text-[#8E4585] text-center">
                    Questions?
                  </h3>
                  <div className="flex justify-center gap-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#8E4585] hover:bg-white/20"
                      onClick={() => window.open("tel:+2348034567890", "_self")}
                    >
                      <Phone size={16} className="mr-2" />
                      Call Us
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#8E4585] hover:bg-white/20"
                      onClick={() =>
                        window.open(
                          "mailto:contact@adeolaandabiola.com",
                          "_self"
                        )
                      }
                    >
                      <Mail size={16} className="mr-2" />
                      Email Us
                    </Button>
                  </div>
                </motion.div>

                {/* Enhanced RSVP section */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.2, duration: 0.8 }}
                >
                  <div className="bg-gradient-to-r from-[#8E4585] to-[#A855A7] rounded-2xl p-8 text-white">
                    <Heart
                      className="mx-auto mb-4"
                      size={40}
                      fill="currentColor"
                    />
                    <h3 className="text-2xl font-bold mb-4">
                      We Can't Wait to Celebrate!
                    </h3>
                    <p className="mb-6 text-lg opacity-90">
                      Please let us know if you can join us by July 15th, 2025
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className="bg-white text-[#8E4585] hover:bg-gray-100 font-semibold px-8 py-4 rounded-full text-lg shadow-lg"
                    >
                      <Link href="/rsvp">RSVP Now - Free & Quick!</Link>
                    </Button>
                    <p className="mt-4 text-sm opacity-70">
                      Takes less than 2 minutes to complete
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Additional wedding information */}
            <motion.div
              className="mt-8 grid md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.8 }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center">
                <Gift className="mx-auto mb-3 text-[#8E4585]" size={32} />
                <h4 className="font-bold text-[#8E4585] mb-2">Gift Registry</h4>
                <p className="text-sm text-[#8E4585]/70 mb-3">
                  Your presence is our present
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/#gifts">View Registry</Link>
                </Button>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center">
                <Camera className="mx-auto mb-3 text-[#8E4585]" size={32} />
                <h4 className="font-bold text-[#8E4585] mb-2">Photo Gallery</h4>
                <p className="text-sm text-[#8E4585]/70 mb-3">
                  Our beautiful journey
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/#gallery">View Photos</Link>
                </Button>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center">
                <Heart className="mx-auto mb-3 text-[#8E4585]" size={32} />
                <h4 className="font-bold text-[#8E4585] mb-2">Our Story</h4>
                <p className="text-sm text-[#8E4585]/70 mb-3">
                  How we fell in love
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/#story">Read More</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
