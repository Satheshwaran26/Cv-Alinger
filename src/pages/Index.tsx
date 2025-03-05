import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CVAnalyzer } from "@/components/CVAnalyzer";
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
      <Hero />
      <Features />
      <CVAnalyzer />
      <CTASection />
    </Layout>
  );
};

export default Index;
