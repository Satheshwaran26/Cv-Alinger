
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, ThumbsUp, ThumbsDown, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
    <Card className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold">Interview Preparation</h3>
        </div>
        <Button 
          onClick={generateInterviewQuestions} 
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLoading ? "Generating..." : "Generate Questions"}
        </Button>
      </div>
      
      {questions.length === 0 && !isLoading && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Click "Generate Questions" to prepare for your interview with AI-suggested questions based on your CV and the job description.</p>
        </div>
      )}
      
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {questions.length > 0 && (
        <div className="space-y-4">
          {questions.map((question) => (
            <div key={question.id} className="border rounded-lg p-4 bg-card">
              <div className="flex justify-between items-start mb-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(question.difficulty)}`}>
                  {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                </span>
                <div className="flex items-center space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => sendFeedback(question.id, true)}
                    className="h-8 w-8 p-0"
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => sendFeedback(question.id, false)}
                    className="h-8 w-8 p-0"
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => copyToClipboard(question.question)}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-foreground font-medium mb-2">{question.question}</p>
              <p className="text-sm text-muted-foreground">{question.context}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
