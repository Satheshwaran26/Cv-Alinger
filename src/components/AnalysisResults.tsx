
import { Button } from "@/components/ui/button";
import { MatchScore } from "./MatchScore";
import { KSAOsAnalysis } from "./KSAOsAnalysis";
import { RecommendationsList } from "./RecommendationsList";
import { KeywordSelector } from "./KeywordSelector";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react";
import { RecommendationType } from "@/hooks/useCVGeneration";

interface AnalysisResultsProps {
  analysisData: any;
  selectedRecommendations: RecommendationType[];
  selectedKeywords: string[];
  isGeneratingCV: boolean;
  onRecommendationSelect: (recommendation: RecommendationType, isSelected: boolean) => void;
  onKeywordSelect: (keyword: string, isSelected: boolean) => void;
  onGenerateCV: () => void;
  onResetAnalysis: () => void;
}

export const AnalysisResults = ({
  analysisData,
  selectedRecommendations,
  selectedKeywords,
  isGeneratingCV,
  onRecommendationSelect,
  onKeywordSelect,
  onGenerateCV,
  onResetAnalysis
}: AnalysisResultsProps) => {
  return (
    <div className="animate-scale-in">
      <div className="glass rounded-xl p-8 mb-10 text-center">
        <h3 className="text-2xl font-medium mb-6">CV Analysis Results</h3>
        <div className="mb-6">
          <MatchScore score={analysisData.overallScore} />
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your CV matches {analysisData.overallScore}% of the job requirements. See detailed analysis below.
        </p>
        <div className="mt-6">
          <Button variant="outline" onClick={onResetAnalysis}>
            Analyze Another CV
          </Button>
        </div>
      </div>
      
      <div className="space-y-8">
        <div>
          <KSAOsAnalysis data={analysisData.ksaoData} />
        </div>
        
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-medium mb-6">Keywords Analysis</h3>
              
              <Tabs defaultValue="missing">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="missing" className="text-sm">Missing</TabsTrigger>
                  <TabsTrigger value="present" className="text-sm">Present</TabsTrigger>
                </TabsList>
                <div className="mt-6">
                  <TabsContent value="missing" className="mt-0">
                    <div className="flex flex-wrap gap-2">
                      {analysisData.keywordsMissing.map((keyword: string, index: number) => (
                        <div 
                          key={index} 
                          className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 px-3 py-2 rounded-md text-sm flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C16.418 20 20 16.418 20 12C20 7.582 16.418 4 12 4C7.582 4 4 7.582 4 12C4 16.418 7.582 20 12 20ZM13 12V7H11V12H13ZM13 16V14H11V16H13Z" fill="currentColor" />
                          </svg>
                          {keyword}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="present" className="mt-0">
                    <div className="flex flex-wrap gap-2">
                      {analysisData.keywordsPresent.map((keyword: string, index: number) => (
                        <div 
                          key={index} 
                          className="bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 px-3 py-2 rounded-md text-sm flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C16.418 20 20 16.418 20 12C20 7.582 16.418 4 12 4C7.582 4 4 7.582 4 12C4 16.418 7.582 20 12 20ZM16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z" fill="currentColor" />
                          </svg>
                          {keyword}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="mt-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h3 className="text-2xl font-medium">Top Recommendations</h3>
          <div className="mt-2 md:mt-0">
            <Button 
              onClick={onGenerateCV}
              disabled={(selectedRecommendations.length === 0 && selectedKeywords.length === 0) || isGeneratingCV}
              className="gap-2"
            >
              {isGeneratingCV ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" />
                  Generate Improved CV
                </>
              )}
              {(selectedRecommendations.length > 0 || selectedKeywords.length > 0) && !isGeneratingCV && (
                <span className="ml-1 bg-primary-foreground text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {selectedRecommendations.length + selectedKeywords.length}
                </span>
              )}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add the KeywordSelector as a card in the recommendations grid */}
          {analysisData.keywordsMissing.length > 0 && (
            <KeywordSelector 
              keywords={analysisData.keywordsMissing}
              selectedKeywords={selectedKeywords}
              onSelect={onKeywordSelect}
            />
          )}
          
          {/* Display regular recommendations */}
          <RecommendationsList 
            recommendations={analysisData.recommendations}
            selectedRecommendations={selectedRecommendations}
            onSelect={onRecommendationSelect}
          />
        </div>
      </div>
    </div>
  );
};
