import Container from "@/components/custom/Container";
import { Link } from "react-router-dom";

const ContactHero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-midnight-900 to-mint-600 text-white py-20">
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-mint-100 mb-8">
            Ready to start your next project? Let's discuss how we can help
            bring your vision to life.
          </p>
          <Link
            to="#contact-form"
            className="border-white text-white hover:bg-white hover:text-midnight-900"
          >
            Start Your Project
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default ContactHero;
