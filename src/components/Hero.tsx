
import { useEffect, useRef, useState } from "react";
import { AnimatedStat } from "./AnimatedStat";
import { Rocket, Zap, Star, Trophy, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayedText1, setDisplayedText1] = useState("");
  const [displayedText2, setDisplayedText2] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText1 = "AI-Powered Resume:";
  const fullText2 = "Unlock Your Dream Job Faster.";

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

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let currentIndex1 = 0;
    
    // Type the first text
    const typeText1 = () => {
      if (currentIndex1 <= fullText1.length) {
        setDisplayedText1(fullText1.substring(0, currentIndex1));
        currentIndex1++;
        timeoutId = setTimeout(typeText1, 100); // Adjust speed as needed
      } else {
        // Start typing the second text once the first is complete
        let currentIndex2 = 0;
        const typeText2 = () => {
          if (currentIndex2 <= fullText2.length) {
            setDisplayedText2(fullText2.substring(0, currentIndex2));
            currentIndex2++;
            timeoutId = setTimeout(typeText2, 100); // Adjust speed as needed
          } else {
            setIsTypingComplete(true);
          }
        };
        typeText2();
      }
    };
    
    timeoutId = setTimeout(typeText1, 500); // Delay before starting animation
    
    // Clean up timeouts when component unmounts
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const stats = [
    { 
      value: "98%", 
      label: "Accuracy in skill matching",
      badge: {
        bg: "bg-orange-100 dark:bg-orange-900/30",
        text: "text-orange-600 dark:text-orange-400",
        content: "Boost Your Interview Chances" 
      }
    },
    { 
      value: "75%", 
      label: "Improvement in interview chances",
      badge: {
        bg: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-600 dark:text-green-400",
        content: "Optimize Your Resume with AI" 
      }
    },
    { 
      value: "250", 
      label: "Successful job matches",
      badge: {
        bg: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-600 dark:text-blue-400",
        content: "Get Instant, Data-Driven Feedback" 
      }
    }
  ];

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-screen pt-16 pb-20 flex flex-col items-center justify-center bg-white dark:bg-gray-950"
      ref={containerRef}
    >
      {/* Background light elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 dark:bg-blue-900 dark:opacity-10"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 dark:bg-blue-900 dark:opacity-10"></div>
      </div>
      
      <div className="container max-w-screen-2xl mx-auto text-center px-4 md:px-8 relative z-10">
        {/* Main headline - now with typing animation */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-blue-50 w-[90%] h-24 rounded-xl blur-xl opacity-30 dark:bg-blue-900 dark:opacity-10"></div>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-10 mx-auto max-w-6xl text-slate-900 leading-tight relative z-10 dark:text-white">
            <span className="bg-white px-4 py-2 rounded-xl shadow-sm inline-block mb-2 dark:bg-gray-900 min-h-[64px] min-w-[300px]">
              {displayedText1}
              {!isTypingComplete && currentIndex1 <= fullText1.length && <span className="animate-pulse text-orange-500 dark:text-orange-400">|</span>}
            </span>
            <br />
            <span className="bg-white px-4 py-2 rounded-xl shadow-sm inline-block dark:bg-gray-900 min-h-[64px] min-w-[400px]">
              {displayedText2}
              {!isTypingComplete && currentIndex1 > fullText1.length && <span className="animate-pulse text-orange-500 dark:text-orange-400">|</span>}
            </span>
          </h1>
        </div>
        
        {/* Subheadline */}
        <p className="text-lg md:text-xl text-slate-600 mb-8 mx-auto max-w-4xl leading-relaxed dark:text-slate-300">
          Revolutionize your job search with Resume AI - the cutting-edge tool that transforms your application from ordinary to extraordinary. Our advanced AI technology doesn't just create resumes; it crafts your ticket to career success.
        </p>
        
        {/* CTA Button */}
        <div className="mb-10">
          <button 
            onClick={() => {
              const toolSection = document.getElementById('tool');
              if (toolSection) {
                toolSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-md hero-animate mx-auto hover:bg-gray-50 transition-all"
          >
            <Rocket className="text-blue-600 h-4 w-4" />
            <span className="text-sm font-medium text-slate-800">Analyze Now</span>
            <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-white font-medium text-sm">97</div>
          </button>
        </div>
        
        {/* Stats integrated with badges - Now using AnimatedStat component */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto hero-animate-delayed mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <AnimatedStat 
                value={stat.value} 
                label={stat.label} 
                delay={index * 300} // Stagger the animation by 300ms per stat
                duration={2000} // 2 seconds animation duration
              />
              <span className={`${stat.badge.bg} ${stat.badge.text} px-4 py-1 rounded-full text-sm font-medium mt-3`}>
                {stat.badge.content}
              </span>
            </div>
          ))}
        </div>

        {/* Key Benefits Section - Moved from How It Works page */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">
          <Card className="border-blue-100 bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 shadow-md overflow-hidden">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6 dark:bg-blue-900/30">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Customize for Success</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Use our AI-powered ATS tool to tailor your resume for each job. It matches keywords from the job description to boost your chances of landing an interview.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-100 bg-gradient-to-br from-white to-green-50 dark:from-slate-900 dark:to-slate-800 shadow-md overflow-hidden">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6 dark:bg-green-900/30">
                <Star className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Show Off Your Strengths</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Highlight what makes you unique. Our AI resume builder gives clear suggestions so you can stand out from the competition.
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-100 bg-gradient-to-br from-white to-orange-50 dark:from-slate-900 dark:to-slate-800 shadow-md overflow-hidden">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-6 dark:bg-orange-900/30">
                <Trophy className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Make Your Experience Count</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Beyond basic checks, our AI refines your resume to showcase impactful achievements and make every experience count.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;
