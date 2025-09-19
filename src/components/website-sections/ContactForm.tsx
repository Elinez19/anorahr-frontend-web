import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Container from "@/components/custom/Container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/constants";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    setIsSubmitting(true);

    try {
      // Simulate form submission delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setFormData({ name: "", email: "", company: "", message: "" });
      console.log("Form submission completed successfully");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-20" id="contact-form">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-midnight-900 mb-6">
              Let's Start a Conversation
            </h2>
            <p className="text-lg text-midnight-600 mb-8">
              We'd love to hear about your project and discuss how we can help
              you achieve your goals.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-mint-100 rounded-full flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-mint-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-midnight-900 mb-1">
                    Email
                  </h3>
                  <p className="text-midnight-600">{CONTACT_INFO.email}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-mint-100 rounded-full flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-mint-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-midnight-900 mb-1">
                    Phone
                  </h3>
                  <p className="text-midnight-600">{CONTACT_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-mint-100 rounded-full flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-mint-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-midnight-900 mb-1">
                    Address
                  </h3>
                  <p className="text-midnight-600">{CONTACT_INFO.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-midnight-700 mb-2"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-midnight-200 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-midnight-700 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-midnight-200 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-midnight-700 mb-2"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-midnight-200 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-midnight-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-midnight-200 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                  placeholder="Tell us about your project..."
                />
              </div>

              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default ContactForm;
