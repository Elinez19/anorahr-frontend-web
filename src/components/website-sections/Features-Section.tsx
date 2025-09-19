import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FEATURES_DATA, FEATURES_CATEGORIES } from "@/constants";

const FeaturesSection: React.FC = () => {
  const [filter, setFilter] = useState("All");
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredFeatures =
    filter === "All"
      ? FEATURES_DATA
      : FEATURES_DATA.filter((feature) => feature.tag === filter);

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
        duration: 0.6,
      },
    },
  };

  return (
    <section id="portfolio" className="section bg-midnight-50">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-block mb-3 px-4 py-1 rounded-full bg-mint-100 text-mint-700 font-medium text-sm">
            AnoraHR Features
          </div>
          <h2 className="section-title">
            Give your employees an unforgettable Experience
          </h2>
          <p className="section-subtitle">
            Empower, engage, and elevate every moment of their journey.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {FEATURES_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                filter === category
                  ? "bg-mint-500 text-white"
                  : "bg-white text-midnight-600 hover:bg-midnight-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredFeatures.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="group overflow-hidden rounded-2xl bg-white shadow-card hover:shadow-elevated transition-all duration-300"
            >
              <div className="relative overflow-hidden h-64">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-midnight-900/80 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                  {feature.tag}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-midnight-600 mb-4">{feature.description}</p>
                <Link
                  to={feature.link}
                  className="inline-flex items-center text-mint-600 font-medium hover:text-mint-700 transition-colors"
                >
                  View Case Study
                  <ArrowUpRight size={16} className="ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
