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
                className="inline-flex items-center justify-center px-8 py-3 h-12 bg-mint-500 text-white font-medium hover:bg-mint-600 transition-colors shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-500 focus-visible:ring-offset-2"
                style={{ borderRadius: "9999px" }}
              >
                Contact Us
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-8 py-3 h-12 border border-mint-200 bg-white text-mint-700 font-medium hover:bg-mint-50 hover:text-mint-800 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-500 focus-visible:ring-offset-2"
                style={{ borderRadius: "9999px" }}
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
