import { FC, useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenText, Calendar, User, Tag, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

// Import the posts data and color palette
import { posts, colorPalette } from '@/utils/posts';
import { getCustomPosts, debugStoredPosts } from '@/utils/blogStorage';

interface PostWithMetadata {
  title: string;
  date: string;
  author: string;
  content: string;
  slug: string;
  id: number;
  excerpt: string;
  categories: string[];
}

// Define our primary categories
const primaryCategories = [
  "Career Advice",
  "Resume Tips",
  "Interview Skills",
  "Job Search", 
  "Industry Trends",
  "AI Tools",
  "Industry-Specific", 
  "Interview Preparation",
  "Career Development"
];

export const Blog: FC = () => {
  const [allPostsData, setAllPostsData] = useState<PostWithMetadata[]>([]);
  const [renderKey, setRenderKey] = useState(Date.now());

  // Force periodic refresh to catch new posts
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRenderKey(Date.now());
    }, 1000); // Check every second

    return () => clearInterval(intervalId);
  }, []);

  // Load all blog posts (built-in and custom)
  useEffect(() => {
    // Debug current localStorage state
    console.log("Blog component - Checking localStorage for posts:");
    const storedPosts = debugStoredPosts();
    
    // Get predefined posts
    const predefinedPosts = Object.entries(posts).map(([slug, post], index) => {
      // Filter post categories to only include our primary categories
      const filteredCategories = post.categories ? 
        post.categories.filter(cat => primaryCategories.includes(cat)) : [];
      
      // If no matching categories, assign the first primary category
      const postCategories = filteredCategories.length > 0 ? 
        filteredCategories : [primaryCategories[index % primaryCategories.length]];
      
      return {
        ...post,
        slug,
        id: index, // Generate an id based on index
        excerpt: post.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...', // Generate excerpt from content
        categories: postCategories // Use filtered or assigned categories
      };
    });

    // Get custom posts from localStorage
    const customPosts = getCustomPosts();
    console.log("Blog component - Custom posts from localStorage:", customPosts);
    
    const customPostsArray = Object.entries(customPosts).map(([slug, post], index) => {
      return {
        ...post,
        slug,
        id: predefinedPosts.length + index,
        excerpt: post.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...',
        categories: post.categories || []
      };
    });

    // Combine both types of posts and log for debugging
    const allPosts = [...predefinedPosts, ...customPostsArray];
    console.log("Blog component - All loaded posts:", allPosts);
    setAllPostsData(allPosts);
  }, [renderKey]); // Re-run when renderKey changes

  // Sort by date (newest first) and limit to 4 posts
  const recentPosts = useMemo(() => {
    return allPostsData
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4);
  }, [allPostsData]);

  const handleViewAllClick = () => {
    // Scroll to top when user navigates to the blog page
    window.scrollTo(0, 0);
  };

  // Add scroll to top function for individual posts
  const handlePostClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section id="blog" className="py-32 relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-fuchsia-100 via-white to-cyan-100 dark:from-gray-900 dark:via-slate-900 dark:to-cyan-950">
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-fuchsia-200/40 via-violet-200/40 to-cyan-200/40 rounded-full blur-3xl dark:from-fuchsia-900/20 dark:via-violet-900/20 dark:to-cyan-900/20 animate-pulse"></div>
        <div className="absolute -top-48 -left-48 w-96 h-96 bg-gradient-to-br from-violet-400/30 to-fuchsia-400/30 rounded-full filter blur-3xl animate-blob animation-delay-2000 dark:from-violet-600/20 dark:to-fuchsia-600/20"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-cyan-200/40 via-violet-200/40 to-fuchsia-200/40 rounded-full blur-3xl dark:from-cyan-900/20 dark:via-violet-900/20 dark:to-fuchsia-900/20 animate-pulse delay-700"></div>
        <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-violet-400/30 rounded-full filter blur-3xl animate-blob animation-delay-4000 dark:from-cyan-600/20 dark:to-violet-600/20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-8">
            <span className="bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl dark:from-gray-900/95 dark:to-gray-900/80 border border-white/30 dark:border-gray-700/30 inline-flex items-center gap-3">
              <BookOpenText className="h-6 w-6 text-fuchsia-500 dark:text-fuchsia-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-fuchsia-600 to-violet-600 dark:from-fuchsia-400 dark:to-violet-400 text-transparent bg-clip-text">
                Latest Articles
              </span>
            </span>
          </div>

          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/20 via-violet-600/20 to-cyan-600/20 blur-xl rounded-3xl transform rotate-3 scale-105"></div>
            <h2 className="relative text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 dark:from-fuchsia-400 dark:via-violet-400 dark:to-cyan-400 text-transparent bg-clip-text flex items-center justify-center gap-3">
              Latest Insights
              <span className="relative inline-block">
                <Sparkles className="h-8 w-8 text-cyan-400 dark:text-cyan-300 animate-pulse" />
              </span>
            </h2>
          </div>

          <p className="text-slate-700 dark:text-slate-200 text-lg md:text-xl max-w-2xl mx-auto mt-8 bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-md p-8 rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl relative group">
            <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 via-violet-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="relative">
              Expert articles on AI-powered job searching, resume optimization, and career advancement strategies.
            </span>
          </p>
        </div>
        
        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {recentPosts.map((post, index) => {
              const postColors = colorPalette[post.slug as keyof typeof colorPalette] || colorPalette.default;
              
              return (
                <div key={post.slug} className="group">
                  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/20 via-violet-600/20 to-cyan-600/20 blur-xl rounded-3xl transform rotate-2 scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Card className="bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-2xl hover:shadow-3xl transition-all duration-300 flex flex-col h-full overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 via-violet-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <CardHeader className="pb-4 relative">
                      <div className="flex items-center gap-3 text-sm mb-4">
                        <span className="bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-md px-3 py-2 rounded-xl shadow-lg dark:from-gray-900/95 dark:to-gray-900/80 border border-white/30 dark:border-gray-700/30 inline-flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-fuchsia-500 dark:text-fuchsia-400" />
                          <span className="text-slate-700 dark:text-slate-300">{post.date}</span>
                        </span>
                        <span className="bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-md px-3 py-2 rounded-xl shadow-lg dark:from-gray-900/95 dark:to-gray-900/80 border border-white/30 dark:border-gray-700/30 inline-flex items-center gap-2">
                          <User className="h-4 w-4 text-violet-500 dark:text-violet-400" />
                          <span className="text-slate-700 dark:text-slate-300">{post.author}</span>
                        </span>
                      </div>

                      <CardTitle className="text-2xl font-bold bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 dark:from-fuchsia-400 dark:via-violet-400 dark:to-cyan-400 text-transparent bg-clip-text mb-4">
                        {post.title}
                      </CardTitle>

                      <CardDescription className="text-slate-700 dark:text-slate-300 text-base line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                      
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {post.categories.map((category) => (
                            <Badge 
                              key={category} 
                              className="bg-gradient-to-r from-fuchsia-500/20 via-violet-500/20 to-cyan-500/20 dark:from-fuchsia-400/20 dark:via-violet-400/20 dark:to-cyan-400/20 text-slate-700 dark:text-slate-200 backdrop-blur-md border border-white/30 dark:border-gray-700/30 shadow-sm"
                            >
                              <Tag className="h-3 w-3 mr-1 text-fuchsia-500 dark:text-fuchsia-400" />
                              {category}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardHeader>

                    <CardContent className="pt-2 mt-auto relative">
                      <Link to={`/blog/${post.slug}`} onClick={handlePostClick}>
                        <Button 
                          variant="outline" 
                          className="w-full group/btn bg-gradient-to-r from-fuchsia-500/10 via-violet-500/10 to-cyan-500/10 hover:from-fuchsia-500/20 hover:via-violet-500/20 hover:to-cyan-500/20 border border-white/30 dark:border-gray-700/30 transition-all duration-300"
                        >
                          <span className="flex items-center gap-2 relative">
                            <BookOpenText className="h-5 w-5 text-fuchsia-500 dark:text-fuchsia-400" />
                            <span className="bg-gradient-to-r from-fuchsia-600 to-violet-600 dark:from-fuchsia-400 dark:to-violet-400 text-transparent bg-clip-text font-medium">
                              Read More
                            </span>
                            <ArrowRight className="h-4 w-4 text-violet-500 dark:text-violet-400 transform group-hover/btn:translate-x-1 transition-transform" />
                          </span>
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl">
            <p className="text-slate-700 dark:text-slate-300 text-lg">
              Check back soon for new content.
            </p>
          </div>
        )}
        
        {recentPosts.length > 0 && (
          <div className="flex justify-center mt-16">
            <Link to="/blog" onClick={handleViewAllClick}>
              <Button 
                variant="outline" 
                className="group relative bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-md px-8 py-6 rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 via-violet-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="flex items-center gap-3 relative">
                  <BookOpenText className="h-5 w-5 text-fuchsia-500 dark:text-fuchsia-400" />
                  <span className="bg-gradient-to-r from-fuchsia-600 to-violet-600 dark:from-fuchsia-400 dark:to-violet-400 text-transparent bg-clip-text font-medium">
                    View All Articles
                  </span>
                  <ArrowRight className="h-4 w-4 text-violet-500 dark:text-violet-400 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
