import React from "react";
import SEO from "@/components/custom/SEO";
import AboutHero from "@/components/website-sections/AboutHero";
import AboutContent from "@/components/website-sections/AboutContent";

const About: React.FC = () => {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about our team, mission, and the story behind AnoraTech. Discover how we help businesses transform their ideas into reality with cutting-edge technology solutions."
        keywords={[
          "about",
          "team",
          "mission",
          "company",
          "technology",
          "web development",
          "mobile apps",
        ]}
        url="/about"
        type="website"
      />
      <main className="pt-20">
        <AboutHero />
        <AboutContent />
      </main>
    </>
  );
};

export default About;
