import React from "react";
import AboutHero from "@/components/website-sections/AboutHero";
import AboutContent from "@/components/website-sections/AboutContent";

const About: React.FC = () => {
  return (
    <>
      <main className="pt-20">
        <AboutHero />
        <AboutContent />
      </main>
    </>
  );
};

export default About;
