
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { improveCV } from "@/lib/openai";

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
  addedKeywords?: string[];
}

export const useCVGeneration = (
  originalCVText: string,
  originalScore: number,
  missingKeywords: string[] = []
) => {
  const { toast } = useToast();
  const [isGeneratingCV, setIsGeneratingCV] = useState(false);
  const [generatedCV, setGeneratedCV] = useState<GeneratedCVType | null>(null);
  const [selectedRecommendations, setSelectedRecommendations] = useState<RecommendationType[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
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

  const handleKeywordSelect = (keyword: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedKeywords([...selectedKeywords, keyword]);
    } else {
      setSelectedKeywords(
        selectedKeywords.filter((k) => k !== keyword)
      );
    }
  };

  const generateImprovedCV = async () => {
    if (selectedRecommendations.length === 0 && selectedKeywords.length === 0) {
      toast({
        title: "No improvements selected",
        description: "Please select at least one recommendation or keyword to apply to your CV.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGeneratingCV(true);
    
    try {
      // Calculate score improvement based on selected recommendations
      const result = await improveCV({
        originalCV: originalCVText,
        recommendations: selectedRecommendations,
        currentScore: originalScore,
        missingKeywords: selectedKeywords
      });

      if (result.success && result.improved_cv) {
        // Extract recommendation titles for display
        const recommendationTitles = selectedRecommendations.map(rec => rec.title);
        
        setGeneratedCV({
          content: result.improved_cv,
          newScore: result.new_score || Math.min(originalScore + 10, 95), // Fallback calculation if no score returned
          appliedRecommendations: recommendationTitles,
          addedKeywords: result.added_keywords || selectedKeywords
        });
        
        toast({
          title: "CV Generated",
          description: "Your improved CV has been generated successfully!",
        });
      } else {
        throw new Error(result.error || "Failed to generate improved CV");
      }
      
    } catch (error) {
      console.error("Error during CV generation:", error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your CV. Please try again later.",
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
    selectedKeywords,
    generatedCV,
    handleRecommendationSelect,
    handleKeywordSelect,
    generateImprovedCV,
    handleBackToAnalysis,
    jobDescription,
    setJobDescription
  };
};
