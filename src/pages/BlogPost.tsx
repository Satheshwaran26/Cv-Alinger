
import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { posts, colorPalette } from '@/utils/posts';
import { getCustomPosts, debugStoredPosts } from '@/utils/blogStorage';
import { Badge } from '@/components/ui/badge';
import { Helmet } from 'react-helmet';

interface Post {
  title: string;
  date: string;
  author: string;
  content: string;
  categories?: string[];
  metaDescription?: string;
  keywords?: string[];
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
    
    // Debug - Check what posts are stored
    console.log("BlogPost - Loading post with slug:", slug);
    const storedPosts = debugStoredPosts();
    
    // First check if it's a predefined post
    if (posts[slug as keyof typeof posts]) {
      console.log("Found post in predefined posts");
      setCurrentPost(posts[slug as keyof typeof posts]);
      setIsLoading(false);
      return;
    }
    
    // Then check if it's a custom post
    const customPosts = getCustomPosts();
    console.log("Custom posts:", customPosts, "Looking for slug:", slug);
    
    if (customPosts[slug]) {
      console.log("Found post in custom posts:", customPosts[slug]);
      setCurrentPost(customPosts[slug]);
      setIsLoading(false);
      return;
    }
    
    // If we get here, the post doesn't exist
    console.log("Post not found with slug:", slug);
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

  // Prepare SEO metadata
  const metaDescription = currentPost.metaDescription || 
    currentPost.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...';
  const keywords = currentPost.keywords || 
    (currentPost.categories ? currentPost.categories.join(', ') : '');

  return (
    <Layout>
      {/* SEO Optimization */}
      <Helmet>
        <title>{currentPost.title} | Resume AI</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={currentPost.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={new Date(currentPost.date).toISOString()} />
        <meta property="article:author" content={currentPost.author} />
        {currentPost.categories?.map(category => (
          <meta key={category} property="article:tag" content={category} />
        ))}
      </Helmet>
      
      <div className="bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center mb-6 text-sm font-medium transition-colors hover:text-blue-600">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all articles
            </Link>
            
            <div className={`rounded-lg p-6 mb-8 ${colors.bg}`}>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">{currentPost.title}</h1>
              
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <div className={`flex items-center gap-1 ${colors.text}`}>
                  <Calendar className="h-4 w-4" />
                  <span>{currentPost.date}</span>
                </div>
                <div className={`flex items-center gap-1 ${colors.text}`}>
                  <User className="h-4 w-4" />
                  <span>{currentPost.author}</span>
                </div>
                
                {currentPost.categories && currentPost.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {currentPost.categories.map((category) => (
                      <Badge key={category} className={`${colors.bg} ${colors.text}`}>
                        <Tag className="h-3 w-3 mr-1" />
                        {category}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="prose prose-blue max-w-none dark:prose-invert prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-700 dark:prose-p:text-slate-300">
              <div dangerouslySetInnerHTML={{ __html: currentPost.content }} />
            </div>
            
            {/* Related articles could be added here in the future */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
