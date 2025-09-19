import React from "react";
import SEO from "@/components/custom/SEO";
import FeaturesCTA from "@/components/website-sections/FeaturesCTA";
import MarketingBanner from "@/components/custom/MarketingBanner";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import FeaturesHero from "@/components/website-sections/FeaturesHero";
import FeaturesGrid from "@/components/website-sections/FeaturesGrid";

const Features: React.FC = () => {
  // Promotion banner that triggers at 50% scroll
  const promotionBanner = useScrollTrigger({
    triggerPercentage: 50,
    bannerType: "promotion",
    title: "Free Consultation Available!",
    description:
      "Book a free 30-minute consultation to discuss your project requirements and get expert advice.",
    ctaText: "Book Consultation",
    triggerType: "scroll",
    cooldownMinutes: 10, // 10 minutes cooldown
  });

  // Exit intent banner for when users try to leave
  const exitIntentBanner = useScrollTrigger({
    bannerType: "offer",
    title: "Special Services Discount!",
    description:
      "Get 15% off any service when you book today. Limited time offer for new clients.",
    ctaText: "Claim Discount",
    triggerType: "exit-intent",
    cooldownMinutes: 10, // 10 minutes cooldown
  });

  return (
    <>
      <SEO
        title="Our Features"
        description="Empower Employees With
Our People Features"
        keywords={[
          "Recruitment",
          "Payroll",
          "Performance Management",
          "Leave Management",
          "Talent Management",
          "E-Learning",
        ]}
        url="/features"
        type="website"
      />
      <main className="pt-20">
        <FeaturesHero />
        <FeaturesGrid />
        <FeaturesCTA />
      </main>

      {/* Promotion Banner */}
      <MarketingBanner
        type={promotionBanner.bannerData.type}
        title={promotionBanner.bannerData.title}
        description={promotionBanner.bannerData.description}
        ctaText={promotionBanner.bannerData.ctaText}
        isVisible={promotionBanner.isBannerVisible}
        onClose={promotionBanner.closeBanner}
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

export default Features;
