import React from "react";
import HowItWorksHero from "@/components/website-sections/HowItWorksHero";
import HowItWorksGrid from "@/components/website-sections/HowItWorksGrid";

const HowItWorks: React.FC = () => {
  return (
    <>
      <main className="pt-20">
        <HowItWorksHero />
        <HowItWorksGrid />
      </main>
    </>
  );
};

export default HowItWorks;
