
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
          // Ensure we have the full CV content
          const fullImprovedContent = response.improved_cv;
          
          setGeneratedCV({
            content: fullImprovedContent,
            newScore: response.new_score || estimatedNewScore,
            appliedRecommendations: selectedRecommendations.map(rec => rec.title)
          });
          
          toast({
            title: "CV Generated",
            description: "Your improved CV has been generated with natural integration of recommendations.",
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
    // IMPORTANT: Begin with the complete original CV text
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
      if (!rec.suggestedChange) continue;
      
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
      
      if (targetSection) {
        // Get the section content
        const sectionContent = original.substring(targetSection.start, targetSection.end);
        
        // Create an improved version of the section with the recommendation
        const improvedSection = integrateRecommendation(sectionContent, rec);
        
        // Replace the section in the CV
        improvedCV = improvedCV.substring(0, targetSection.start) + 
                     improvedSection + 
                     improvedCV.substring(targetSection.end);
      } else {
        // For recommendations that don't match a specific section,
        // either find a relevant part of the CV or add at the end
        const relevantSectionMatch = findRelevantSection(original, rec.suggestedChange);
        
        if (relevantSectionMatch.found) {
          // Insert at the relevant position
          const insertPosition = relevantSectionMatch.position;
          improvedCV = improvedCV.substring(0, insertPosition) +
                       `\n[Improved based on recommendation]: ${rec.suggestedChange}\n` +
                       improvedCV.substring(insertPosition);
        } else {
          // Add to the end with clear indicator if no section is found
          improvedCV += `\n\n[Consider adding based on recommendation: ${rec.title}]\n${rec.suggestedChange}\n`;
        }
      }
    }
    
    return improvedCV;
  };
  
  // Find a relevant position in the CV to insert a recommendation
  const findRelevantSection = (cvText: string, recommendation: string) => {
    // Extract key terms from the recommendation
    const keyTerms = recommendation
      .toLowerCase()
      .split(' ')
      .filter(word => word.length > 5) // Only consider longer, more meaningful words
      .slice(0, 5);     // Limit to first few terms to avoid noise
    
    // Try to find a position where the recommendation would fit naturally
    for (const term of keyTerms) {
      const termIndex = cvText.toLowerCase().indexOf(term);
      if (termIndex > 0) {
        // Find the beginning of the paragraph/section
        const precedingNewline = cvText.lastIndexOf('\n', termIndex);
        return { found: true, position: precedingNewline > 0 ? precedingNewline : termIndex };
      }
    }
    
    return { found: false, position: -1 };
  };
  
  // Helper to integrate a recommendation into a section
  const integrateRecommendation = (sectionContent: string, recommendation: RecommendationType) => {
    // This identifies distinct parts like bullet points or paragraphs
    const contentParts = sectionContent.split('\n').filter(line => line.trim().length > 0);
    
    // If the recommendation is about enhancing existing content
    const enhancementKeywords = ['enhance', 'improve', 'revise', 'rewrite', 'strengthen', 'clarify'];
    const isEnhancement = enhancementKeywords.some(keyword => 
      recommendation.description.toLowerCase().includes(keyword) || 
      (recommendation.suggestedChange && recommendation.suggestedChange.toLowerCase().includes(keyword))
    );
    
    if (isEnhancement && contentParts.length > 0) {
      // Find the most relevant part to enhance using keyword matching
      let bestMatchIndex = 0;
      let bestMatchScore = 0;
      
      const recKeywords = recommendation.suggestedChange?.toLowerCase().split(' ') || [];
      
      contentParts.forEach((part, index) => {
        const partKeywords = part.toLowerCase().split(' ');
        let matchScore = 0;
        
        // Count keywords in common
        recKeywords.forEach(keyword => {
          if (partKeywords.includes(keyword)) matchScore++;
        });
        
        if (matchScore > bestMatchScore) {
          bestMatchScore = matchScore;
          bestMatchIndex = index;
        }
      });
      
      // Update the best matching part with the improvement
      contentParts[bestMatchIndex] = `${contentParts[bestMatchIndex]}\n[Improved based on recommendation]: ${recommendation.suggestedChange}`;
    } else {
      // For additions, simply append to the section with appropriate formatting
      contentParts.push(`[Improved based on recommendation]: ${recommendation.suggestedChange}`);
    }
    
    // Reconstruct the section content
    return contentParts.join('\n\n');
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
