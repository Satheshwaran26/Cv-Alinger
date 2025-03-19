import { useEffect } from "react";
import { Link } from "react-router-dom";
import { setupIntersectionObserver } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { BookOpenText, CheckSquare, BarChart3, Clock, LineChart, Sparkles } from "lucide-react";

const features = [
  {
    icon: <CheckSquare className="w-8 h-8 text-white" />,
    title: "AI-Powered Matching",
    description:
      "Our system evaluates how well your resume aligns with a specific job description, providing a precise compatibility score.",
    link: "/blog/ksao-hr-framework",
    gradient: "from-fuchsia-500 to-violet-500 dark:from-fuchsia-400 dark:to-violet-400"
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-white" />,
    title: "KSAOs-Based Analysis",
    description:
      "Assessment of Knowledge, Skills, Abilities, and Other Characteristics to ensure a comprehensive evaluation of your resume.",
    link: "/blog/ksao-hr-framework",
    gradient: "from-violet-500 to-cyan-500 dark:from-violet-400 dark:to-cyan-400"
  },
  {
    icon: <LineChart className="w-8 h-8 text-white" />,
    title: "Actionable Insights",
    description:
      "Receive detailed feedback on gaps and strengths, with specific recommendations to enhance your resume and improve your chances.",
    link: null,
    gradient: "from-cyan-500 to-fuchsia-500 dark:from-cyan-400 dark:to-fuchsia-400"
  },
  {
    icon: <Clock className="w-8 h-8 text-white" />,
    title: "Real-Time Optimization",
    description:
      "Get instant suggestions on wording, missing skills, and formatting improvements for better alignment with job requirements.",
    link: null,
    gradient: "from-fuchsia-500 to-cyan-500 dark:from-fuchsia-400 dark:to-cyan-400"
  },
];

export const Features = () => {
  useEffect(() => {
    const observer = setupIntersectionObserver(
      '.feature-card',
      'animate-slide-up',
      0.1,
      '20px'
    );
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section id="features" className="py-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-fuchsia-100 via-white to-cyan-100 dark:from-gray-900 dark:via-slate-900 dark:to-cyan-950 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-fuchsia-200/40 via-violet-200/40 to-cyan-200/40 rounded-full blur-3xl dark:from-fuchsia-900/20 dark:via-violet-900/20 dark:to-cyan-900/20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-cyan-200/40 via-violet-200/40 to-fuchsia-200/40 rounded-full blur-3xl dark:from-cyan-900/20 dark:via-violet-900/20 dark:to-fuchsia-900/20 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-200/30 via-fuchsia-200/30 to-cyan-200/30 rounded-full blur-3xl dark:from-violet-900/20 dark:via-fuchsia-900/20 dark:to-cyan-900/20 animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 feature-animate">
          <div className="inline-block">
            
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 dark:from-fuchsia-400 dark:via-violet-400 dark:to-cyan-400 text-transparent bg-clip-text">
                Key Platform Features
              </h2>
            
          </div>
          <p className="text-slate-700 dark:text-slate-200 text-lg md:text-xl max-w-2xl mx-auto mt-8 bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-md p-8 rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl">
            Our comprehensive toolset is designed to give you a competitive edge in today's job market.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card group bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-md p-8 rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-2xl transition-all duration-500 hover:scale-105 opacity-0 transform translate-y-8"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-cyan-500/5 dark:from-fuchsia-500/10 dark:to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 transform rotate-3 transition-transform duration-300 group-hover:rotate-6 shadow-xl`}>
                  <div className="animate-pulse-slow hover:animate-spin transition-all duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 dark:from-fuchsia-400 dark:via-violet-400 dark:to-cyan-400 text-transparent bg-clip-text">
                  {feature.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-lg mb-6">
                  {feature.description}
                </p>
                
                {feature.link && (
                  <div className="mt-6">
                    <Link to={feature.link}>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="group relative bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-900/95 dark:to-gray-900/80 backdrop-blur-md border border-white/30 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:scale-105 flex items-center gap-3"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 dark:from-fuchsia-500/20 dark:to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                        <BookOpenText className="h-5 w-5" />
                        <span className="relative z-10">Learn More</span>
                        <Sparkles className="h-4 w-4 text-fuchsia-500 dark:text-fuchsia-400 animate-pulse" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
