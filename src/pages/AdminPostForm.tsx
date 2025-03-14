
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { posts, BlogPost } from '@/utils/posts';
import { saveCustomPost, getCustomPosts, debugStoredPosts } from '@/utils/blogStorage';
import { useToast } from '@/hooks/use-toast';
import { SaveIcon } from 'lucide-react';
import { CategorySelector } from '@/components/admin/CategorySelector';
import { KeywordSelector } from '@/components/admin/KeywordSelector';
import { ContentEditor } from '@/components/admin/ContentEditor';
import { generateSlug, checkLocalStorage } from '@/components/admin/BlogPostFormUtils';

const AdminPostForm = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = !!slug;
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [metaDescription, setMetaDescription] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isLocalStorageAvailable, setIsLocalStorageAvailable] = useState(true);
  
  useEffect(() => {
    // Check if localStorage is available
    const storageAvailable = checkLocalStorage();
    setIsLocalStorageAvailable(storageAvailable);
    
    if (!storageAvailable) {
      toast({
        title: "Storage Error",
        description: "Your browser's local storage is not available. Custom posts cannot be saved.",
        variant: "destructive",
      });
    }
    
    // Debug - check what posts are stored
    console.log("AdminPostForm - Checking stored posts:");
    debugStoredPosts();
    
    if (isEditMode && slug) {
      const normalizedSlug = slug.toLowerCase();
      
      // First check in built-in posts
      if (posts[slug]) {
        const post = posts[slug];
        console.log("Editing built-in post:", post);
        setTitle(post.title);
        setContent(post.content);
        setAuthor(post.author);
        setSelectedCategories(post.categories || []);
        setMetaDescription(post.metaDescription || '');
        setKeywords(post.keywords || []);
      } else {
        // Then check in custom posts
        const customPosts = getCustomPosts();
        console.log("Custom posts for editing:", customPosts);
        
        // Try with exact slug
        if (customPosts[slug]) {
          loadPostData(customPosts[slug]);
        } 
        // Try with normalized slug
        else if (customPosts[normalizedSlug]) {
          loadPostData(customPosts[normalizedSlug]);
        } 
        // Try case-insensitive match
        else {
          const possibleMatch = Object.keys(customPosts).find(
            key => key.toLowerCase() === slug.toLowerCase()
          );
          
          if (possibleMatch) {
            loadPostData(customPosts[possibleMatch]);
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
    }
  }, [isEditMode, slug, navigate, toast]);

  const loadPostData = (post: BlogPost) => {
    console.log("Loading post data:", post);
    setTitle(post.title);
    setContent(post.content);
    setAuthor(post.author);
    setSelectedCategories(post.categories || []);
    setMetaDescription(post.metaDescription || '');
    setKeywords(post.keywords || []);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLocalStorageAvailable) {
      toast({
        title: "Cannot save post",
        description: "Local storage is not available in your browser.",
        variant: "destructive",
      });
      return;
    }
    
    if (!title || !content || !author) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Generate meta description if not provided
    const generatedMetaDescription = metaDescription || 
      content.replace(/<[^>]*>/g, '').substring(0, 160) + '...';
    
    // Generate keywords from categories if not provided
    const generatedKeywords = keywords.length > 0 ? keywords : selectedCategories;

    // Create the post object
    const postData: BlogPost = {
      title,
      content,
      author,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      categories: selectedCategories,
      metaDescription: generatedMetaDescription,
      keywords: generatedKeywords
    };

    // Generate slug from title if not in edit mode
    const postSlug = isEditMode ? slug! : generateSlug(title);
    
    // Save the post
    console.log("Saving post with slug:", postSlug, "Data:", postData);
    saveCustomPost(postSlug, postData);
    debugStoredPosts();
    
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
            <Label htmlFor="metaDescription">Meta Description (SEO)</Label>
            <Textarea
              id="metaDescription"
              placeholder="Enter a description for search engines (max 160 characters)"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              maxLength={160}
              className="resize-none h-20"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {metaDescription.length}/160 characters. If left empty, it will be generated from your content.
            </p>
          </div>
          
          <CategorySelector 
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
          
          <KeywordSelector 
            keywords={keywords}
            setKeywords={setKeywords}
          />
          
          <ContentEditor 
            content={content}
            setContent={setContent}
          />
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
