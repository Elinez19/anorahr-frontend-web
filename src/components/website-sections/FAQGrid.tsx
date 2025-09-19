import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "@/components/custom/Container";
import { Card } from "@/components/ui/card";
import { FAQ_DATA } from "@/constants";

const FAQGrid: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {FAQ_DATA.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-midnight-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-midnight-900 pr-4">
                    {item.question}
                  </h3>
                  {openItems.includes(item.id) ? (
                    <ChevronUp className="w-5 h-5 text-mint-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-mint-600 flex-shrink-0" />
                  )}
                </button>
                {openItems.includes(item.id) && (
                  <div className="px-6 pb-4">
                    <p className="text-midnight-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-midnight-600 mb-4">
              Still have questions? We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-mint-600 text-white font-medium rounded-lg hover:bg-mint-700 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-6 py-3 border border-midnight-200 text-midnight-700 font-medium rounded-lg hover:bg-midnight-50 transition-colors"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQGrid;
