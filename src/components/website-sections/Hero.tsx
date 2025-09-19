import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "@/components/custom/Container";

const Hero: React.FC = () => {
  return (
    <section className="relative section overflow-hidden bg-gradient-to-br from-midnight-50 to-white">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-mint-300/20 filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 rounded-full bg-midnight-300/10 filter blur-3xl"></div>
      </div>

      <Container className="relative z-10" padding="lg">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-3 px-4 py-1 rounded-full bg-mint-100 text-mint-700 font-medium text-sm"
          >
            The HR & People Software
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            Affordable, All-in-One HR Software,
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint-500 to-mint-700">
              for all business sizes.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-midnight-600 mb-8 max-w-3xl mx-auto"
          >
            AnoraHR is a comprehensive HR management software that simplifies HR
            processes and saves you up to 20 hours per week on administrative
            tasks. It also reduces payroll time by half, helps you recruit top
            talent, and boosts employee productivity. AnoraHR is affordable and
            built for businesses of all sizes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#contact"
              className="btn btn-primary text-base px-8 py-3.5 shadow-lg shadow-mint-500/20"
            >
              Get Started
              <ArrowRight size={18} className="ml-2" />
            </a>
            <a href="#portfolio" className="btn btn-outline text-base">
              Learn More
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 relative mx-auto max-w-5xl"
        >
          <div className="rounded-2xl overflow-hidden shadow-elevated relative z-10">
            <img
              src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="AI Development Team"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-card p-4 flex items-center max-w-sm w-full">
            <div className="bg-mint-500 rounded-full w-12 h-12 flex items-center justify-center mr-4 shrink-0">
              <span className="text-white font-bold">3x</span>
            </div>
            <p className="text-sm font-medium">
              Accelerate your HR processes by up to 3x with our AI-powered
              process
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
