import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, Mail, Phone, MapPin, Check } from "lucide-react";

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="section bg-gradient-to-br from-midnight-900 to-midnight-950 text-white"
    >
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-block mb-3 px-4 py-1 rounded-full bg-midnight-800 text-mint-400 font-medium text-sm">
            Get In Touch
          </div>
          <h2 className="section-title text-white">
            Ready to Launch Your HR Solution?
          </h2>
          <p className="section-subtitle text-midnight-300">
            Let's discuss how we can help bring your idea to life in record
            time.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-midnight-800 p-3 rounded-lg mr-4">
                      <Mail size={20} className="text-mint-500" />
                    </div>
                    <div>
                      <p className="text-midnight-300 text-sm mb-1">
                        Email us at
                      </p>
                      <p className="text-white font-medium">hello@anora.tech</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-midnight-800 p-3 rounded-lg mr-4">
                      <Phone size={20} className="text-mint-500" />
                    </div>
                    <div>
                      <p className="text-midnight-300 text-sm mb-1">
                        Call us at
                      </p>
                      <p className="text-white font-medium">
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-midnight-800 p-3 rounded-lg mr-4">
                      <MapPin size={20} className="text-mint-500" />
                    </div>
                    <div>
                      <p className="text-midnight-300 text-sm mb-1">
                        Visit our office
                      </p>
                      <p className="text-white font-medium">
                        123 Innovation Way
                        <br />
                        San Francisco, CA 94107
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Working Hours</h3>
                <p className="text-midnight-300 mb-2">Monday - Friday:</p>
                <p className="text-white font-medium mb-4">
                  9:00 AM - 6:00 PM (PT)
                </p>
                <p className="text-midnight-300 mb-2">Saturday - Sunday:</p>
                <p className="text-white font-medium">Closed</p>
              </div>
            </div>

            <div className="lg:col-span-3 bg-midnight-800/50 rounded-2xl p-8 backdrop-blur-sm">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-midnight-300 mb-2 text-sm"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-midnight-700 border border-midnight-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-500 text-white"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-midnight-300 mb-2 text-sm"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-midnight-700 border border-midnight-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-500 text-white"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="company"
                      className="block text-midnight-300 mb-2 text-sm"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      className="w-full p-3 bg-midnight-700 border border-midnight-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-500 text-white"
                      placeholder="Your Company"
                    />
                  </div>

                  <div className="mb-8">
                    <label
                      htmlFor="message"
                      className="block text-midnight-300 mb-2 text-sm"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full p-3 bg-midnight-700 border border-midnight-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-500 text-white"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Send Message
                        <Send size={18} className="ml-2" />
                      </span>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-mint-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                  <p className="text-midnight-300 mb-6">
                    Thank you for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({
                        name: "",
                        email: "",
                        company: "",
                        message: "",
                      });
                    }}
                    className="btn btn-outline border-midnight-700 text-white hover:bg-midnight-700"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
