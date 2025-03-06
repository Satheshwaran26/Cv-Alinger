
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
    selectedKeywords,
    generatedCV,
    handleRecommendationSelect,
    handleKeywordSelect,
    generateImprovedCV,
    handleBackToAnalysis,
    jobDescription,
    setJobDescription
  } = useCVGeneration(
    originalCVText,
    analysisData?.overallScore || 0,
    analysisData?.keywordsMissing || []
  );
  
  // Track if we should automatically view the CV in browser mode
  const [shouldAutoView, setShouldAutoView] = useState(false);
  
  // Handle CV generation with auto-view option
  const handleGenerateCV = async () => {
    setShouldAutoView(true);
    await generateImprovedCV();
  };
  
  return (
    <section id="tool" className="py-12 md:py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 dark:bg-blue-900 dark:opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 dark:bg-blue-900 dark:opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Analyze Your Resume</h2>
          <p className="text-slate-600 max-w-2xl mx-auto dark:text-slate-400">
            Paste your resume and a job description to get AI-powered personalized recommendations.
          </p>
        </div>
        
        {!analysisData ? (
          <UploadForm onSubmit={handleAnalyze} isLoading={isLoading} />
        ) : generatedCV ? (
          <div className="max-w-5xl mx-auto">
            <GeneratedCV 
              originalScore={analysisData.overallScore}
              newScore={generatedCV.newScore}
              appliedRecommendations={generatedCV.appliedRecommendations}
              cvContent={generatedCV.content}
              jobDescription={jobDescription}
              onBack={handleBackToAnalysis}
              addedKeywords={generatedCV.addedKeywords}
              initialViewInBrowser={shouldAutoView}
            />
          </div>
        ) : (
          <AnalysisResults
            analysisData={analysisData}
            selectedRecommendations={selectedRecommendations}
            selectedKeywords={selectedKeywords}
            isGeneratingCV={isGeneratingCV}
            onRecommendationSelect={handleRecommendationSelect}
            onKeywordSelect={handleKeywordSelect}
            onGenerateCV={handleGenerateCV}
            onResetAnalysis={resetAnalysis}
          />
        )}
      </div>
    </section>
  );
};
