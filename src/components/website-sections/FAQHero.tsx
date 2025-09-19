import { Link } from "react-router-dom";
import Container from "@/components/custom/Container";

const FAQHero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-midnight-900 to-mint-600 text-white py-20">
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-mint-100 mb-8">
            Find answers to common questions about our services, process, and
            what to expect when working with us.
          </p>
          <Link
            to="/contact"
            className="border-white text-white hover:bg-white hover:text-midnight-900"
          >
            Still Have Questions?
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default FAQHero;
