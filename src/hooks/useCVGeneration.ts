import { useState } from "react";
import { generateImprovedCVWithOpenAI } from "@/lib/openai";
import { useToast } from "@/components/ui/use-toast";

export const useCVGeneration = (
  analysisData: any,
  originalCVText: string
) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCV, setGeneratedCV] = useState<string | null>(null);
  const [selectedRecommendations, setSelectedRecommendations] = useState<string[]>([]);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [newScore, setNewScore] = useState(0);

  const handleSelectRecommendation = (recommendation: string) => {
    setSelectedRecommendations([...selectedRecommendations, recommendation]);
  };

  const handleUnselectRecommendation = (recommendation: string) => {
    setSelectedRecommendations(
      selectedRecommendations.filter((rec) => rec !== recommendation)
    );
  };

  const generateCV = async () => {
    if (selectedRecommendations.length === 0) {
      toast({
        title: "No recommendations selected",
        description: "Please select at least one recommendation to apply to your CV.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const prompt = `
        Original CV Text:
        ${originalCVText}
        
        Job Description:
        ${analysisData.jobDescription}
        
        Apply the following recommendations:
        ${selectedRecommendations.join("\n")}
        
        Rewrite the CV with the above improvements.
      `;
      
      // Save job description for interview preparation
      if (analysisData.jobDescription) {
        setJobDescription(analysisData.jobDescription);
      }

      const response = await generateImprovedCVWithOpenAI(prompt);
      
      if (response) {
        setGeneratedCV(response.improvedCV);
        setNewScore(response.newScore);
        
        toast({
          title: "CV Generated",
          description: "Your improved CV has been generated successfully!",
        });
      } else {
        toast({
          title: "Generation Failed",
          description: "Failed to generate CV. Please try again.",
          variant: "destructive",
        });
      }
      
    } catch (error) {
      console.error("Error during CV generation:", error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your CV. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetGeneration = () => {
    setGeneratedCV(null);
    setSelectedRecommendations([]);
  };
  
  return {
    isLoading,
    generatedCV,
    jobDescription,
    selectedRecommendations,
    newScore,
    handleSelectRecommendation,
    handleUnselectRecommendation,
    generateCV,
    resetGeneration
  };
};
