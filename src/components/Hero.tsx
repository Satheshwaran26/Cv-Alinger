
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
  const fullText2 = "Unlock Your Dream Job Now.";

  useEffect(() => {
    document.querySelectorAll('.hero-animate').forEach(el => {
      el.classList.remove('opacity-0');
    });
    document.querySelectorAll('.hero-animate-delayed').forEach(el => {
      el.classList.remove('opacity-0');
    });

    return () => {};
  }, []);

  useEffect(() => {
    let timer1: ReturnType<typeof setTimeout>;
    let timer2: ReturnType<typeof setTimeout>;
    let currentIndex1 = 0;
    let currentIndex2 = 0;

    const type1 = () => {
      if (currentIndex1 < fullText1.length) {
        setDisplayedText1(prev => prev + fullText1.charAt(currentIndex1));
        currentIndex1++;
        timer1 = setTimeout(type1, 50);
      } else {
        type2();
      }
    };

    const type2 = () => {
      if (currentIndex2 < fullText2.length) {
        setDisplayedText2(prev => prev + fullText2.charAt(currentIndex2));
        currentIndex2++;
        timer2 = setTimeout(type2, 50);
      } else {
        setIsTypingComplete(true);
      }
    };

    timer1 = setTimeout(type1, 300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
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
    <section id="hero" className="relative w-full min-h-screen pt-16 pb-20 flex flex-col items-center justify-center bg-white dark:bg-gray-950" ref={containerRef}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 dark:bg-blue-900 dark:opacity-10"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 dark:bg-blue-900 dark:opacity-10"></div>
      </div>

      <div className="container max-w-screen-2xl mx-auto text-center px-4 md:px-8 relative z-10">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-blue-50 w-[90%] h-24 rounded-xl blur-xl opacity-30 dark:bg-blue-900 dark:opacity-10"></div>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-10 mx-auto max-w-6xl text-slate-900 leading-tight relative z-10 dark:text-white">
            <span className="bg-white px-4 py-2 rounded-xl shadow-sm inline-block mb-2 dark:bg-gray-900 min-h-[64px] min-w-[300px]">
              {displayedText1}
              {!isTypingComplete && <span className="animate-pulse text-orange-500 dark:text-orange-400">|</span>}
            </span>
            <br />
            <span className="bg-white px-4 py-2 rounded-xl shadow-sm inline-block dark:bg-gray-900 min-h-[64px] min-w-[400px]">
              {displayedText2}
              {!isTypingComplete && displayedText1.length === fullText1.length && <span className="animate-pulse text-orange-500 dark:text-orange-400">|</span>}
            </span>
          </h1>
        </div>

        <p className="text-lg md:text-xl text-slate-600 mb-8 mx-auto max-w-4xl leading-relaxed dark:text-slate-300">
          Revolutionize your job search with Resume AI - the cutting-edge tool that transforms your application from ordinary to extraordinary. Our advanced AI technology doesn't just create resumes; it crafts your ticket to career success.
        </p>

        <div className="mb-10">
          <button onClick={() => {
            const toolSection = document.getElementById('tool');
            if (toolSection) {
              toolSection.scrollIntoView({
                behavior: 'smooth'
              });
            }
          }} className="inline-flex items-center gap-3 bg-white py-2.5 rounded-full shadow-md hero-animate mx-auto hover:bg-gray-50 transition-all px-[20px] scale-90">
            <Rocket className="text-blue-600 h-5 w-5 rounded-none" />
            <span className="font-medium text-slate-800 text-2xl">Analyze Now</span>
            <div className="w-9 h-9 bg-green-400 rounded-full flex items-center justify-center text-white font-medium text-sm">97</div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto hero-animate-delayed mb-16">
          {stats.map((stat, index) => <div key={index} className="flex flex-col items-center">
              <AnimatedStat value={stat.value} label={stat.label} delay={index * 300}
                duration={2000}
              />
              <span className={`${stat.badge.bg} ${stat.badge.text} px-4 py-1 rounded-full text-sm font-medium mt-3`}>
                {stat.badge.content}
              </span>
            </div>)}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">
          <Card className="border-blue-100 bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 shadow-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-500/30 hover:bg-gradient-to-br hover:from-white hover:to-blue-100">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6 dark:bg-blue-900/30 transition-transform duration-300 group-hover:scale-110">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Customize for Success</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Use our AI-powered ATS tool to tailor your resume for each job. It matches keywords from the job description to boost your chances of landing an interview.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-100 bg-gradient-to-br from-white to-green-50 dark:from-slate-900 dark:to-slate-800 shadow-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-green-200 dark:hover:border-green-500/30 hover:bg-gradient-to-br hover:from-white hover:to-green-100">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6 dark:bg-green-900/30 transition-transform duration-300 group-hover:scale-110">
                <Star className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Show Off Your Strengths</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Highlight what makes you unique. Our AI resume builder gives clear suggestions so you can stand out from the competition.
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-100 bg-gradient-to-br from-white to-orange-50 dark:from-slate-900 dark:to-slate-800 shadow-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-orange-200 dark:hover:border-orange-500/30 hover:bg-gradient-to-br hover:from-white hover:to-orange-100">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-6 dark:bg-orange-900/30 transition-transform duration-300 group-hover:scale-110">
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
