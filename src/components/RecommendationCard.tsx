
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Check, Plus } from "lucide-react";

interface Recommendation {
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  category: string;
  suggestedChange?: string;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
  onSelect: (recommendation: Recommendation, isSelected: boolean) => void;
  isSelected?: boolean;
}

export const RecommendationCard = ({ 
  recommendation, 
  onSelect, 
  isSelected = false 
}: RecommendationCardProps) => {
  const [selected, setSelected] = useState(isSelected);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800";
      case "medium":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
      case "low":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800";
      default:
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800";
    }
  };

  const handleSelect = () => {
    const newSelectedState = !selected;
    setSelected(newSelectedState);
    onSelect(recommendation, newSelectedState);
  };

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md ${selected ? 'ring-2 ring-primary' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-medium">{recommendation.title}</CardTitle>
          <Badge 
            className={`font-normal capitalize ${getImpactColor(recommendation.impact)}`}
            variant="outline"
          >
            {recommendation.impact} impact
          </Badge>
        </div>
        <Badge variant="secondary" className="mt-2">
          {recommendation.category}
        </Badge>
      </CardHeader>
      <CardContent className="pb-2 text-sm text-muted-foreground">
        <p>{recommendation.description}</p>
        
        {recommendation.suggestedChange && (
          <div className="mt-4 p-3 border border-dashed border-primary/20 rounded-md bg-primary/5">
            <div className="text-xs uppercase font-medium text-muted-foreground mb-2">Suggested Change</div>
            <div className="text-sm">{recommendation.suggestedChange}</div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-3">
        <Button 
          variant={selected ? "default" : "secondary"} 
          size="sm" 
          className="w-full"
          onClick={handleSelect}
        >
          {selected ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Selected
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Select
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
