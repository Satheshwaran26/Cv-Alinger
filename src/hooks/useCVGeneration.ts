
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

// Define RecommendationType interface that components are expecting
export interface RecommendationType {
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  category: string;
  suggestedChange?: string;
}

// Define GeneratedCVType for consistent typing
export interface GeneratedCVType {
  content: string;
  newScore: number;
  appliedRecommendations: string[];
}

export const useCVGeneration = (
  originalCVText: string,
  originalScore: number
) => {
  const { toast } = useToast();
  const [isGeneratingCV, setIsGeneratingCV] = useState(false);
  const [generatedCV, setGeneratedCV] = useState<GeneratedCVType | null>(null);
  const [selectedRecommendations, setSelectedRecommendations] = useState<RecommendationType[]>([]);
  const [jobDescription, setJobDescription] = useState<string>("");

  const handleRecommendationSelect = (recommendation: RecommendationType, isSelected: boolean) => {
    if (isSelected) {
      setSelectedRecommendations([...selectedRecommendations, recommendation]);
    } else {
      setSelectedRecommendations(
        selectedRecommendations.filter((rec) => rec.title !== recommendation.title)
      );
    }
  };

  const generateImprovedCV = async () => {
    if (selectedRecommendations.length === 0) {
      toast({
        title: "No recommendations selected",
        description: "Please select at least one recommendation to apply to your CV.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGeneratingCV(true);
    
    try {
      // Extract recommendation titles for display
      const recommendationTitles = selectedRecommendations.map(rec => rec.title);
      
      // Mock improved CV generation (replace with actual API call when available)
      // This is temporary until the openai.ts functions are properly implemented
      setTimeout(() => {
        const improvedContent = `This is an improved version of your CV with the following recommendations applied:\n\n${selectedRecommendations.map(r => 
          `- ${r.title}: ${r.description}`).join('\n\n')}\n\nOriginal CV content:\n${originalCVText}`;
        
        const newScore = Math.min(originalScore + 10, 95);
        
        setGeneratedCV({
          content: improvedContent,
          newScore: newScore,
          appliedRecommendations: recommendationTitles
        });
        
        toast({
          title: "CV Generated",
          description: "Your improved CV has been generated successfully!",
        });
        
        setIsGeneratingCV(false);
      }, 2000);
      
    } catch (error) {
      console.error("Error during CV generation:", error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your CV. Please try again later.",
        variant: "destructive",
      });
      setIsGeneratingCV(false);
    }
  };
  
  const handleBackToAnalysis = () => {
    setGeneratedCV(null);
  };
  
  return {
    isGeneratingCV,
    selectedRecommendations,
    generatedCV,
    handleRecommendationSelect,
    generateImprovedCV,
    handleBackToAnalysis,
    jobDescription
  };
};
