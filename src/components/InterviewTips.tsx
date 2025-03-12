import { FC, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MicIcon, BookTextIcon, GraduationCapIcon, MessageSquareTextIcon, InfoIcon, ClockIcon } from 'lucide-react';
import { setupIntersectionObserver } from '@/lib/animations';

interface TipType {
  id: number;
  title: string;
  content: string;
  category: string;
  icon: JSX.Element;
}

export const InterviewTips: FC = () => {
  const tips: TipType[] = [
    {
      id: 1,
      title: "Research the Company",
      content: "Study the company's website, social media, and recent news to understand their values, culture, and challenges.",
      category: "Preparation",
      icon: <BookTextIcon className="h-5 w-5 text-blue-500" />
    },
    {
      id: 2,
      title: "Practice STAR Method",
      content: "Structure your answers using Situation, Task, Action, and Result to provide comprehensive and impactful responses.",
      category: "Technique",
      icon: <GraduationCapIcon className="h-5 w-5 text-green-500" />
    },
    {
      id: 3,
      title: "Prepare Questions",
      content: "Develop thoughtful questions about the role, team, and company growth to demonstrate your interest and engagement.",
      category: "Preparation",
      icon: <MessageSquareTextIcon className="h-5 w-5 text-purple-500" />
    },
    {
      id: 4,
      title: "Body Language Matters",
      content: "Maintain good posture, make eye contact, and use confident hand gestures to project professionalism and confidence.",
      category: "Presentation",
      icon: <MicIcon className="h-5 w-5 text-orange-500" />
    },
    {
      id: 5,
      title: "Follow Up Appropriately",
      content: "Send a personalized thank-you email within 24 hours, referencing specific conversation points from the interview.",
      category: "Post-Interview",
      icon: <InfoIcon className="h-5 w-5 text-blue-500" />
    },
    {
      id: 6,
      title: "Be Punctual and Prepared",
      content: "Arrive 10-15 minutes early with extra copies of your resume, a notepad, and questions to show professionalism and reliability.",
      category: "Preparation",
      icon: <ClockIcon className="h-5 w-5 text-red-500" />
    }
  ];

  const getCategoryColor = (category: string) => {
    switch(category) {
      case "Preparation": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Technique": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Presentation": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "Post-Interview": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
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
    <section id="interview-tips" className="py-16 relative overflow-hidden bg-white dark:bg-gray-950">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-20 dark:bg-blue-900 dark:opacity-10"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-20 dark:bg-blue-900 dark:opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Ace Your Interview</h2>
          <p className="text-slate-600 max-w-2xl mx-auto dark:text-slate-400">
            Essential tips and strategies to help you prepare, perform, and follow up effectively for your next job interview.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tips.map((tip, index) => (
            <Card 
              key={tip.id} 
              className="tip-card bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 opacity-0 transform translate-y-8"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <div className="h-10 w-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center animate-pulse-slow">
                    {tip.icon}
                  </div>
                  <Badge className={`${getCategoryColor(tip.category)}`}>
                    {tip.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                  {tip.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 dark:text-slate-400 text-base">
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
