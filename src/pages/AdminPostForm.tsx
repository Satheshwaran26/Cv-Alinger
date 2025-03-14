
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { posts } from '@/utils/posts';
import { useToast } from '@/hooks/use-toast';
import { SaveIcon, X } from 'lucide-react';

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

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

const AdminPostForm = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = !!slug;
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  
  useEffect(() => {
    if (isEditMode && slug && posts[slug]) {
      const post = posts[slug];
      setTitle(post.title);
      setContent(post.content);
      setAuthor(post.author);
      setSelectedCategories(post.categories || []);
    } else if (isEditMode && slug && !posts[slug]) {
      toast({
        title: "Post not found",
        description: "The post you're trying to edit doesn't exist.",
        variant: "destructive",
      });
      navigate('/admin/posts');
    }
  }, [isEditMode, slug, navigate, toast]);

  const handleAddCategory = () => {
    if (newCategory && !selectedCategories.includes(newCategory)) {
      setSelectedCategories([...selectedCategories, newCategory]);
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (category: string) => {
    setSelectedCategories(selectedCategories.filter(c => c !== category));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content || !author) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, this would save to a database
    // For now we'll just show a toast notification
    toast({
      title: isEditMode ? "Post updated" : "Post created",
      description: "In a complete implementation, this would be saved to the database.",
    });
    
    // Redirect back to posts list
    navigate('/admin/posts');
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1 text-slate-900 dark:text-white">
          {isEditMode ? 'Edit Post' : 'Create New Post'}
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          {isEditMode 
            ? 'Update the details of your blog post' 
            : 'Fill out the form below to create a new blog post'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">Generated Slug</Label>
            <Input
              id="slug"
              value={generateSlug(title)}
              readOnly
              disabled
              className="bg-slate-50 dark:bg-slate-700"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              This will be automatically generated from the title
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="author">Author *</Label>
            <Input
              id="author"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          
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
          
          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              placeholder="Write your post content here (HTML supported)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="min-h-[300px] font-mono"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              HTML formatting is supported. Use &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, etc. for formatting.
            </p>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/posts')}>
            Cancel
          </Button>
          <Button type="submit">
            <SaveIcon className="mr-2 h-4 w-4" />
            {isEditMode ? 'Update Post' : 'Create Post'}
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AdminPostForm;
