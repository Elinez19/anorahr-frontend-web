import React from "react";
import SEO from "@/components/custom/SEO";
import HowItWorksHero from "@/components/website-sections/HowItWorksHero";
import HowItWorksGrid from "@/components/website-sections/HowItWorksGrid";

const HowItWorks: React.FC = () => {
  return (
    <>
      <SEO
        title="Our Portfolio"
        description="Explore our successful projects and case studies across different industries and technologies. See how we've helped businesses achieve their digital transformation goals."
        keywords={[
          "portfolio",
          "case studies",
          "projects",
          "web development",
          "mobile apps",
          "success stories",
          "client work",
        ]}
        url="/how-it-works"
        type="website"
      />
      <main className="pt-20">
        <HowItWorksHero />
        <HowItWorksGrid />
      </main>
    </>
  );
};

export default HowItWorks;
