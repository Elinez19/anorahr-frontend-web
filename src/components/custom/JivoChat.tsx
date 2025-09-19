import { useEffect } from "react";

interface JivoChatProps {
  widgetId: string;
}

declare global {
  interface Window {
    jivo_api?: any;
  }
}

const JivoChat: React.FC<JivoChatProps> = ({ widgetId }) => {
  useEffect(() => {
    // Don't load if widgetId is not set properly
    if (!widgetId || widgetId === "YOUR_JIVO_WIDGET_ID") {
      console.warn(
        "Jivo Chat: Widget ID not configured. Please set VITE_JIVO_WIDGET_ID in your environment variables."
      );
      return;
    }

    // Check if script is already loaded
    const existingScript = document.querySelector(`script[src*="${widgetId}"]`);
    if (existingScript) {
      return;
    }

    // Create and load the Jivo script
    const script = document.createElement("script");
    script.src = `//code.jivosite.com/widget/${widgetId}`;
    script.async = true;

    // Add script to document head
    document.head.appendChild(script);

    // Optional: Listen for Jivo events if needed
    script.onload = () => {
      console.log("Jivo Chat loaded successfully");

      // You can customize Jivo settings here if needed
      // Example: window.jivo_api?.setContactInfo({ email: 'user@example.com' });
    };

    // Cleanup function
    return () => {
      // Remove the script when component unmounts
      const scriptToRemove = document.querySelector(
        `script[src*="${widgetId}"]`
      );
      if (scriptToRemove) {
        scriptToRemove.remove();
      }

      // Clean up Jivo elements
      const jivoContainer = document.getElementById("jivo-iframe-container");
      if (jivoContainer) {
        jivoContainer.remove();
      }

      // Clean up other potential Jivo elements
      const jivoElements = document.querySelectorAll(
        '[id*="jivo"], [class*="jivo"]'
      );
      jivoElements.forEach((element) => element.remove());
    };
  }, [widgetId]);

  return null; // This component doesn't render anything visible
};

export default JivoChat;
