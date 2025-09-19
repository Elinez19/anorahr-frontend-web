import {
  Code,
  Smartphone,
  Palette,
  TrendingUp,
  Cloud,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import Container from "@/components/custom/Container";
import { Button } from "@/components/ui/button";
import { SERVICES_DATA } from "@/constants";
import { Card } from "@/components/ui/card";

const getIcon = (iconName: string) => {
  const icons = {
    Code: <Code className="w-8 h-8 text-mint-700" />,
    Smartphone: <Smartphone className="w-8 h-8 text-mint-700" />,
    Palette: <Palette className="w-8 h-8 text-mint-700" />,
    TrendingUp: <TrendingUp className="w-8 h-8 text-mint-700" />,
    Cloud: <Cloud className="w-8 h-8 text-mint-700" />,
    Users: <Users className="w-8 h-8 text-mint-700" />,
  };
  return (
    icons[iconName as keyof typeof icons] || (
      <Code className="w-8 h-8 text-mint-700" />
    )
  );
};

const FeaturesGrid: React.FC = () => {
  return (
    <section className="section px-4 md:px-8 lg:px-12">
      <Container padding="lg" className="features-grid-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-midnight-900 mb-4">
            What We Offer
          </h2>
          <p className="text-xl text-midnight-600 max-w-3xl mx-auto">
            From web development to digital marketing, we have the expertise to
            bring your vision to life.
          </p>
        </div>

        <div className="features-grid-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_DATA.map((service) => (
              <Card
                key={service.id}
                className="hover:shadow-xl transition-shadow duration-300 p-8"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    {getIcon(service.iconName)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-midnight-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-base text-midnight-600 mb-6">
                      {service.description}
                    </p>
                  </div>
                </div>
                <ul className="text-left mb-6 space-y-2">
                  {service.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-midnight-700"
                    >
                      <div className="w-2 h-2 bg-mint-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                {service.price && (
                  <p className="text-mint-600 font-semibold mb-4">
                    {service.price}
                  </p>
                )}
                <Link
                  to={`/services/${service.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="w-full"
                >
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturesGrid;
