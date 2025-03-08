
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { analyzeCVWithOpenAI } from "@/lib/openai";

export const useAnalysis = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [originalCVText, setOriginalCVText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysisError, setAnalysisError] = useState("");

  const handleAnalyze = async (cvText: string, jobDescText: string) => {
    if (cvText.trim() === "" || jobDescText.trim() === "") {
      toast({
        title: "Missing information",
        description: "Please provide both your resume and the job description",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setAnalysisError("");
    
    try {
      // Store the original CV text for later use
      setOriginalCVText(cvText);
      setJobDescription(jobDescText);
      
      // Call OpenAI API to analyze the CV
      const result = await analyzeCVWithOpenAI(cvText, jobDescText);
      
      // Update the analysis data
      setAnalysisData(result);
      
      toast({
        title: "Analysis Complete",
        description: `Your resume scored ${result.overallScore}% match with the job description.`,
      });
      
      // The user will be automatically scrolled to the results due to the useEffect in CVAnalyzer
      
    } catch (error) {
      console.error("CV analysis error:", error);
      setAnalysisError(
        error instanceof Error 
          ? error.message 
          : "An unexpected error occurred during analysis. Please try again."
      );
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetAnalysis = () => {
    setAnalysisData(null);
    setOriginalCVText("");
    setJobDescription("");
    setAnalysisError("");
  };

  return {
    isLoading,
    analysisData,
    originalCVText,
    jobDescription,
    analysisError,
    handleAnalyze,
    resetAnalysis,
  };
};
