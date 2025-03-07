
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, Plus } from "lucide-react";

interface KeywordSelectorProps {
  keywords: string[];
  selectedKeywords: string[];
  onSelect: (keyword: string, isSelected: boolean) => void;
}

export const KeywordSelector = ({
  keywords,
  selectedKeywords,
  onSelect
}: KeywordSelectorProps) => {
  if (keywords.length === 0) {
    return null;
  }

  // Check if all keywords are selected
  const allSelected = keywords.every(keyword => selectedKeywords.includes(keyword));

  const handleSelectAll = () => {
    // Add all keywords that aren't already selected
    keywords.forEach((keyword) => {
      if (!selectedKeywords.includes(keyword)) {
        onSelect(keyword, true);
      }
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-medium">Add Missing Keywords</CardTitle>
          <Badge 
            className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800"
            variant="outline"
          >
            high impact
          </Badge>
        </div>
        <Badge variant="secondary" className="mt-2">
          Keywords
        </Badge>
      </CardHeader>
      <CardContent className="pb-2 text-sm text-muted-foreground">
        <p>Adding these missing keywords to your CV can significantly improve your match score and visibility to ATS systems.</p>
        
        <div className="mt-4 flex flex-wrap gap-3">
          {keywords.slice(0, 4).map((keyword) => (
            <div key={keyword} className="flex items-center space-x-2">
              <Checkbox 
                id={`keyword-${keyword}`} 
                checked={selectedKeywords.includes(keyword)}
                onCheckedChange={(checked) => onSelect(keyword, checked === true)}
              />
              <Label 
                htmlFor={`keyword-${keyword}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer truncate"
              >
                {keyword}
              </Label>
            </div>
          ))}
        </div>
        
        {keywords.length > 4 && (
          <div className="mt-3">
            <Badge variant="outline" className="text-xs">
              +{keywords.length - 4} more keywords
            </Badge>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-3 flex justify-center">
        <Button 
          variant={allSelected ? "default" : "secondary"} 
          size="sm" 
          className="w-full"
          onClick={handleSelectAll}
        >
          {allSelected ? (
            <>
              <Check className="h-4 w-4" />
              All Keywords Selected
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Select All Keywords
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
