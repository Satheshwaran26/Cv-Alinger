
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

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

  return (
    <Card className="overflow-hidden border-2 border-blue-200 dark:border-blue-900">
      <div className="p-6">
        <h3 className="text-xl font-medium mb-4 flex items-center">
          Add Missing Keywords
          <Badge variant="default" className="ml-2 bg-blue-500">Recommended</Badge>
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select keywords you'd like to add to your CV to improve your match score.
        </p>
        
        <div className="space-y-3">
          {keywords.map((keyword) => (
            <div key={keyword} className="flex items-center space-x-2 p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Checkbox 
                id={`keyword-${keyword}`} 
                checked={selectedKeywords.includes(keyword)}
                onCheckedChange={(checked) => onSelect(keyword, checked === true)}
              />
              <Label 
                htmlFor={`keyword-${keyword}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
              >
                {keyword}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
