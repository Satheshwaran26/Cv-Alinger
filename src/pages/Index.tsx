
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CVAnalyzer } from "@/components/CVAnalyzer";
import { Blog } from "@/components/Blog";
import { CTASection } from "@/components/CTASection";
import { InterviewTips } from "@/components/InterviewTips";
import { setupIntersectionObserver } from "@/lib/animations";

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

    // Setup animations for sections
    const observer = setupIntersectionObserver(
      '.animate-on-scroll',
      'animate-slide-up',
      0.1
    );

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Hero />
        <div className="animate-on-scroll opacity-0">
          <Features />
        </div>
        <div className="animate-on-scroll opacity-0">
          <InterviewTips />
        </div>
        <div className="animate-on-scroll opacity-0">
          <CVAnalyzer />
        </div>
        <div className="animate-on-scroll opacity-0">
          <Blog />
        </div>
        <div className="animate-on-scroll opacity-0">
          <CTASection />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
