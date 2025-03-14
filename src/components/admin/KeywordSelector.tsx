
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface KeywordSelectorProps {
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
}

export const KeywordSelector = ({
  keywords,
  setKeywords,
}: KeywordSelectorProps) => {
  const [newKeyword, setNewKeyword] = useState('');

  const handleAddKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      const updatedKeywords = [...keywords, newKeyword];
      setKeywords(updatedKeywords);
      setNewKeyword('');
      console.log("Added keyword:", newKeyword, "Updated keywords:", updatedKeywords);
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    const updatedKeywords = keywords.filter(k => k !== keyword);
    setKeywords(updatedKeywords);
    console.log("Removed keyword:", keyword, "Updated keywords:", updatedKeywords);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="keywords">Keywords (SEO)</Label>
      <div className="flex gap-2">
        <Input
          id="keywords"
          placeholder="Enter a keyword and press Add"
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && newKeyword) {
              e.preventDefault();
              handleAddKeyword();
            }
          }}
        />
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleAddKeyword}
          disabled={!newKeyword}
        >
          Add
        </Button>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Keywords help search engines understand your content. If none are added, categories will be used.
      </p>
      
      {keywords.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {keywords.map((keyword) => (
            <div key={keyword} className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full px-3 py-1 text-sm">
              {keyword}
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="h-5 w-5 p-0 ml-1" 
                onClick={() => handleRemoveKeyword(keyword)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
