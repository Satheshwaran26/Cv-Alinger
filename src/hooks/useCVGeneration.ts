
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
      // Calculate a conservative improvement score based on number of recommendations
      const improvementPercentage = Math.min(10, selectedRecommendations.length * 2);
      const scoreImprovement = Math.floor((analysisScore * improvementPercentage) / 100);
      const estimatedNewScore = Math.min(90, analysisScore + scoreImprovement);
      
      const response = await improveCV({
        originalCV: originalCVText,
        recommendations: selectedRecommendations,
        currentScore: analysisScore
      });
      
      if (response.success && response.improved_cv) {
        setGeneratedCV({
          content: response.improved_cv,
          newScore: response.new_score || estimatedNewScore,
          appliedRecommendations: selectedRecommendations.map(rec => rec.title)
        });
        
        toast({
          title: "CV Generated",
          description: "Your improved CV has been generated based on your original content.",
          variant: "default",
        });
      } else {
        console.error("API failed to generate CV, using fallback method");
        
        // Conservative fallback approach that clearly adds recommendations without changing original content
        let improvedCV = originalCVText;
        improvedCV += "\n\n--- RECOMMENDED IMPROVEMENTS ---\n";
        
        selectedRecommendations.forEach(rec => {
          improvedCV += `\n• ${rec.title}: `;
          if (rec.suggestedChange) {
            improvedCV += rec.suggestedChange;
          } else {
            improvedCV += rec.description;
          }
        });
        
        setGeneratedCV({
          content: improvedCV,
          newScore: estimatedNewScore,
          appliedRecommendations: selectedRecommendations.map(rec => rec.title)
        });
        
        toast({
          title: "CV Generated",
          description: "Your improved CV has been generated with the recommendations appended.",
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
