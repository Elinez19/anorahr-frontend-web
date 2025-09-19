import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom"; // Make sure to import Navigate
import { AppDispatch, RootState } from "@/store";
import { LogoutUser } from "@/services/features/auth/authSlice";

// Protected Route component
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useSelector((state: RootState) => state.auth);

  if (!token) {
    // Redirect to signin if no token exists
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

export const RedirectIfAuthenticated = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  // If user is logged in and trying to access auth pages, redirect to dashboard
  if (
    token &&
    (location.pathname === "/auth/login" || location.pathname === "/auth")
  ) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Inactivity timer utility
export const useInactivityTimer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds

  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const resetTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);

      inactivityTimer = setTimeout(() => {
        // Log the user out after inactivity
        dispatch(LogoutUser());
        // Redirect to signin
        window.location.href = "/auth/login";
      }, INACTIVITY_TIMEOUT);
    };

    // Set up event listeners to reset timer on user activity
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];

    // Reset timer on any user activity
    events.forEach((event) => {
      document.addEventListener(event, resetTimer);
    });

    // Initialize the timer
    resetTimer();

    // Store last activity timestamp in localStorage to track across tabs
    const storeLastActivity = () => {
      localStorage.setItem("lastActivityTime", Date.now().toString());
    };

    // Check for inactivity periodically (even if browser tab is inactive)
    const checkInactivity = setInterval(() => {
      const lastActivity = parseInt(
        localStorage.getItem("lastActivityTime") || "0"
      );
      if (Date.now() - lastActivity > INACTIVITY_TIMEOUT) {
        dispatch(LogoutUser());
        window.location.href = "/auth/login";
      }
    }, 60000); // Check every minute

    events.forEach((event) => {
      document.addEventListener(event, storeLastActivity);
    });

    // Clean up on component unmount
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer);
        document.removeEventListener(event, storeLastActivity);
      });
      clearTimeout(inactivityTimer);
      clearInterval(checkInactivity);
    };
  }, [dispatch, INACTIVITY_TIMEOUT]); // Add dispatch and INACTIVITY_TIMEOUT to dependency array
};

// Format date to a more readable format
export const formatDate = (dateString: string) => {
  if (!dateString || dateString === "0001-01-01T00:00:00" || dateString === "")
    return "—";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

// Format timestamp to readable date
export const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
