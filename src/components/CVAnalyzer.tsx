
import { useState } from "react";
import { UploadForm } from "./UploadForm";
import { AnalysisResults } from "./AnalysisResults";
import { GeneratedCV } from "./GeneratedCV";
import { useAnalysis } from "@/hooks/useAnalysis";
import { useCVGeneration } from "@/hooks/useCVGeneration";

export const CVAnalyzer = () => {
  const {
    isLoading,
    analysisData,
    originalCVText,
    handleAnalyze,
    resetAnalysis
  } = useAnalysis();
  
  const {
    isGeneratingCV,
    selectedRecommendations,
    generatedCV,
    handleRecommendationSelect,
    generateImprovedCV,
    handleBackToAnalysis
  } = useCVGeneration(
    originalCVText,
    analysisData?.overallScore || 0
  );
  
  return (
    <section id="tool" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 to-transparent dark:from-gray-900/30 dark:to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Analyze Your Resume</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload your resume and a job description to get AI-powered personalized recommendations.
          </p>
        </div>
        
        {!analysisData ? (
          <UploadForm onSubmit={handleAnalyze} isLoading={isLoading} />
        ) : generatedCV ? (
          <GeneratedCV 
            originalScore={analysisData.overallScore}
            newScore={generatedCV.newScore}
            appliedRecommendations={generatedCV.appliedRecommendations}
            cvContent={generatedCV.content}
            onBack={handleBackToAnalysis}
          />
        ) : (
          <AnalysisResults
            analysisData={analysisData}
            selectedRecommendations={selectedRecommendations}
            isGeneratingCV={isGeneratingCV}
            onRecommendationSelect={handleRecommendationSelect}
            onGenerateCV={generateImprovedCV}
            onResetAnalysis={resetAnalysis}
          />
        )}
      </div>
    </section>
  );
};
