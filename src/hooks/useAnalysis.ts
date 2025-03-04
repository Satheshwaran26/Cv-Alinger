
import { useState } from "react";
import { analyzeCVWithOpenAI } from "@/lib/openai";
import { useToast } from "@/components/ui/use-toast";

// Mock data for fallback when API fails
const mockAnalysisData = {
  overallScore: 72,
  ksaoData: {
    knowledge: [
      { name: "Marketing Strategy", score: 85, jobReqScore: 90, gap: 5, recommendation: "Include more specific examples of implementing marketing strategies" },
      { name: "Social Media Platforms", score: 95, jobReqScore: 80, gap: -15 },
      { name: "Content Management", score: 65, jobReqScore: 85, gap: 20, recommendation: "Highlight experience with modern CMS platforms like WordPress or Contentful" },
    ],
    skills: [
      { name: "Data Analysis", score: 60, jobReqScore: 90, gap: 30, recommendation: "Mention specific data analysis tools you've used such as Google Analytics or Tableau" },
      { name: "Copywriting", score: 80, jobReqScore: 75, gap: -5 },
      { name: "Project Management", score: 70, jobReqScore: 80, gap: 10, recommendation: "Add measurable outcomes from projects you've managed" },
    ],
    abilities: [
      { name: "Team Collaboration", score: 85, jobReqScore: 85, gap: 0 },
      { name: "Problem Solving", score: 75, jobReqScore: 90, gap: 15, recommendation: "Include specific examples of complex problems you've solved" },
      { name: "Adaptability", score: 60, jobReqScore: 80, gap: 20, recommendation: "Demonstrate examples of adapting to changing priorities or situations" },
    ],
    other: [
      { name: "Industry Certifications", score: 50, jobReqScore: 70, gap: 20, recommendation: "Consider obtaining relevant industry certifications" },
      { name: "Leadership Experience", score: 65, jobReqScore: 75, gap: 10, recommendation: "Highlight leadership roles or initiatives you've led" },
      { name: "Remote Work Experience", score: 90, jobReqScore: 80, gap: -10 },
    ],
  },
  recommendations: [
    {
      title: "Add quantifiable achievements",
      description: "Your CV would benefit from including more measurable results",
      impact: "high",
      category: "Content",
      suggestedChange: "Change 'managed social media campaigns' to 'increased engagement by 45% through strategic social media campaigns'"
    },
    {
      title: "Add missing technical skills",
      description: "The job requires proficiency in data analysis tools that are not mentioned in your CV",
      impact: "high",
      category: "Skills Gap",
      suggestedChange: "Add a 'Technical Skills' section highlighting experience with Google Analytics, Tableau, and Excel"
    },
    {
      title: "Restructure experience section",
      description: "Your most relevant experience should be emphasized more prominently",
      impact: "medium",
      category: "Structure",
      suggestedChange: "Move your marketing coordinator role to the top of your experience section"
    },
    {
      title: "Improve keywords matching",
      description: "Several key terms from the job description are missing from your CV",
      impact: "medium",
      category: "Keywords",
      suggestedChange: "Include terms like 'campaign optimization', 'conversion rate' and 'A/B testing'"
    },
    {
      title: "Update skills formatting",
      description: "Your skills section could be better organized for readability",
      impact: "low",
      category: "Formatting",
      suggestedChange: "Group skills into categories like 'Technical', 'Creative' and 'Management'"
    },
  ],
  keywordsMissing: ["data-driven marketing", "performance analytics", "conversion optimization", "A/B testing", "SEO fundamentals"],
  keywordsPresent: ["social media management", "content creation", "brand awareness", "customer engagement", "marketing campaigns"]
};

export const useAnalysis = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [originalCVText, setOriginalCVText] = useState("");
  
  const handleAnalyze = async (cvText: string, jobDescription: string) => {
    setIsLoading(true);
    setOriginalCVText(cvText);
    
    try {
      const results = await analyzeCVWithOpenAI(cvText, jobDescription);
      setAnalysisData(results);
      
      toast({
        title: "Analysis Complete",
        description: "Your CV has been analyzed successfully!",
      });
    } catch (error) {
      console.error("Error during analysis:", error);
      
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your CV. Using mock data for demonstration.",
        variant: "destructive",
      });
      
      setAnalysisData(mockAnalysisData);
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetAnalysis = () => {
    setAnalysisData(null);
  };
  
  return {
    isLoading,
    analysisData,
    originalCVText,
    handleAnalyze,
    resetAnalysis
  };
};
