import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle, MapPin, Phone } from "lucide-react";
import { SERVICES_DATA, CONTACT_INFO } from "@/constants";
import Container from "@/components/custom/Container";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface LocationServicesProps {
  location: {
    name: string;
    state: string;
    description: string;
    address: string;
    phone: string;
    landmarks?: string[];
    servingAreas?: string[];
  };
}

const LocationServices: React.FC<LocationServicesProps> = ({ location }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      className="py-20 bg-gradient-to-b from-midnight-900 to-midnight-800"
      ref={ref}
    >
      <Container>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Best Software Development Agency in{" "}
            <span className="text-mint-400">{location.name}</span>
          </h1>
          <p className="text-xl text-midnight-600 max-w-3xl mx-auto mb-8">
            {location.description}
          </p>
          <div className="flex items-center justify-center gap-2 text-mint-400 mb-8">
            <MapPin size={20} />
            <span>
              Serving {location.name}, {location.state} and surrounding areas
            </span>
          </div>
        </motion.div>

        {/* Location Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-midnight-100">
            <div className="flex items-center mb-4">
              <div className="bg-mint-500/20 p-3 rounded-lg mr-4">
                <MapPin size={24} className="text-mint-400" />
              </div>
              <h3 className="text-xl font-bold">Our {location.name} Office</h3>
            </div>
            <p className="text-midnight-600 mb-4">{location.address}</p>
            {location.landmarks && (
              <div>
                <p className="text-sm text-midnight-600 mb-2">Near:</p>
                <ul className="text-sm text-mint-600">
                  {location.landmarks.map((landmark, index) => (
                    <li key={index}>• {landmark}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-midnight-100">
            <div className="flex items-center mb-4">
              <div className="bg-mint-500/20 p-3 rounded-lg mr-4">
                <Phone size={24} className="text-mint-400" />
              </div>
              <h3 className="text-xl font-bold">
                Contact {location.name} Team
              </h3>
            </div>
            <p className="text-midnight-600 mb-2">Direct Line:</p>
            <p className="text-mint-600 font-medium mb-4">{location.phone}</p>
            <p className="text-midnight-600 mb-2">Email:</p>
            <p className="text-mint-600 font-medium">{CONTACT_INFO.email}</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-midnight-100">
            <div className="flex items-center mb-4">
              <div className="bg-mint-500/20 p-3 rounded-lg mr-4">
                <MapPin size={24} className="text-mint-400" />
              </div>
              <h3 className="text-xl font-bold">Service Areas</h3>
            </div>
            {location.servingAreas && (
              <ul className="text-midnight-600 space-y-1">
                {location.servingAreas.map((area, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle size={16} className="text-mint-600 mr-2" />
                    {area}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Software Development Services in {location.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DATA.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-midnight-100 hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-midnight-600 mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <CheckCircle size={16} className="text-mint-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-mint-600 font-medium text-sm">
                  {service.price}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us in This Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-8">
            Why Choose AnoraTech as Your {location.name} Software Development
            Partner?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: "Local Expertise",
                description: `Deep understanding of ${location.name} business landscape and requirements`,
              },
              {
                title: "Proven Track Record",
                description:
                  "Successfully delivered 100+ projects across Nigeria",
              },
              {
                title: "On-Site Support",
                description: `Local team available for face-to-face meetings in ${location.name}`,
              },
              {
                title: "Competitive Pricing",
                description:
                  "Best value software development services in Nigeria",
              },
            ].map((benefit, index) => (
              <div key={index} className="bg-mint-50 rounded-xl p-6">
                <h4 className="font-bold mb-3 text-mint-600">
                  {benefit.title}
                </h4>
                <p className="text-midnight-600 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/contact">Get Free Consultation</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/how-it-works">View Our Work</Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default LocationServices;
