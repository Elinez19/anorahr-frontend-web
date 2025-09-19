import Container from "@/components/custom/Container";
import { Link } from "react-router-dom";

const BlogHero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-midnight-900 to-mint-600 text-white py-20">
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Blog</h1>
          <p className="text-xl text-mint-100 mb-8">
            Insights, tips, and industry trends to help you stay ahead in the
            digital world.
          </p>
          <Link
            to="/contact"
            className="border-white text-white hover:bg-white hover:text-midnight-900"
          >
            Subscribe to Newsletter
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default BlogHero;
