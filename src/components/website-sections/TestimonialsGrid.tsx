import { Star } from "lucide-react";
import Container from "@/components/custom/Container";
import { Card } from "@/components/ui/card";
import { TESTIMONIALS_DATA } from "@/constants";

const TestimonialsGrid: React.FC = () => {
  return (
    <section className="py-20">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-midnight-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-midnight-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say
            about working with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-midnight-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-midnight-600">
                    {testimonial.role}
                  </p>
                  <p className="text-sm text-mint-600">{testimonial.company}</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className="text-yellow-400 fill-current"
                  />
                ))}
              </div>

              <p className="text-midnight-700 italic">
                "{testimonial.content}"
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsGrid;
