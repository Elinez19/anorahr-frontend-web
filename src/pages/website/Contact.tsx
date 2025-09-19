import React from "react";
import SEO from "@/components/custom/SEO";
import ContactHero from "@/components/website-sections/ContactHero";
import ContactForm from "@/components/website-sections/ContactForm";

const Contact: React.FC = () => {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with us to discuss your project and start your digital transformation journey. We're here to help bring your ideas to life with expert technology solutions."
        keywords={[
          "contact",
          "get quote",
          "project consultation",
          "web development",
          "mobile apps",
          "consulting",
        ]}
        url="/contact"
        type="website"
      />
      <main className="pt-20">
        <ContactHero />
        <ContactForm />
      </main>
    </>
  );
};

export default Contact;
