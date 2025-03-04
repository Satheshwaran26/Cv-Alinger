
import { useEffect } from "react";
import { setupIntersectionObserver } from "@/lib/animations";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59L21 7Z" fill="currentColor" />
      </svg>
    ),
    title: "AI-Powered Matching",
    description:
      "Our system evaluates how well your resume aligns with a specific job description, providing a precise compatibility score.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3H21V21H3V3ZM9 15V17H7V15H9ZM9 11V13H7V11H9ZM9 7V9H7V7H9ZM17 15V17H11V15H17ZM17 11V13H11V11H17ZM17 7V9H11V7H17Z" fill="currentColor" />
      </svg>
    ),
    title: "KSAOs-Based Analysis",
    description:
      "Assessment of Knowledge, Skills, Abilities, and Other Characteristics to ensure a comprehensive evaluation of your resume.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12.75 9V6.75H11.25V9H8.25V10.5H11.25V12H9C8.586 12 8.25 12.336 8.25 12.75V16.5H12.75V15H9.75V13.5H12.75C13.164 13.5 13.5 13.164 13.5 12.75V9.75C13.5 9.336 13.164 9 12.75 9ZM15.75 9V15.75H14.25V9H15.75Z" fill="currentColor" />
      </svg>
    ),
    title: "Actionable Insights",
    description:
      "Receive detailed feedback on gaps and strengths, with specific recommendations to enhance your resume and improve your chances.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2.05V5.08C16.39 5.57 19 8.47 19 12C19 15.87 15.87 19 12 19C8.47 19 5.57 16.39 5.08 13H2.05C2.56 17.95 6.81 22 12 22C17.51 22 22 17.51 22 12C22 6.81 17.95 2.56 13 2.05ZM7.1 5.69C4.83 7.19 3.34 9.92 3.05 13H6.08C6.35 10.85 7.54 9 9.18 7.73L7.1 5.69ZM2.05 11H5.05C5.03 10.67 5 10.34 5 10C5 9.37 5.1 8.77 5.25 8.2L2.4 7.47C2.15 8.27 2 9.12 2 10C2 10.34 2.02 10.67 2.05 11ZM12 5C11.33 5 10.69 5.1 10.09 5.25L9.34 2.4C10.15 2.16 11 2 11.82 2H12.19C11.94 2.7 11.87 3.4 12 4C12.1 4.44 12.36 4.78 12.74 5H12ZM10 5C5.58 5 2 8.58 2 13C2 17.42 5.58 21 10 21C14.42 21 18 17.42 18 13C18 8.58 14.42 5 10 5ZM11.5 14.8L14.03 16.15L14.54 14.59L12 13.24V9H10.5V14.8Z" fill="currentColor" />
      </svg>
    ),
    title: "Real-Time Optimization",
    description:
      "Get instant suggestions on wording, missing skills, and formatting improvements for better alignment with job requirements.",
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
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
