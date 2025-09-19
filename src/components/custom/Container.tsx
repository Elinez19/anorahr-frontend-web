import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  maxWidth = "xl",
  padding = "md",
}) => {
  const maxWidthClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full",
  };

  const paddingClasses = {
    none: "",
    sm: "px-12",
    md: "px-12 md:px-16 lg:px-24",
    lg: "px-16 md:px-24 lg:px-32",
  };

  const classes = `mx-auto ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]} ${className}`;

  return <div className={classes}>{children}</div>;
};

export default Container;
