
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';

interface PostCategory {
  value: string;
  label: string;
}

const categories: PostCategory[] = [
  { value: "AI Tools", label: "AI Tools" },
  { value: "Resume Tips", label: "Resume Tips" },
  { value: "Resume Optimization", label: "Resume Optimization" },
  { value: "Job Search", label: "Job Search" },
  { value: "Interviews", label: "Interviews" },
  { value: "Career Growth", label: "Career Growth" },
  { value: "Industry Trends", label: "Industry Trends" },
  { value: "Technical Skills", label: "Technical Skills" },
  { value: "Soft Skills", label: "Soft Skills" },
];

interface CategorySelectorProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

export const CategorySelector = ({
  selectedCategories,
  setSelectedCategories,
}: CategorySelectorProps) => {
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory && !selectedCategories.includes(newCategory)) {
      setSelectedCategories([...selectedCategories, newCategory]);
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (category: string) => {
    setSelectedCategories(selectedCategories.filter(c => c !== category));
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="categories">Categories</Label>
      <div className="flex gap-2">
        <Select onValueChange={(value) => setNewCategory(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleAddCategory}
          disabled={!newCategory}
        >
          Add
        </Button>
      </div>
      
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedCategories.map((category) => (
            <div key={category} className="inline-flex items-center bg-slate-100 dark:bg-slate-700 rounded-full px-3 py-1 text-sm">
              {category}
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="h-5 w-5 p-0 ml-1" 
                onClick={() => handleRemoveCategory(category)}
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
