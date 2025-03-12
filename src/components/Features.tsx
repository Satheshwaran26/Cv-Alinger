
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { setupIntersectionObserver } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { BookOpenText, CheckSquare, BarChart3, Clock, LineChart } from "lucide-react";

const features = [
  {
    icon: <CheckSquare className="w-6 h-6 text-green-600 dark:text-green-400" />,
    title: "AI-Powered Matching",
    description:
      "Our system evaluates how well your resume aligns with a specific job description, providing a precise compatibility score.",
    link: "/blog/ksao-hr-framework",
    bgColor: "bg-green-100 dark:bg-green-900/30"
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    title: "KSAOs-Based Analysis",
    description:
      "Assessment of Knowledge, Skills, Abilities, and Other Characteristics to ensure a comprehensive evaluation of your resume.",
    link: "/blog/ksao-hr-framework",
    bgColor: "bg-blue-100 dark:bg-blue-900/30"
  },
  {
    icon: <LineChart className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
    title: "Actionable Insights",
    description:
      "Receive detailed feedback on gaps and strengths, with specific recommendations to enhance your resume and improve your chances.",
    link: null,
    bgColor: "bg-orange-100 dark:bg-orange-900/30"
  },
  {
    icon: <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
    title: "Real-Time Optimization",
    description:
      "Get instant suggestions on wording, missing skills, and formatting improvements for better alignment with job requirements.",
    link: null,
    bgColor: "bg-purple-100 dark:bg-purple-900/30"
  },
];

export const Features = () => {
  useEffect(() => {
    // Apply animation class immediately instead of waiting for intersection
    document.querySelectorAll('.feature-animate').forEach(el => {
      el.classList.add('animate-slide-up');
      el.classList.remove('opacity-0');
    });
    
    return () => {};
  }, []);

  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      {/* Add a top gradient to create a seamless transition */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-blue-100/50 to-transparent dark:from-blue-900/30 z-0" />
      
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/30 dark:from-blue-950/20 dark:to-purple-950/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 feature-animate">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Key Platform Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive toolset is designed to give you a competitive edge in today's job market.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass rounded-xl p-6 transition-all hover:shadow-md feature-animate"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-full ${feature.bgColor} flex items-center justify-center mb-4 animate-icon`}>
                <div className="animate-pulse-slow hover:animate-spin transition-all duration-300">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
              
              {feature.link && (
                <div className="mt-4">
                  <Link to={feature.link}>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <BookOpenText className="h-4 w-4" />
                      <span>Learn More</span>
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
