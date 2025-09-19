import React from "react";
import SEO from "@/components/custom/SEO";
import FAQHero from "@/components/website-sections/FAQHero";
import FAQGrid from "@/components/website-sections/FAQGrid";

const FAQ: React.FC = () => {
  return (
    <>
      <SEO
        title="FAQ"
        description="Find answers to frequently asked questions about our services and process. Get detailed information about our web development, mobile app development, and consulting services."
        keywords={[
          "FAQ",
          "questions",
          "services",
          "process",
          "web development",
          "mobile apps",
          "consulting",
        ]}
        url="/faq"
        type="website"
      />
      <main className="pt-20">
        <FAQHero />
        <FAQGrid />
      </main>
    </>
  );
};

export default FAQ;
