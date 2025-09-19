import Container from "@/components/custom/Container";
import { Link } from "react-router-dom";

const TestimonialsHero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-midnight-900 to-mint-600 text-white py-20">
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Client Testimonials
          </h1>
          <p className="text-xl text-mint-100 mb-8">
            Hear from our satisfied clients about their experience working with
            us.
          </p>
          <Link
            to="/contact"
            className="border-white text-white hover:bg-white hover:text-midnight-900"
          >
            Start Your Project
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsHero;
