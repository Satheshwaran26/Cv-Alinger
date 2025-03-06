
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CVAnalyzer } from "@/components/CVAnalyzer";
import { Blog } from "@/components/Blog";
import { CTASection } from "@/components/CTASection";

const Index = () => {
  // Scroll to element if URL has hash
  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Hero />
        <Features />
        <Blog />
        <CVAnalyzer />
        <CTASection />
      </div>
    </Layout>
  );
};

export default Index;
