
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

// Define types for the KSAO data
interface KSAOItem {
  name: string;
  score: number;
  jobReqScore: number;
  gap: number;
  recommendation?: string;
}

interface KSAOData {
  knowledge: KSAOItem[];
  skills: KSAOItem[];
  abilities: KSAOItem[];
  other: KSAOItem[];
}

interface KSAOsAnalysisProps {
  data?: KSAOData;
}

export const KSAOsAnalysis = ({ data }: KSAOsAnalysisProps) => {
  const [activeTab, setActiveTab] = useState("knowledge");
  
  // Check if data is valid
  if (!data || !data.knowledge || !data.skills || !data.abilities || !data.other) {
    return (
      <Card className="overflow-hidden">
        <div className="p-6">
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Analysis Data Missing</AlertTitle>
            <AlertDescription>
              KSAO framework analysis data is incomplete or missing. Please try analyzing your CV again.
            </AlertDescription>
          </Alert>
          <h3 className="text-xl font-medium">KSAO Framework Analysis</h3>
          <p className="mt-4 text-muted-foreground">
            The KSAO (Knowledge, Skills, Abilities, Other) framework helps identify gaps between your CV and job requirements.
          </p>
        </div>
      </Card>
    );
  }
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  const getGapIndicator = (gap: number) => {
    if (gap <= 0) return "text-green-500";
    if (gap <= 20) return "text-yellow-500";
    return "text-red-500";
  };
  
  const renderItems = (items: KSAOItem[]) => {
    if (!items || items.length === 0) {
      return (
        <div className="p-4 text-center text-muted-foreground">
          No data available for this category.
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="glass rounded-lg p-4 transition-all hover:shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">{item.name}</h4>
              <div className={`text-sm ${getGapIndicator(item.gap)}`}>
                {item.gap > 0 ? `-${item.gap}%` : `+${Math.abs(item.gap)}%`}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="relative pt-1">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">Your CV Level</div>
                  <div className="text-xs font-medium">{item.score}%</div>
                </div>
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700 mt-1">
                  <div
                    className={`${getScoreColor(item.score)} h-full rounded transition-all duration-500 ease-out`}
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="relative pt-1">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">Required Level</div>
                  <div className="text-xs font-medium">100%</div>
                </div>
                <div className="h-2 w-full relative rounded bg-gray-200 dark:bg-gray-700 mt-1">
                  <div className="absolute top-0 bottom-0 left-0 h-full border-r-2 border-primary" 
                       style={{ left: "100%" }}>
                  </div>
                </div>
              </div>
            </div>
            
            {item.recommendation && (
              <div className="mt-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Recommendation:</span> {item.recommendation}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-medium mb-6">KSAO Framework Analysis</h3>
        
        <Tabs defaultValue="knowledge" onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="knowledge" className="text-sm">Knowledge</TabsTrigger>
            <TabsTrigger value="skills" className="text-sm">Skills</TabsTrigger>
            <TabsTrigger value="abilities" className="text-sm">Abilities</TabsTrigger>
            <TabsTrigger value="other" className="text-sm">Other</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="knowledge" className="mt-0">
              {renderItems(data.knowledge)}
            </TabsContent>
            
            <TabsContent value="skills" className="mt-0">
              {renderItems(data.skills)}
            </TabsContent>
            
            <TabsContent value="abilities" className="mt-0">
              {renderItems(data.abilities)}
            </TabsContent>
            
            <TabsContent value="other" className="mt-0">
              {renderItems(data.other)}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Card>
  );
};
