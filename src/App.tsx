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
import {
  Dashboard,
  RolesPage,
  EmployeesPage,
  LeavesPage,
  PayrollPage,
  PerformancePage,
  TalentPage,
  AddEmployeePage,
  AddRolePage,
  RequestLeavePage,
  AddPerformancePage,
  AddTalentPage,
  Login,
  Register,
  VerifyCompany,
  RegistrationSuccess,
  ForgotPassword,
  ResetPassword,
  ConfirmEmailChange,
} from "@/routes.tsx";
import { ROUTE_PATHS } from "@/routes/index";
import JivoChat from "@/components/custom/JivoChat";
import { CHAT_CONFIG } from "@/constants";

function AppContent() {
  const location = useLocation();

  // Check if current route is dashboard or auth pages
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isAuthPage = location.pathname.startsWith("/auth");

  return (
    <div>
      {!isDashboard && !isAuthPage && <Header />}
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
        <Route path={ROUTE_PATHS.DASHBOARD_ROLES} element={<RolesPage />} />
        <Route
          path={ROUTE_PATHS.DASHBOARD_EMPLOYEES}
          element={<EmployeesPage />}
        />
        <Route path={ROUTE_PATHS.DASHBOARD_LEAVES} element={<LeavesPage />} />
        <Route path={ROUTE_PATHS.DASHBOARD_PAYROLL} element={<PayrollPage />} />
        <Route
          path={ROUTE_PATHS.DASHBOARD_PERFORMANCE}
          element={<PerformancePage />}
        />
        <Route path={ROUTE_PATHS.DASHBOARD_TALENT} element={<TalentPage />} />
        <Route
          path={ROUTE_PATHS.DASHBOARD_ADD_EMPLOYEE}
          element={<AddEmployeePage />}
        />
        <Route
          path={ROUTE_PATHS.DASHBOARD_ADD_ROLE}
          element={<AddRolePage />}
        />
        <Route
          path={ROUTE_PATHS.DASHBOARD_REQUEST_LEAVE}
          element={<RequestLeavePage />}
        />
        <Route
          path={ROUTE_PATHS.DASHBOARD_ADD_PERFORMANCE}
          element={<AddPerformancePage />}
        />
        <Route
          path={ROUTE_PATHS.DASHBOARD_ADD_TALENT}
          element={<AddTalentPage />}
        />

        {/* Auth Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/verify-company" element={<VerifyCompany />} />
        <Route
          path="/auth/registration-success"
          element={<RegistrationSuccess />}
        />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route
          path="/auth/confirm-email-change"
          element={<ConfirmEmailChange />}
        />
      </Routes>
      {!isDashboard && !isAuthPage && <Footer />}
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
