
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CVAnalyzer } from "@/components/CVAnalyzer";
import { Blog } from "@/components/Blog";
import { CTASection } from "@/components/CTASection";

const Index = () => {
  // Ensure the page starts at the top when loaded
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Scroll to element if URL has hash after ensuring page is at top
    if (window.location.hash) {
      setTimeout(() => {
        const element = document.querySelector(window.location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Hero />
        <Features />
        <CVAnalyzer />
        <Blog />
        <CTASection />
      </div>
    </Layout>
  );
};

export default Index;
