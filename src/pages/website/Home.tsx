import React from "react";
import Hero from "@/components/website-sections/Hero";
import Features from "@/components/website-sections/Features";
import FeaturesSection from "@/components/website-sections/Features-Section";
import Testimonials from "@/components/website-sections/Testimonials";
import About from "@/components/website-sections/About";
import FAQ from "@/components/website-sections/FAQ";
import Contact from "@/components/website-sections/Contact";
import MarketingBanner from "@/components/custom/MarketingBanner";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";

const Home: React.FC = () => {
  // Newsletter banner that triggers at 30% scroll
  const newsletterBanner = useScrollTrigger({
    triggerPercentage: 30,
    bannerType: "newsletter",
    title: "Stay Updated with Tech Trends",
    description:
      "Get the latest insights on web development, AI, and emerging technologies delivered to your inbox.",
    ctaText: "Subscribe Now",
    triggerType: "scroll",
    cooldownMinutes: 10, // 10 minutes cooldown
  });

  // Special offer banner that triggers at 60% scroll
  const offerBanner = useScrollTrigger({
    triggerPercentage: 60,
    bannerType: "offer",
    title: "Limited Time Offer!",
    description:
      "Get 20% off your first project when you start within the next 7 days.",
    ctaText: "Claim Offer",
    triggerType: "scroll",
    cooldownMinutes: 10, // 10 minutes cooldown
  });

  // Exit intent banner for when users try to leave
  const exitIntentBanner = useScrollTrigger({
    bannerType: "promotion",
    title: "Wait! Don't Miss Out",
    description:
      "Get a free consultation and project quote before you go. No obligation, just expert advice.",
    ctaText: "Get Free Quote",
    triggerType: "exit-intent",
    cooldownMinutes: 10, // 10 minutes cooldown
  });

  const handleNewsletterSubmit = async (email: string) => {
    // In a real app, you would send this to your API
    console.log("Newsletter subscription:", email);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <>
      <main>
        <Hero />
        <Features />
        <FeaturesSection />
        <Testimonials />
        <About />
        <FAQ />
        <Contact />
      </main>

      {/* Newsletter Banner */}
      <MarketingBanner
        type={newsletterBanner.bannerData.type}
        title={newsletterBanner.bannerData.title}
        description={newsletterBanner.bannerData.description}
        ctaText={newsletterBanner.bannerData.ctaText}
        isVisible={newsletterBanner.isBannerVisible}
        onClose={newsletterBanner.closeBanner}
        onSubmit={handleNewsletterSubmit}
      />

      {/* Special Offer Banner */}
      <MarketingBanner
        type={offerBanner.bannerData.type}
        title={offerBanner.bannerData.title}
        description={offerBanner.bannerData.description}
        ctaText={offerBanner.bannerData.ctaText}
        isVisible={offerBanner.isBannerVisible}
        onClose={offerBanner.closeBanner}
      />

      {/* Exit Intent Banner */}
      <MarketingBanner
        type={exitIntentBanner.bannerData.type}
        title={exitIntentBanner.bannerData.title}
        description={exitIntentBanner.bannerData.description}
        ctaText={exitIntentBanner.bannerData.ctaText}
        isVisible={exitIntentBanner.isBannerVisible}
        onClose={exitIntentBanner.closeBanner}
      />
    </>
  );
};

export default Home;
