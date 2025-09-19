import React from "react";
import FAQHero from "@/components/website-sections/FAQHero";
import FAQGrid from "@/components/website-sections/FAQGrid";

const FAQ: React.FC = () => {
  return (
    <>
      <main className="pt-20">
        <FAQHero />
        <FAQGrid />
      </main>
    </>
  );
};

export default FAQ;
