
import { useState } from "react";
import { UploadForm } from "./UploadForm";
import { MatchScore } from "./MatchScore";
import { KSAOsAnalysis } from "./KSAOsAnalysis";
import { RecommendationCard } from "./RecommendationCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { analyzeCVWithOpenAI } from "@/lib/openai";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Fallback mock data in case API fails
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

export const CVAnalyzer = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem("openai_api_key") || "");
  
  const handleAnalyze = async (cvText: string, jobDescription: string) => {
    setIsLoading(true);
    
    // Check if API key exists
    if (!apiKey && !process.env.OPENAI_API_KEY) {
      setApiKeyDialogOpen(true);
      setIsLoading(false);
      return;
    }
    
    try {
      // Call OpenAI API
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
      
      // Fallback to mock data
      setAnalysisData(mockAnalysisData);
    } finally {
      setIsLoading(false);
    }
  };
  
  const saveApiKey = () => {
    if (apiKey) {
      localStorage.setItem("openai_api_key", apiKey);
      setApiKeyDialogOpen(false);
      
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved for this session",
      });
    }
  };
  
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
        ) : (
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
                <Button variant="outline" onClick={() => setAnalysisData(null)}>
                  Analyze Another CV
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <KSAOsAnalysis data={analysisData.ksaoData} />
              </div>
              
              <div>
                <Card className="overflow-hidden h-full">
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-6">Keywords Analysis</h3>
                    
                    <Tabs defaultValue="missing">
                      <TabsList className="w-full grid grid-cols-2">
                        <TabsTrigger value="missing" className="text-sm">Missing</TabsTrigger>
                        <TabsTrigger value="present" className="text-sm">Present</TabsTrigger>
                      </TabsList>
                      <div className="mt-6">
                        <TabsContent value="missing" className="mt-0 space-y-2">
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
                        </TabsContent>
                        
                        <TabsContent value="present" className="mt-0 space-y-2">
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
                        </TabsContent>
                      </div>
                    </Tabs>
                  </div>
                </Card>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-2xl font-medium mb-6">Top Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {analysisData.recommendations.map((recommendation: any, index: number) => (
                  <RecommendationCard key={index} recommendation={recommendation} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* API Key Dialog */}
      <Dialog open={apiKeyDialogOpen} onOpenChange={setApiKeyDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>OpenAI API Key Required</DialogTitle>
            <DialogDescription>
              Enter your OpenAI API key to analyze your resume. This will be stored locally in your browser.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApiKeyDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveApiKey}>Save & Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};
