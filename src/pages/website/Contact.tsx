import React from "react";
import ContactHero from "@/components/website-sections/ContactHero";
import ContactForm from "@/components/website-sections/ContactForm";

const Contact: React.FC = () => {
  return (
    <>
      <main className="pt-20">
        <ContactHero />
        <ContactForm />
      </main>
    </>
  );
};

export default Contact;
