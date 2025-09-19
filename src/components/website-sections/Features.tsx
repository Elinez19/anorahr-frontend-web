import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { Feature } from "@/types";
import Container from "@/components/custom/Container";
import {
  Code,
  Rocket,
  Users,
  LineChart,
  Shield,
  Zap,
  BrainCircuit,
} from "lucide-react";
import { Link } from "react-router-dom";

const featureData: Feature[] = [
  {
    id: 1,
    title: "Recruitment",
    description:
      "From creating and publishing job adverts, down to employee onboarding, Recruitment on AnoraHR is a 360 degree recruitment solution.",
    icon: <Rocket className="text-mi  nt-500" size={24} />,
  },
  {
    id: 2,
    title: "Payroll",
    description:
      "Payroll shouldn’t take hours. No matter the size of your team; run your payroll seamlessly and pay your employees in real-time with AnoraHR.",
    icon: <BrainCircuit className="text-mint-500" size={24} />,
  },
  {
    id: 3,
    title: "Performance Management",
    description:
      "With the AnoraHR Performance feature, you get actionable insights, making it easier than ever to identify areas for employee improvement.",
    icon: <Code className="text-mint-500" size={24} />,
  },
  {
    id: 4,
    title: "Leave Management",
    description:
      "Affords organizations of any size, industry or sector the platform to manage leave application and approval without any hassle.",
    icon: <Users className="text-mint-500" size={24} />,
  },
  {
    id: 5,
    title: "Talent Management",
    description:
      "AnoraHR succession planning feature helps you develop potential successors to take up key roles in the organization.",
    icon: <LineChart className="text-mint-500" size={24} />,
  },
  {
    id: 6,
    title: "E-Learning",
    description:
      "A platform to learn and grow. We have over 100 free courses, and you are free to upload courses of your choice to suit your needs.",
    icon: <Shield className="text-mint-500" size={24} />,
  },
];

const Features: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    <section id="features" className="section bg-white">
      <Container padding="lg">
        <div className="text-center mb-16">
          <div className="inline-block mb-3 px-4 py-1 rounded-full bg-mint-100 text-mint-700 font-medium text-sm">
            Our Features
          </div>
          <h2 className="section-title">Supercharge Your HR Processes</h2>
          <p className="section-subtitle">
            We combine cutting-edge HR technologies with expert development to
            build exceptional HR processes at unprecedented speeds.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featureData.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="feature-card bg-white"
            >
              <div className="bg-mint-50 p-3 rounded-lg mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-midnight-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <Link to="#contact" className="btn btn-primary">
            Get Started
            <Zap size={18} className="ml-2" />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Features;
