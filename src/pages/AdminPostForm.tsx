
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
import { saveCustomPost, getCustomPosts } from '@/utils/blogStorage';
import { useToast } from '@/hooks/use-toast';
import { SaveIcon, X, Info } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from '@/components/ui/card';

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

// Example HTML template for blog posts
const htmlTemplateExample = `<h2>Introduction</h2>
<p>Start with an engaging introduction that hooks the reader and presents the main topic of your article.</p>

<h2>First Main Point</h2>
<p>Develop your first key point with clear explanations and evidence.</p>
<ul>
  <li>Supporting point one</li>
  <li>Supporting point two</li>
  <li>Supporting point three</li>
</ul>

<h2>Second Main Point</h2>
<p>Continue with your next important point, maintaining a logical flow.</p>

<h2>Third Main Point</h2>
<p>Develop your third key argument or information section.</p>

<h2>Practical Tips</h2>
<p>Provide actionable advice that readers can implement.</p>

<h2>Conclusion</h2>
<p>Summarize your main points and end with a thought-provoking statement or call to action.</p>`;

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
    if (isEditMode && slug) {
      // First check in built-in posts
      if (posts[slug]) {
        const post = posts[slug];
        setTitle(post.title);
        setContent(post.content);
        setAuthor(post.author);
        setSelectedCategories(post.categories || []);
      } else {
        // Then check in custom posts
        const customPosts = getCustomPosts();
        if (customPosts[slug]) {
          const post = customPosts[slug];
          setTitle(post.title);
          setContent(post.content);
          setAuthor(post.author);
          setSelectedCategories(post.categories || []);
        } else {
          toast({
            title: "Post not found",
            description: "The post you're trying to edit doesn't exist.",
            variant: "destructive",
          });
          navigate('/admin/posts');
        }
      }
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

  const handleTemplateInsert = () => {
    setContent(htmlTemplateExample);
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

    // Create the post object
    const postData = {
      title,
      content,
      author,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      categories: selectedCategories
    };

    // Generate slug from title if not in edit mode
    const postSlug = isEditMode ? slug! : generateSlug(title);
    
    // Save the post
    saveCustomPost(postSlug, postData);
    
    toast({
      title: isEditMode ? "Post updated" : "Post created",
      description: `Your post has been ${isEditMode ? 'updated' : 'created'} successfully.`,
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
              value={isEditMode ? slug : generateSlug(title)}
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
            <div className="flex justify-between items-center">
              <Label htmlFor="content">Content *</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleTemplateInsert}
                className="text-xs"
              >
                Insert Template
              </Button>
            </div>
            
            <Accordion type="single" collapsible className="mb-4">
              <AccordionItem value="formatting-guide">
                <AccordionTrigger className="py-2 text-sm">
                  <div className="flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    HTML Formatting Guidelines
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Card className="p-4 bg-slate-50 dark:bg-slate-900 text-sm">
                    <h3 className="font-medium mb-2">Use the following HTML tags for consistent formatting:</h3>
                    <ul className="list-disc pl-5 space-y-1 mb-3">
                      <li><code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">&lt;h2&gt;</code> - For section headings</li>
                      <li><code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">&lt;p&gt;</code> - For paragraphs</li>
                      <li><code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">&lt;ul&gt;</code> and <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">&lt;li&gt;</code> - For bullet lists</li>
                      <li><code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">&lt;ol&gt;</code> and <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">&lt;li&gt;</code> - For numbered lists</li>
                      <li><code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">&lt;strong&gt;</code> - For bold text</li>
                      <li><code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">&lt;em&gt;</code> - For italic text</li>
                      <li><code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">&lt;a href="..."&gt;</code> - For links</li>
                    </ul>
                    <p className="text-xs mt-2">For best results, maintain a consistent structure with other blog posts on the site.</p>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <Textarea
              id="content"
              placeholder="Write your post content here (HTML supported)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="min-h-[300px] font-mono"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              HTML formatting is supported and encouraged for consistent styling. Use the template button for a starting point.
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
