import React from "react";
import BlogHero from "@/components/website-sections/BlogHero";
import BlogGrid from "@/components/website-sections/BlogGrid";

const Blog: React.FC = () => {
  return (
    <>
      <main className="pt-20">
        <BlogHero />
        <BlogGrid />
      </main>
    </>
  );
};

export default Blog;
