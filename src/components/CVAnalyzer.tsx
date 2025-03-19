import { useState, useEffect, useRef } from "react";
import { UploadForm } from "./UploadForm";
import { AnalysisResults } from "./AnalysisResults";
import { GeneratedCV } from "./GeneratedCV";
import { useAnalysis } from "@/hooks/useAnalysis";
import { useCVGeneration } from "@/hooks/useCVGeneration";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, FileText } from "lucide-react";
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
  
  // Reference to the analysis results section
  const analysisResultsRef = useRef<HTMLDivElement>(null);
  
  // Use useEffect to update job description in CV generation hook when it changes
  useEffect(() => {
    if (jobDescription && setJobDescription) {
      setJobDescription(jobDescription);
    }
  }, [jobDescription, setJobDescription]);
  
  // Scroll to analysis results when data is loaded
  useEffect(() => {
    if (analysisData && analysisResultsRef.current) {
      // Add a small delay to ensure DOM is updated
      setTimeout(() => {
        analysisResultsRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 300);
    }
  }, [analysisData]);
  
  return (
    <section id="tool" className="py-32 relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-fuchsia-100 via-white to-cyan-100 dark:from-gray-900 dark:via-slate-900 dark:to-cyan-950">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-fuchsia-200/40 via-violet-200/40 to-cyan-200/40 rounded-full blur-3xl dark:from-fuchsia-900/20 dark:via-violet-900/20 dark:to-cyan-900/20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-cyan-200/40 via-violet-200/40 to-fuchsia-200/40 rounded-full blur-3xl dark:from-cyan-900/20 dark:via-violet-900/20 dark:to-fuchsia-900/20 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-200/30 via-fuchsia-200/30 to-cyan-200/30 rounded-full blur-3xl dark:from-violet-900/20 dark:via-fuchsia-900/20 dark:to-cyan-900/20 animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block">
            
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 dark:from-fuchsia-400 dark:via-violet-400 dark:to-cyan-400 text-transparent bg-clip-text flex items-center justify-center gap-3">
                Analyze Your Resume <FileText className="h-8 w-8 text-fuchsia-500 dark:text-fuchsia-400 animate-pulse" />
              </h2>
            
          </div>
          <p className="text-slate-700 dark:text-slate-200 text-lg md:text-xl max-w-2xl mx-auto mt-8 bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-md p-8 rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl">
            Paste your resume and a job description to get AI-powered personalized recommendations.
          </p>
        </div>
        
        {analysisError && (
          <Alert variant="destructive" className="mb-8 bg-red-50/90 dark:bg-red-950/90 backdrop-blur-md border-red-200 dark:border-red-800 shadow-lg">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle className="text-lg font-semibold">An error occurred</AlertTitle>
            <AlertDescription className="mt-2">
              {analysisError}
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={resetAnalysis}
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md hover:bg-white/90 dark:hover:bg-gray-900/90 border-red-200 dark:border-red-800"
                >
                  Try Again
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        {!analysisData ? (
          <div className="bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-2xl p-8 md:p-12">
            <UploadForm onSubmit={handleAnalyze} isLoading={isLoading} />
          </div>
        ) : generatedCV ? (
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-2xl p-8 md:p-12">
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
          <div ref={analysisResultsRef} className="bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-2xl p-8 md:p-12">
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
          </div>
        )}
      </div>
    </section>
  );
};
