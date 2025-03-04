
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
      
      // Always use the API for CV improvements
      const response = await improveCV({
        originalCV: originalCVText,
        recommendations: selectedRecommendations,
        currentScore: analysisScore
      });
      
      if (response.success && response.improved_cv) {
        // Verify that the improved CV content is not significantly different from the original
        const similarityCheck = validateContentSimilarity(originalCVText, response.improved_cv);
        
        if (similarityCheck.valid) {
          setGeneratedCV({
            content: response.improved_cv,
            newScore: response.new_score || estimatedNewScore,
            appliedRecommendations: selectedRecommendations.map(rec => rec.title)
          });
          
          toast({
            title: "CV Generated",
            description: "Your improved CV has been generated with natural integration of recommendations.",
            variant: "default",
          });
        } else {
          console.warn("Generated CV failed similarity check, using conservative approach");
          // Use a more conservative approach that preserves the original structure
          const conservativeCV = generateConservativeImprovement(originalCVText, selectedRecommendations);
          
          setGeneratedCV({
            content: conservativeCV,
            newScore: estimatedNewScore,
            appliedRecommendations: selectedRecommendations.map(rec => rec.title)
          });
          
          toast({
            title: "CV Generated",
            description: "Your improved CV has been generated with careful preservation of your original content.",
            variant: "default",
          });
        }
      } else {
        console.error("API failed to generate CV, using structured improvement method");
        
        // Use a structured improvement method that respects the original content
        const conservativeCV = generateConservativeImprovement(originalCVText, selectedRecommendations);
        
        setGeneratedCV({
          content: conservativeCV,
          newScore: estimatedNewScore,
          appliedRecommendations: selectedRecommendations.map(rec => rec.title)
        });
        
        toast({
          title: "CV Generated",
          description: "Your improved CV has been generated with careful preservation of your original content.",
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
  
  // Helper function to validate that the improved CV hasn't deviated too much from original
  const validateContentSimilarity = (original: string, improved: string) => {
    // Basic length check to catch major deviations
    const originalLength = original.length;
    const improvedLength = improved.length;
    const lengthDifference = Math.abs(originalLength - improvedLength) / originalLength;
    
    if (lengthDifference > 0.25) {
      console.warn(`CV length changed by ${(lengthDifference * 100).toFixed(1)}%, which is too much`);
      return { valid: false, reason: "length_deviation" };
    }
    
    // Check for preservation of key information
    // Extract potential names, emails, phone numbers, education, companies from original
    const nameMatch = original.match(/^([A-Za-z\s]{2,30})$/m);
    const emailMatch = original.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
    const phoneMatch = original.match(/(\+?[0-9\s-]{10,15})/);
    
    // Check if key personal info is preserved
    if (emailMatch && !improved.includes(emailMatch[0])) {
      console.warn("Email not preserved in improved CV");
      return { valid: false, reason: "email_missing" };
    }
    
    if (phoneMatch && !improved.includes(phoneMatch[0])) {
      console.warn("Phone number not preserved in improved CV");
      return { valid: false, reason: "phone_missing" };
    }
    
    // Quick check if core sections appear to be preserved
    const sectionHeaders = [
      "EDUCATION", "Education", 
      "EXPERIENCE", "Experience", "Work Experience",
      "SKILLS", "Skills", "Technical Skills"
    ];
    
    const originalSectionsFound = sectionHeaders.filter(header => 
      original.includes(header)
    );
    
    const improvedSectionsFound = originalSectionsFound.filter(header => 
      improved.includes(header)
    );
    
    if (originalSectionsFound.length > 0 && 
        improvedSectionsFound.length < originalSectionsFound.length * 0.7) {
      console.warn("Important CV sections missing in improved version");
      return { valid: false, reason: "sections_missing" };
    }
    
    return { valid: true };
  };
  
  // Generate an improved CV by carefully applying recommendations to the original structure
  const generateConservativeImprovement = (original: string, recommendations: RecommendationType[]) => {
    let improvedCV = original;
    
    // Identify sections in the CV
    const sectionRegex = /\n\s*([A-Z][A-Z\s]+)(?:\:|\n)/g;
    const sections: {title: string, start: number, end?: number}[] = [];
    let match;
    
    while ((match = sectionRegex.exec(original)) !== null) {
      sections.push({
        title: match[1].trim(),
        start: match.index
      });
    }
    
    // Set end positions for each section
    for (let i = 0; i < sections.length; i++) {
      if (i < sections.length - 1) {
        sections[i].end = sections[i + 1].start;
      } else {
        sections[i].end = original.length;
      }
    }
    
    // Apply recommendations by category to appropriate sections
    for (const rec of recommendations) {
      let targetSection = null;
      
      // Map recommendation category to CV section
      if (rec.category.toLowerCase().includes('skill')) {
        targetSection = sections.find(s => 
          s.title.toLowerCase().includes('skill') || 
          s.title.toLowerCase().includes('competenc') ||
          s.title.toLowerCase().includes('technical')
        );
      } else if (rec.category.toLowerCase().includes('experience')) {
        targetSection = sections.find(s => 
          s.title.toLowerCase().includes('experience') || 
          s.title.toLowerCase().includes('employment') ||
          s.title.toLowerCase().includes('work')
        );
      } else if (rec.category.toLowerCase().includes('education')) {
        targetSection = sections.find(s => 
          s.title.toLowerCase().includes('education') || 
          s.title.toLowerCase().includes('academic')
        );
      } else if (rec.category.toLowerCase().includes('summary') || rec.category.toLowerCase().includes('profile')) {
        targetSection = sections.find(s => 
          s.title.toLowerCase().includes('summary') || 
          s.title.toLowerCase().includes('profile') ||
          s.title.toLowerCase().includes('objective') ||
          s.title.toLowerCase().includes('about')
        );
      }
      
      if (targetSection && rec.suggestedChange) {
        // Get the section content
        const sectionContent = original.substring(targetSection.start, targetSection.end);
        
        // Create an improved version of the section with the recommendation
        // Use the suggested change, but preserve the original structure
        const improvedSection = integrateRecommendation(sectionContent, rec);
        
        // Replace the section in the CV
        improvedCV = improvedCV.substring(0, targetSection.start) + 
                     improvedSection + 
                     improvedCV.substring(targetSection.end);
      } else if (rec.suggestedChange) {
        // For recommendations that don't match a specific section,
        // add them in a clearly marked section at the end
        if (!improvedCV.includes("IMPROVEMENT SUGGESTIONS")) {
          improvedCV += "\n\nIMPROVEMENT SUGGESTIONS:\n";
        }
        
        improvedCV += `\n• ${rec.title}: ${rec.suggestedChange}\n`;
      }
    }
    
    return improvedCV;
  };
  
  // Helper to integrate a recommendation into a section
  const integrateRecommendation = (sectionContent: string, recommendation: RecommendationType) => {
    // This is a simplified implementation - a more sophisticated version would
    // parse the section structure more carefully and make targeted edits
    
    // Add a comment to indicate the change being made
    const recommendationNote = `[Improvement based on: ${recommendation.title}]`;
    
    // For now, we'll append the suggestion to the end of the section in a way
    // that clearly indicates it's an improvement suggestion
    return `${sectionContent}\n${recommendationNote}\n${recommendation.suggestedChange}\n`;
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
