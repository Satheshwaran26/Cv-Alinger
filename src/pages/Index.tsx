
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CVAnalyzer } from "@/components/CVAnalyzer";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

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
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow w-full">
        <Hero />
        <Features />
        <CVAnalyzer />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
