import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { FAQItem } from "@/types";
import Container from "@/components/custom/Container";

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "How can AnoraHR help my business?",
    answer: `AnoraHR is a comprehensive HR management system that helps businesses manage their HR processes efficiently. It includes features for recruitment, payroll, attendance management, leave management, and talent management.`,
  },
  {
    id: 2,
    question: "What are the key features of AnoraHR?",
    answer:
      "AnoraHR includes features for recruitment, payroll, attendance management, leave management, and talent management.",
  },
  {
    id: 3,
    question: "How can I get started with AnoraHR?",
    answer:
      "You can get started with AnoraHR by contacting us for a consultation. We will help you understand your needs and provide you with a tailored solution.",
  },
  {
    id: 4,
    question: "How can I contact AnoraHR?",
    answer:
      "You can contact us by calling +234 813 500 0000 or by email at info@anora.com.",
  },
  {
    id: 5,
    question: "What is the pricing for AnoraHR?",
    answer:
      "The pricing for AnoraHR is based on the number of users and the features you need. Please contact us for a detailed quote.",
  },
  {
    id: 6,
    question: "How can I get support for AnoraHR?",
    answer:
      "You can get support by contacting us by calling +234 813 500 0000 or by email at info@anora.com.",
  },
];

const FAQAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="faq" className="section bg-midnight-50">
      <Container padding="lg">
        <div className="text-center mb-16">
          <div className="inline-block mb-3 px-4 py-1 rounded-full bg-mint-100 text-mint-700 font-medium text-sm">
            FAQ
          </div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Get answers to common questions about AnoraHR.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto"
        >
          {faqItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="mb-4 bg-white rounded-xl shadow-subtle overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(item.id)}
                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
                aria-expanded={openId === item.id}
              >
                <h3 className="text-lg font-bold">{item.question}</h3>
                {openId === item.id ? (
                  <ChevronUp size={20} className="text-mint-500" />
                ) : (
                  <ChevronDown size={20} className="text-midnight-400" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openId === item.id ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-6 text-midnight-600">{item.answer}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <p className="text-midnight-600 mb-6">
            Still have questions? Feel free to reach out to us directly.
          </p>
          <a href="#contact" className="btn btn-primary">
            Contact Us
          </a>
        </div>
      </Container>
    </section>
  );
};

export default FAQAccordion;
