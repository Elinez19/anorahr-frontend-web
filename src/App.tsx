import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import Home from "@/pages/website/Home";
import Features from "@/pages/website/Features";
import FeaturesDetails from "@/pages/website/FeaturesDetails";
import HowItWorks from "@/pages/website/HowItWorks";
import HowItWorksDetails from "@/pages/website/HowItWorksDetails";
import Blog from "@/pages/website/Blog";
import BlogDetails from "@/pages/website/BlogDetails";
import Testimonials from "@/pages/website/Testimonials";
import About from "@/pages/website/About";
import Contact from "@/pages/website/Contact";
import FAQ from "@/pages/website/FAQ";
import { Dashboard } from "@/routes.tsx";
import { ROUTE_PATHS } from "@/routes/index";
import JivoChat from "@/components/custom/JivoChat";
import { CHAT_CONFIG } from "@/constants";

function AppContent() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Check if current route is dashboard
  const isDashboard = location.pathname === ROUTE_PATHS.DASHBOARD;

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      {!isDashboard && (
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      )}
      <Routes>
        <Route path={ROUTE_PATHS.HOME} element={<Home />} />
        <Route path={ROUTE_PATHS.FEATURES} element={<Features />} />
        <Route
          path={ROUTE_PATHS.FEATURES_DETAILS}
          element={<FeaturesDetails />}
        />

        <Route path={ROUTE_PATHS.PORTFOLIO} element={<HowItWorks />} />
        <Route
          path={ROUTE_PATHS.HOW_IT_WORKS_DETAILS}
          element={<HowItWorksDetails />}
        />
        <Route path={ROUTE_PATHS.BLOG} element={<Blog />} />
        <Route path={ROUTE_PATHS.BLOG_DETAILS} element={<BlogDetails />} />
        <Route path={ROUTE_PATHS.TESTIMONIALS} element={<Testimonials />} />
        <Route path={ROUTE_PATHS.ABOUT} element={<About />} />
        <Route path={ROUTE_PATHS.CONTACT} element={<Contact />} />
        <Route path={ROUTE_PATHS.FAQ} element={<FAQ />} />
        <Route path={ROUTE_PATHS.DASHBOARD} element={<Dashboard />} />
      </Routes>
      {!isDashboard && <Footer />}
      {CHAT_CONFIG.enabled && <JivoChat widgetId={CHAT_CONFIG.jivoWidgetId} />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
