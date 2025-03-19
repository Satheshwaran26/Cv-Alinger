import { FC, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MicIcon, BookTextIcon, GraduationCapIcon, MessageSquareTextIcon, InfoIcon, ClockIcon, Sparkles } from 'lucide-react';
import { setupIntersectionObserver } from '@/lib/animations';

interface TipType {
  id: number;
  title: string;
  content: string;
  category: string;
  icon: JSX.Element;
  gradient: string;
}

export const InterviewTips: FC = () => {
  const tips: TipType[] = [
    {
      id: 1,
      title: "Research the Company",
      content: "Study the company's website, social media, and recent news to understand their values, culture, and challenges.",
      category: "Preparation",
      icon: <BookTextIcon className="h-6 w-6 text-white" />,
      gradient: "from-fuchsia-500 to-violet-500 dark:from-fuchsia-400 dark:to-violet-400"
    },
    {
      id: 2,
      title: "Practice STAR Method",
      content: "Structure your answers using Situation, Task, Action, and Result to provide comprehensive and impactful responses.",
      category: "Technique",
      icon: <GraduationCapIcon className="h-6 w-6 text-white" />,
      gradient: "from-violet-500 to-cyan-500 dark:from-violet-400 dark:to-cyan-400"
    },
    {
      id: 3,
      title: "Prepare Questions",
      content: "Develop thoughtful questions about the role, team, and company growth to demonstrate your interest and engagement.",
      category: "Preparation",
      icon: <MessageSquareTextIcon className="h-6 w-6 text-white" />,
      gradient: "from-cyan-500 to-fuchsia-500 dark:from-cyan-400 dark:to-fuchsia-400"
    },
    {
      id: 4,
      title: "Body Language Matters",
      content: "Maintain good posture, make eye contact, and use confident hand gestures to project professionalism and confidence.",
      category: "Presentation",
      icon: <MicIcon className="h-6 w-6 text-white" />,
      gradient: "from-fuchsia-500 to-cyan-500 dark:from-fuchsia-400 dark:to-cyan-400"
    },
    {
      id: 5,
      title: "Follow Up Appropriately",
      content: "Send a personalized thank-you email within 24 hours, referencing specific conversation points from the interview.",
      category: "Post-Interview",
      icon: <InfoIcon className="h-6 w-6 text-white" />,
      gradient: "from-violet-500 to-fuchsia-500 dark:from-violet-400 dark:to-fuchsia-400"
    },
    {
      id: 6,
      title: "Be Punctual and Prepared",
      content: "Arrive 10-15 minutes early with extra copies of your resume, a notepad, and questions to show professionalism and reliability.",
      category: "Preparation",
      icon: <ClockIcon className="h-6 w-6 text-white" />,
      gradient: "from-cyan-500 to-violet-500 dark:from-cyan-400 dark:to-violet-400"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch(category) {
      case "Preparation": 
        return "bg-gradient-to-r from-fuchsia-100/90 to-violet-100/90 text-fuchsia-700 dark:from-fuchsia-900/40 dark:to-violet-900/40 dark:text-fuchsia-300";
      case "Technique": 
        return "bg-gradient-to-r from-violet-100/90 to-cyan-100/90 text-violet-700 dark:from-violet-900/40 dark:to-cyan-900/40 dark:text-violet-300";
      case "Presentation": 
        return "bg-gradient-to-r from-cyan-100/90 to-fuchsia-100/90 text-cyan-700 dark:from-cyan-900/40 dark:to-fuchsia-900/40 dark:text-cyan-300";
      case "Post-Interview": 
        return "bg-gradient-to-r from-fuchsia-100/90 to-cyan-100/90 text-fuchsia-700 dark:from-fuchsia-900/40 dark:to-cyan-900/40 dark:text-fuchsia-300";
      default: 
        return "bg-gradient-to-r from-slate-100/90 to-slate-200/90 text-slate-700 dark:from-slate-800/40 dark:to-slate-700/40 dark:text-slate-300";
    }
  };

  useEffect(() => {
    const observer = setupIntersectionObserver(
      '.tip-card',
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
    <section id="interview-tips" className="py-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-fuchsia-100 via-white to-cyan-100 dark:from-gray-900 dark:via-slate-900 dark:to-cyan-950 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-fuchsia-200/40 via-violet-200/40 to-cyan-200/40 rounded-full blur-3xl dark:from-fuchsia-900/20 dark:via-violet-900/20 dark:to-cyan-900/20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-cyan-200/40 via-violet-200/40 to-fuchsia-200/40 rounded-full blur-3xl dark:from-cyan-900/20 dark:via-violet-900/20 dark:to-fuchsia-900/20 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-200/30 via-fuchsia-200/30 to-cyan-200/30 rounded-full blur-3xl dark:from-violet-900/20 dark:via-fuchsia-900/20 dark:to-cyan-900/20 animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 r  elative z-10">
        <div className="text-center mb-16">
          <div className="inline-block">
           
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 dark:from-fuchsia-400 dark:via-violet-400 dark:to-cyan-400 text-transparent bg-clip-text flex items-center justify-center gap-3">
                Ace Your Interview <Sparkles className="h-8 w-8 text-fuchsia-500 dark:text-fuchsia-400 animate-pulse" />
              </h2>
          
          </div>
          <p className="text-slate-700 dark:text-slate-200 text-lg md:text-xl max-w-2xl mx-auto mt-8 bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-md p-8 rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl">
            Essential tips and strategies to help you prepare, perform, and follow up effectively for your next job interview.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tips.map((tip, index) => (
            <Card 
              key={tip.id} 
              className="tip-card group bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-2xl transition-all duration-500 hover:scale-105 opacity-0 transform translate-y-8 overflow-hidden"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardHeader className="pb-2 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-cyan-500/5 dark:from-fuchsia-500/10 dark:to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${tip.gradient} rounded-xl flex items-center justify-center transform rotate-3 transition-transform duration-300 group-hover:rotate-6 shadow-xl`}>
                    <div className="animate-pulse-slow hover:animate-spin transition-all duration-300">
                      {tip.icon}
                    </div>
                  </div>
                  <Badge className={`${getCategoryColor(tip.category)} px-4 py-1.5 text-sm font-medium shadow-lg backdrop-blur-md border border-white/30 dark:border-white/10`}>
                    {tip.category}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold mb-2 bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 dark:from-fuchsia-400 dark:via-violet-400 dark:to-cyan-400 text-transparent bg-clip-text">
                  {tip.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-700 dark:text-slate-300 text-lg">
                  {tip.content}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
