import React from "react";
import SEO from "@/components/custom/SEO";
import TestimonialsHero from "@/components/website-sections/TestimonialsHero";
import TestimonialsGrid from "@/components/website-sections/TestimonialsGrid";

const Testimonials: React.FC = () => {
  return (
    <>
      <SEO
        title="Client Testimonials"
        description="Hear from our satisfied clients about their experience working with AnoraTech. Read real success stories and discover how we've helped businesses achieve their goals."
        keywords={[
          "testimonials",
          "clients",
          "reviews",
          "success stories",
          "client feedback",
          "case studies",
        ]}
        url="/testimonials"
        type="website"
      />
      <main className="pt-20">
        <TestimonialsHero />
        <TestimonialsGrid />
      </main>
    </>
  );
};

export default Testimonials;
