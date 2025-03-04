
import { useState } from "react";
import { improveCV } from "@/lib/openai";
import { useToast } from "@/components/ui/use-toast";

export interface RecommendationType {
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  category: string;
  suggestedChange?: string;
}

export interface GeneratedCVType {
  content: string;
  newScore: number;
  appliedRecommendations: string[];
}

export const useCVGeneration = (originalCVText: string, analysisScore: number) => {
  const { toast } = useToast();
  const [isGeneratingCV, setIsGeneratingCV] = useState(false);
  const [selectedRecommendations, setSelectedRecommendations] = useState<RecommendationType[]>([]);
  const [generatedCV, setGeneratedCV] = useState<GeneratedCVType | null>(null);
  
  const handleRecommendationSelect = (recommendation: RecommendationType, isSelected: boolean) => {
    if (isSelected) {
      setSelectedRecommendations([...selectedRecommendations, recommendation]);
    } else {
      setSelectedRecommendations(
        selectedRecommendations.filter(
          (rec) => rec.title !== recommendation.title
        )
      );
    }
  };
  
  const generateImprovedCV = async () => {
    if (selectedRecommendations.length === 0) {
      toast({
        title: "No recommendations selected",
        description: "Please select at least one recommendation to improve your CV.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGeneratingCV(true);
    
    try {
      const improvementPercentage = Math.min(15, selectedRecommendations.length * 3);
      const scoreImprovement = Math.floor((analysisScore * improvementPercentage) / 100);
      const estimatedNewScore = Math.min(100, analysisScore + scoreImprovement);
      
      const response = await improveCV({
        originalCV: originalCVText,
        recommendations: selectedRecommendations,
        currentScore: analysisScore
      });
      
      if (response.success) {
        setGeneratedCV({
          content: response.improved_cv,
          newScore: response.new_score || estimatedNewScore,
          appliedRecommendations: selectedRecommendations.map(rec => rec.title)
        });
        
        toast({
          title: "CV Generated",
          description: "Your improved CV has been generated successfully!",
          variant: "default",
        });
      } else {
        console.error("API failed to generate CV, using fallback method");
        
        let improvedCV = originalCVText;
        selectedRecommendations.forEach(rec => {
          if (rec.suggestedChange) {
            improvedCV += `\n\n[Applied improvement based on: ${rec.title}]\n${rec.suggestedChange}`;
          }
        });
        
        setGeneratedCV({
          content: improvedCV,
          newScore: estimatedNewScore,
          appliedRecommendations: selectedRecommendations.map(rec => rec.title)
        });
        
        toast({
          title: "CV Generated",
          description: "Your improved CV has been generated using the fallback method.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error generating improved CV:", error);
      
      toast({
        title: "Generation Failed",
        description: "There was an error generating your improved CV. Please try again.",
        variant: "destructive",
      });
    } finally {
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
    handleBackToAnalysis
  };
};
