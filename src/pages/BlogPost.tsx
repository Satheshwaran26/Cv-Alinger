
import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { posts, colorPalette } from '@/utils/posts';
import { getCustomPosts } from '@/utils/blogStorage';

interface Post {
  title: string;
  date: string;
  author: string;
  content: string;
  categories?: string[];
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  // Load the post data
  useEffect(() => {
    if (!slug) {
      setIsLoading(false);
      return;
    }
    
    // First check if it's a predefined post
    if (posts[slug as keyof typeof posts]) {
      setCurrentPost(posts[slug as keyof typeof posts]);
      setIsLoading(false);
      return;
    }
    
    // Then check if it's a custom post
    const customPosts = getCustomPosts();
    console.log("BlogPost - Custom posts:", customPosts, "Looking for slug:", slug);
    
    if (customPosts[slug]) {
      setCurrentPost(customPosts[slug]);
      setIsLoading(false);
      return;
    }
    
    // If we get here, the post doesn't exist
    setIsLoading(false);
  }, [slug]);
  
  // If the post doesn't exist or is still loading, show a loading state or redirect
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-slate-600 dark:text-slate-400">Loading article...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  // If the post doesn't exist, redirect to the blog index page
  if (!currentPost) {
    return <Navigate to="/blog" replace />;
  }
  
  // Determine colors for the post
  const colors = slug && colorPalette[slug as keyof typeof colorPalette] 
    ? colorPalette[slug as keyof typeof colorPalette]
    : colorPalette['default'];

  return (
    <Layout>
      <div className="bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center mb-6 text-sm font-medium transition-colors hover:text-blue-600">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all articles
            </Link>
            
            <div className={`rounded-lg p-6 mb-8 ${colors.bg}`}>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">{currentPost.title}</h1>
              
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <div className={`flex items-center gap-1 ${colors.text}`}>
                  <Calendar className="h-4 w-4" />
                  <span>{currentPost.date}</span>
                </div>
                <div className={`flex items-center gap-1 ${colors.text}`}>
                  <User className="h-4 w-4" />
                  <span>{currentPost.author}</span>
                </div>
              </div>
            </div>
            
            <div className="prose prose-blue max-w-none dark:prose-invert prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-700 dark:prose-p:text-slate-300">
              <div dangerouslySetInnerHTML={{ __html: currentPost.content }} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
