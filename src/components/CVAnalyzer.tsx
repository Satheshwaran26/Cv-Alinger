
import { useState } from "react";
import { UploadForm } from "./UploadForm";
import { MatchScore } from "./MatchScore";
import { KSAOsAnalysis } from "./KSAOsAnalysis";
import { RecommendationCard } from "./RecommendationCard";
import { GeneratedCV } from "./GeneratedCV";
import { PricingPlan } from "./PricingPlan";
import { PaymentForm } from "./PaymentForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { analyzeCVWithOpenAI } from "@/lib/openai";
import { useToast } from "@/hooks/use-toast";
import { FileText } from "lucide-react";

// When using this mock data in the future, you might want to adjust the recommendations
// based on your monetization strategy and add new fields if needed
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
  const [selectedRecommendations, setSelectedRecommendations] = useState<any[]>([]);
  const [generatedCV, setGeneratedCV] = useState<{
    content: string;
    newScore: number;
    appliedRecommendations: string[];
  } | null>(null);
  const [originalCVText, setOriginalCVText] = useState("");
  
  // Add new state for payment flow
  const [showPaymentFlow, setShowPaymentFlow] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<{ id: string; price: number } | null>(null);
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  const handleAnalyze = async (cvText: string, jobDescription: string) => {
    setIsLoading(true);
    setOriginalCVText(cvText);
    
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

  const handleRecommendationSelect = (recommendation: any, isSelected: boolean) => {
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
  
  const generateImprovedCV = () => {
    if (selectedRecommendations.length === 0) {
      toast({
        title: "No recommendations selected",
        description: "Please select at least one recommendation to improve your CV.",
        variant: "destructive",
      });
      return;
    }
    
    // Calculate new score (between 5-15% improvement based on selections)
    const improvementPercentage = Math.min(15, selectedRecommendations.length * 3);
    const scoreImprovement = Math.floor((analysisData.overallScore * improvementPercentage) / 100);
    const newScore = Math.min(100, analysisData.overallScore + scoreImprovement);
    
    // Apply recommendations to generate improved CV content
    let improvedCV = originalCVText;
    
    // Apply each recommendation (this is simplified for demonstration)
    // A real implementation would use more sophisticated text processing
    selectedRecommendations.forEach(rec => {
      if (rec.suggestedChange) {
        // Here you would implement more sophisticated CV modifications
        // This is just a simple example
        improvedCV += `\n\n[Applied improvement based on: ${rec.title}]\n${rec.suggestedChange}`;
      }
    });
    
    // Set the generated CV data
    setGeneratedCV({
      content: improvedCV,
      newScore,
      appliedRecommendations: selectedRecommendations.map(rec => rec.title)
    });
    
    toast({
      title: "CV Generated",
      description: "Your improved CV has been generated successfully!",
      variant: "default",
    });
  };
  
  const handleBackToAnalysis = () => {
    setGeneratedCV(null);
  };
  
  // Add new handlers for payment flow
  const handleSelectPlan = (planId: string, price: number) => {
    setSelectedPlan({ id: planId, price });
  };
  
  const handlePaymentSuccess = () => {
    setPaymentComplete(true);
    setShowPaymentFlow(false);
  };
  
  const handleCancelPayment = () => {
    setSelectedPlan(null);
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
        
        {showPaymentFlow && !paymentComplete ? (
          selectedPlan ? (
            <PaymentForm 
              planId={selectedPlan.id}
              price={selectedPlan.price}
              onPaymentSuccess={handlePaymentSuccess}
              onCancel={handleCancelPayment}
            />
          ) : (
            <PricingPlan onSelectPlan={handleSelectPlan} />
          )
        ) : !analysisData ? (
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
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h3 className="text-2xl font-medium">Top Recommendations</h3>
                <div className="mt-2 md:mt-0">
                  <Button 
                    onClick={generateImprovedCV}
                    disabled={selectedRecommendations.length === 0}
                    className="gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Generate Improved CV
                    {selectedRecommendations.length > 0 && (
                      <span className="ml-1 bg-primary-foreground text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs">
                        {selectedRecommendations.length}
                      </span>
                    )}
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {analysisData.recommendations.map((recommendation: any, index: number) => (
                  <RecommendationCard 
                    key={index} 
                    recommendation={recommendation} 
                    onSelect={handleRecommendationSelect}
                    isSelected={selectedRecommendations.some(
                      (rec) => rec.title === recommendation.title
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
