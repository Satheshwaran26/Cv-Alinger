
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedStat } from "./AnimatedStat";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't use animation for hero section to prevent disappearing
    document.querySelectorAll('.hero-animate').forEach(el => {
      el.classList.remove('opacity-0');
    });
    document.querySelectorAll('.hero-animate-delayed').forEach(el => {
      el.classList.remove('opacity-0');
    });
    
    // Disable the intersection observer for the hero section
    // as it's likely causing the disappearing issue
    return () => {};
  }, []);

  const stats = [
    { value: "98%", label: "Accuracy in skill matching" },
    { value: "75%", label: "Improvement in interview chances" },
    { value: "250", label: "Successful job matches" }
  ];

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-screen py-20 flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 via-blue-100/50 to-background dark:from-blue-950 dark:via-blue-900/30 dark:to-background"
      ref={containerRef}
    >
      {/* Background decorative elements - using stronger opacity values */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/15 to-transparent pointer-events-none" />
      
      {/* Decorative pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTYgNnY2aDZ2LTZoLTZ6TTYgNnY2aDZ2LTZINnptNiA2djZoNnYtNmgtNnptNiAwaDZ2LTZoLTZ2NnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40 dark:opacity-20 pointer-events-none" />
      
      {/* Decorative blurred circles - larger and with higher opacity */}
      <div className="absolute -left-20 top-20 w-[400px] h-[400px] bg-primary/30 rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute -right-20 bottom-20 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute left-1/3 bottom-40 w-[300px] h-[300px] bg-blue-300/30 rounded-full blur-3xl opacity-50 pointer-events-none" />
      
      <div className="container mx-auto text-center px-4 relative z-10">
        {/* Badge - removed opacity-0 to ensure it's visible */}
        <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full mb-6 hero-animate">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-slow" />
          <span className="text-xs font-medium text-primary">AI-Powered Resume Optimization</span>
        </div>
        
        {/* Headline - removed opacity-0 to ensure it's visible */}
        <h1 className="text-4xl md:text-6xl font-semibold mb-6 mx-auto max-w-4xl text-balance hero-animate">
          Align Your Resume With Your 
          <span className="text-primary"> Dream Job</span>
        </h1>
        
        {/* Subheadline - removed opacity-0 to ensure it's visible */}
        <p className="text-xl text-muted-foreground mb-10 mx-auto max-w-2xl text-balance hero-animate">
          Intelligent resume analysis using the KSAO framework to maximize your potential
          and improve your chances of landing interviews.
        </p>
        
        {/* CTA buttons - removed opacity-0 to ensure they're visible */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 hero-animate">
          <Button size="lg" className="shadow-lg transition-all hover:shadow-xl px-8 py-6">
            Analyze My Resume
          </Button>
          <Button size="lg" variant="outline" className="border-2 transition-all px-8 py-6">
            How It Works
          </Button>
        </div>
        
        {/* Stats - now using animated stats with staggered delays */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto hero-animate-delayed">
          {stats.map((stat, index) => (
            <AnimatedStat 
              key={index} 
              value={stat.value} 
              label={stat.label}
              delay={index * 200} // Stagger the animations
            />
          ))}
        </div>
      </div>
      
      {/* Remove the gap between hero and the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
};
