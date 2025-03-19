
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {  ThumbsUp, ThumbsDown, Copy, Sparkles, GraduationCap, Briefcase, Brain } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { InterviewTips } from "./InterviewTips";

interface InterviewPreparationProps {
  cvContent: string;
  jobDescription: string;
}

interface InterviewQuestion {
  id: number;
  question: string;
  context: string;
  difficulty: "easy" | "medium" | "hard";
}

export const InterviewPreparation = ({ cvContent, jobDescription }: InterviewPreparationProps) => {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTips, setShowTips] = useState(false);
  
  // This is a mock function that would be replaced with actual AI logic
  const generateInterviewQuestions = async () => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call an API
      // For now, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockQuestions: InterviewQuestion[] = [
        {
          id: 1,
          question: "Can you elaborate on your experience with content management systems mentioned in your CV?",
          context: "Based on mentions of content management in your CV",
          difficulty: "medium"
        },
        {
          id: 2,
          question: "How have you used data analysis to drive marketing strategy decisions in your previous roles?",
          context: "To address the gap in data analysis skills",
          difficulty: "hard"
        },
        {
          id: 3,
          question: "Could you provide an example of a challenging project you managed and how you ensured its success?",
          context: "Related to your project management experience",
          difficulty: "medium"
        },
        {
          id: 4,
          question: "How do you stay updated with the latest social media trends and platforms?",
          context: "Based on your social media experience",
          difficulty: "easy"
        },
        {
          id: 5,
          question: "Describe a situation where you had to adapt your marketing strategy based on unexpected changes.",
          context: "To assess adaptability as mentioned in your analysis",
          difficulty: "medium"
        }
      ];
      
      setQuestions(mockQuestions);
      
      toast({
        title: "Questions Generated",
        description: "We've prepared some potential interview questions based on your CV and job description.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "We couldn't generate interview questions at this time. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Question copied to clipboard successfully.",
    });
  };
  
  // Mock feedback function - in a real app, this would send feedback to improve the AI
  const sendFeedback = (questionId: number, isPositive: boolean) => {
    toast({
      title: `${isPositive ? "Helpful" : "Not Helpful"} feedback sent`,
      description: "Thank you for your feedback on this question."
    });
    
    // In a real app, we'd remove the question from the list or mark it
    if (!isPositive) {
      setQuestions(questions.filter(q => q.id !== questionId));
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case "easy": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "hard": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 border-2 border-indigo-100 dark:border-indigo-900 bg-gradient-to-br from-white to-indigo-50 dark:from-slate-900 dark:to-indigo-950 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full">
              <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">Interview Preparation</h3>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowTips(!showTips)} 
              variant="outline"
              className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900"
            >
              <GraduationCap className="mr-2 h-4 w-4" />
              {showTips ? "Hide Tips" : "Show Tips"}
            </Button>
            <Button 
              onClick={generateInterviewQuestions} 
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Brain className="mr-2 h-4 w-4" />
              {isLoading ? "Generating..." : "Generate Questions"}
            </Button>
          </div>
        </div>
        
        {showTips && (
          <div className="mb-6 animate-scale-in">
            <InterviewTips />
          </div>
        )}
        
        {questions.length === 0 && !isLoading && !showTips && (
          <div className="text-center py-12 px-4">
            <div className="mb-4 mx-auto w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
              <Briefcase className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h4 className="text-xl font-medium mb-2 text-indigo-700 dark:text-indigo-300">Prepare for Your Interview</h4>
            <p className="text-muted-foreground max-w-md mx-auto">
              Get AI-generated questions based on your CV and the job description to help you prepare for your upcoming interview.
            </p>
          </div>
        )}
        
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-indigo-200 dark:bg-indigo-800 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-indigo-200 dark:bg-indigo-800 rounded"></div>
                  <div className="h-4 bg-indigo-200 dark:bg-indigo-800 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {questions.length > 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {questions.map((question) => (
                <div 
                  key={question.id} 
                  className="border rounded-lg p-4 transition-all duration-200 hover:shadow-md bg-white dark:bg-slate-800 hover:translate-y-[-2px]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => sendFeedback(question.id, true)}
                        className="h-8 w-8 p-0 text-green-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => sendFeedback(question.id, false)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard(question.question)}
                        className="h-8 w-8 p-0 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-foreground font-medium mb-2">{question.question}</p>
                  <p className="text-sm text-muted-foreground italic">{question.context}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
