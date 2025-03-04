
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { setupIntersectionObserver } from "@/lib/animations";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = setupIntersectionObserver('.hero-animate', 'animate-slide-up');
    setupIntersectionObserver('.hero-animate-delayed', 'animate-slide-up', 0.1, '-10px');
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full pt-20 flex flex-col items-center justify-center overflow-hidden" ref={containerRef}>
      {/* Background gradient - Increased opacity and added more layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-primary/10 to-transparent dark:from-blue-950/40 dark:via-primary/15 dark:to-transparent" />
      
      {/* Subtle grid pattern - increased opacity */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTYgNnY2aDZ2LTZoLTZ6TTYgNnY2aDZ2LTZINnptNiA2djZoNnYtNmgtNnptNiAwaDZ2LTZoLTZ2NnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40 dark:opacity-20" />
      
      {/* Decorative blurred shapes - increased size and opacity */}
      <div className="absolute left-1/4 top-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
      <div className="absolute right-1/4 bottom-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl opacity-40" />
      
      <div className="container mx-auto text-center px-4 relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full mb-6 opacity-0 hero-animate">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-slow" />
          <span className="text-xs font-medium text-primary">AI-Powered CV Optimization</span>
        </div>
        
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-semibold mb-6 mx-auto max-w-4xl text-balance opacity-0 hero-animate" style={{ animationDelay: "100ms" }}>
          Align Your Resume With Your 
          <span className="text-primary"> Dream Job</span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-xl text-muted-foreground mb-10 mx-auto max-w-2xl text-balance opacity-0 hero-animate" style={{ animationDelay: "200ms" }}>
          Intelligent CV analysis using the KSAO framework to maximize your potential
          and improve your chances of landing interviews.
        </p>
        
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 opacity-0 hero-animate" style={{ animationDelay: "300ms" }}>
          <Button size="lg" className="shadow-lg transition-all hover:shadow-xl px-8 py-6">
            Analyze My Resume
          </Button>
          <Button size="lg" variant="outline" className="border-2 transition-all px-8 py-6">
            How It Works
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto opacity-0 hero-animate-delayed">
          <div className="glass rounded-xl p-6 transition-transform hover:translate-y-[-5px]">
            <div className="font-semibold text-3xl mb-2 text-primary">98%</div>
            <p className="text-sm text-muted-foreground">Accuracy in skill matching</p>
          </div>
          <div className="glass rounded-xl p-6 transition-transform hover:translate-y-[-5px]">
            <div className="font-semibold text-3xl mb-2 text-primary">75%</div>
            <p className="text-sm text-muted-foreground">Improvement in interview chances</p>
          </div>
          <div className="glass rounded-xl p-6 transition-transform hover:translate-y-[-5px]">
            <div className="font-semibold text-3xl mb-2 text-primary">5k+</div>
            <p className="text-sm text-muted-foreground">Successful job matches</p>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </div>
  );
};
