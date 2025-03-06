
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
    handleBackToAnalysis,
    jobDescription
  } = useCVGeneration(
    originalCVText,
    analysisData?.overallScore || 0
  );
  
  return (
    <section id="tool" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 dark:bg-blue-900 dark:opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 dark:bg-blue-900 dark:opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Analyze Your Resume</h2>
          <p className="text-slate-600 max-w-2xl mx-auto dark:text-slate-400">
            Paste your resume and a job description to get AI-powered personalized recommendations.
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
            jobDescription={jobDescription}
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
