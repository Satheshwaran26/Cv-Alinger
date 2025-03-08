
import { useState, useEffect } from "react";
import { UploadForm } from "./UploadForm";
import { AnalysisResults } from "./AnalysisResults";
import { GeneratedCV } from "./GeneratedCV";
import { useAnalysis } from "@/hooks/useAnalysis";
import { useCVGeneration } from "@/hooks/useCVGeneration";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

export const CVAnalyzer = () => {
  const {
    isLoading,
    analysisData,
    originalCVText,
    jobDescription,
    analysisError,
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
    setJobDescription
  } = useCVGeneration(
    originalCVText,
    analysisData?.overallScore || 0,
    analysisData?.keywordsMissing || []
  );
  
  // Use useEffect to update job description in CV generation hook when it changes
  useEffect(() => {
    if (jobDescription && setJobDescription) {
      setJobDescription(jobDescription);
    }
  }, [jobDescription, setJobDescription]);
  
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
        
        {analysisError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>An error occurred</AlertTitle>
            <AlertDescription>
              {analysisError}
              <div className="mt-2">
                <Button variant="outline" size="sm" onClick={resetAnalysis}>
                  Try Again
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
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
            onGenerateCV={generateImprovedCV}
            onResetAnalysis={resetAnalysis}
          />
        )}
      </div>
    </section>
  );
};
