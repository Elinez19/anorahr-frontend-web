import Container from "@/components/custom/Container";
import { Card } from "@/components/ui/card";

const AboutContent: React.FC = () => {
  return (
    <section className="py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-midnight-900 mb-6">
              Our Story
            </h2>
            <p className="text-lg text-midnight-600 mb-6">
              Founded in 2020, AnoraTech has been revolutionizing HR technology,
              helping organizations of all sizes transform their human resources
              operations with intelligent, AI-powered solutions. Our team
              combines deep HR expertise with cutting-edge technology to deliver
              exceptional results.
            </p>
            <p className="text-lg text-midnight-600 mb-6">
              We believe that HR technology should be intuitive, efficient, and
              people-focused. That's why we create solutions that not only
              streamline HR processes but also enhance employee experience and
              drive organizational success.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-bold text-mint-600 mb-2">10+</h3>
                <p className="text-midnight-600">HR Systems Deployed</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-mint-600 mb-2">5+</h3>
                <p className="text-midnight-600">HR Teams Served</p>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop"
              alt="HR team collaboration"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-8">
            <div className="w-16 h-16 bg-mint-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-mint-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-midnight-900 mb-4">
              Innovation
            </h3>
            <p className="text-midnight-600">
              We leverage the latest AI and automation technologies to deliver
              cutting-edge HR solutions that give organizations a competitive
              advantage in talent management.
            </p>
          </Card>

          <Card className="text-center p-8">
            <div className="w-16 h-16 bg-mint-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-mint-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-midnight-900 mb-4">
              Collaboration
            </h3>
            <p className="text-midnight-600">
              We work closely with HR teams throughout the entire implementation
              process, ensuring their workforce management vision is perfectly
              realized.
            </p>
          </Card>

          <Card className="text-center p-8">
            <div className="w-16 h-16 bg-mint-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-mint-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-midnight-900 mb-4">
              Quality
            </h3>
            <p className="text-midnight-600">
              We maintain the highest standards of quality in every HR solution,
              from initial consultation to full system deployment and support.
            </p>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-midnight-900 mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-midnight-600 max-w-4xl mx-auto">
            To empower HR teams with innovative technology solutions that
            streamline operations, enhance employee experience, and drive
            organizational success in the modern workplace.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default AboutContent;
