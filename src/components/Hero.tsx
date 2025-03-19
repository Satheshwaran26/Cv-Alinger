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
        bg: "bg-rose-100/80 dark:bg-rose-900/30",
        text: "text-rose-600 dark:text-rose-400",
        content: "Boost Your Interview Chances"
      }
    },
    {
      value: "75%",
      label: "Improvement in interview chances",
      badge: {
        bg: "bg-teal-100/80 dark:bg-teal-900/30",
        text: "text-teal-600 dark:text-teal-400",
        content: "Optimize Your Resume with AI"
      }
    },
    {
      value: "250",
      label: "Successful job matches",
      badge: {
        bg: "bg-violet-100/80 dark:bg-violet-900/30",
        text: "text-violet-600 dark:text-violet-400",
        content: "Get Instant, Data-Driven Feedback"
      }
    }
  ];

  return (
    <section id="hero" className="relative w-full min-h-screen pt-16 pb-20 flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-white to-violet-50 dark:from-gray-950 dark:via-gray-900 dark:to-violet-950" ref={containerRef}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-rose-200/30 to-violet-300/30 rounded-full blur-3xl dark:from-rose-900/20 dark:to-violet-900/20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-teal-200/30 to-rose-300/30 rounded-full blur-3xl dark:from-teal-900/20 dark:to-rose-900/20 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-violet-200/20 to-rose-300/20 rounded-full blur-3xl dark:from-violet-900/10 dark:to-rose-900/10 animate-pulse delay-1000"></div>
      </div>

      <div className="container max-w-screen-2xl mx-auto text-center px-4 md:px-8 relative z-10">
        <div className="relative mb-16">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gradient-to-r from-rose-100/50 via-violet-100/50 to-teal-100/50 w-[90%] h-32 rounded-2xl blur-2xl opacity-50 dark:from-rose-900/20 dark:via-violet-900/20 dark:to-teal-900/20"></div>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-10 mx-auto max-w-6xl text-slate-900 leading-tight relative z-10 dark:text-white">
            <span className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl inline-block mb-3 dark:bg-gray-900/80 min-h-[64px] min-w-[300px] border border-white/20 dark:border-gray-700/30">
              {displayedText1}
              {!isTypingComplete && <span className="animate-pulse text-rose-500 dark:text-rose-400">|</span>}
            </span>
            <br />
            <span className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl inline-block dark:bg-gray-900/80 min-h-[64px] min-w-[400px] border border-white/20 dark:border-gray-700/30">
              {displayedText2}
              {!isTypingComplete && displayedText1.length === fullText1.length && <span className="animate-pulse text-rose-500 dark:text-rose-400">|</span>}
            </span>
          </h1>
        </div>

        <p className="text-lg md:text-xl text-slate-700 mb-12 mx-auto max-w-4xl leading-relaxed dark:text-slate-300 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-white/20 dark:border-gray-700/30">
          Revolutionize your job search with Resume AI - the cutting-edge tool that transforms your application from ordinary to extraordinary. Our advanced AI technology doesn't just create resumes; it crafts your ticket to career success.
        </p>

        <div className="mb-16">
          <button onClick={() => {
            const toolSection = document.getElementById('tool');
            if (toolSection) {
              toolSection.scrollIntoView({
                behavior: 'smooth'
              });
            }
          }} className="inline-flex items-center gap-4 bg-gradient-to-r from-rose-500 to-violet-500 py-4 px-8 rounded-2xl shadow-lg hero-animate mx-auto hover:from-rose-600 hover:to-violet-600 transition-all duration-300 transform hover:scale-105 group border border-white/20">
            <Rocket className="text-white h-6 w-6" />
            <span className="font-medium text-white text-2xl">Analyze Now</span>
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-medium text-lg border border-white/30 group-hover:bg-white/30">97</div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto hero-animate-delayed mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 p-6 rounded-2xl border border-white/20 dark:border-gray-700/30">
              <AnimatedStat value={stat.value} label={stat.label} delay={index * 300} duration={2000} />
              <span className={`${stat.badge.bg} ${stat.badge.text} px-6 py-2 rounded-xl text-sm font-medium mt-4 shadow-lg backdrop-blur-sm border border-white/20`}>
                {stat.badge.content}
              </span>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">
          <Card className="bg-gradient-to-br from-white/80 to-rose-50/80 dark:from-gray-900/80 dark:to-rose-900/20 shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 border border-white/20 dark:border-gray-700/30 backdrop-blur-sm rounded-2xl">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-violet-500 rounded-xl flex items-center justify-center mb-6 transform rotate-6 transition-transform duration-300 group-hover:rotate-12 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Customize for Success</h3>
              <p className="text-slate-700 dark:text-slate-300">
                Use our AI-powered ATS tool to tailor your resume for each job. It matches keywords from the job description to boost your chances of landing an interview.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/80 to-violet-50/80 dark:from-gray-900/80 dark:to-violet-900/20 shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 border border-white/20 dark:border-gray-700/30 backdrop-blur-sm rounded-2xl">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-teal-500 rounded-xl flex items-center justify-center mb-6 transform -rotate-6 transition-transform duration-300 group-hover:-rotate-12 shadow-lg">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Show Off Your Strengths</h3>
              <p className="text-slate-700 dark:text-slate-300">
                Highlight what makes you unique. Our AI resume builder gives clear suggestions so you can stand out from the competition.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/80 to-teal-50/80 dark:from-gray-900/80 dark:to-teal-900/20 shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 border border-white/20 dark:border-gray-700/30 backdrop-blur-sm rounded-2xl">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-rose-500 rounded-xl flex items-center justify-center mb-6 transform rotate-6 transition-transform duration-300 group-hover:rotate-12 shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Make Your Experience Count</h3>
              <p className="text-slate-700 dark:text-slate-300">
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
