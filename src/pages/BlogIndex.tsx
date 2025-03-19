import { Layout } from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, Tag, BookOpenText, Search, ChevronRight, Sparkles, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { posts, colorPalette } from '@/utils/posts';
import { getCustomPosts, debugStoredPosts } from '@/utils/blogStorage';
import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface PostWithMetadata {
  title: string;
  date: string;
  author: string;
  content: string;
  slug: string;
  id: number;
  excerpt: string;
  categories?: string[];
}

const primaryCategories = [
  "AI Tools",
  "Resume Tips",
  "Resume Optimization",
  "Job Search", 
  "Interviews",
  "Career Growth"
];

const BlogIndex = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [allBlogPosts, setAllBlogPosts] = useState<PostWithMetadata[]>([]);
  const [renderKey, setRenderKey] = useState(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRenderKey(Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    console.log("BlogIndex - Starting to load posts, checking localStorage:", renderKey);
    const storedPosts = debugStoredPosts();
    
    const predefinedPosts = Object.entries(posts).map(([slug, post], index) => {
      const filteredCategories = post.categories ? 
        post.categories.filter(cat => primaryCategories.includes(cat)) : [];
      
      const postCategories = filteredCategories.length > 0 ? 
        filteredCategories : [primaryCategories[index % primaryCategories.length]];
      
      return {
        ...post,
        slug,
        id: index,
        excerpt: post.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...',
        categories: postCategories
      };
    });

    try {
      const customPosts = getCustomPosts();
      console.log("BlogIndex - Custom posts loaded, count:", Object.keys(customPosts).length);
      console.log("BlogIndex - Custom posts slugs:", Object.keys(customPosts));
      
      const customPostsArray = Object.entries(customPosts).map(([slug, post], index) => {
        console.log(`Processing custom post: "${post.title}" with slug: "${slug}"`);
        return {
          ...post,
          slug,
          id: 1000 + index, // Use higher IDs to separate from predefined posts
          excerpt: post.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...',
          categories: post.categories || []
        };
      });

      const combinedPosts = [...predefinedPosts, ...customPostsArray];
      console.log("BlogIndex - All blog posts loaded, total count:", combinedPosts.length);
      console.log("BlogIndex - Custom posts in combined array:", customPostsArray.length);
      
      setAllBlogPosts(combinedPosts);
      
      // Check if we have the specific post the user is looking for
      const hasLeveragingAIPost = combinedPosts.some(post => 
        post.slug.toLowerCase().includes('leveraging-ai-for-strategic-career-planning') ||
        post.title.toLowerCase().includes('leveraging ai for strategic career planning')
      );
      
      if (hasLeveragingAIPost) {
        console.log("Found the 'Leveraging AI for Strategic Career Planning' post!");
      } else {
        console.log("The 'Leveraging AI for Strategic Career Planning' post was NOT found!");
      }
    } catch (error) {
      console.error("Error loading blog posts:", error);
      toast.error("There was an error loading blog posts. Please try refreshing the page.");
    }
  }, [renderKey]);

  const allCategories = useMemo(() => {
    const categories = new Set<string>(["All"]);
    
    primaryCategories.forEach(cat => categories.add(cat));
    
    allBlogPosts.forEach(post => {
      if (post.categories) {
        post.categories.forEach(cat => categories.add(cat));
      }
    });
    
    return Array.from(categories);
  }, [allBlogPosts]);

  const filteredPosts = useMemo(() => {
    return allBlogPosts.filter(post => {
      const matchesSearch = 
        searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        !selectedCategory || selectedCategory === "All" || 
        (post.categories && post.categories.includes(selectedCategory));
      
      return matchesSearch && matchesCategory;
    });
  }, [allBlogPosts, searchQuery, selectedCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === "All" ? "All" : 
      category === selectedCategory ? null : category);
  };

  const handlePostClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      <div className="min-h-screen py-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-fuchsia-100 via-white to-cyan-100 dark:from-gray-900 dark:via-slate-900 dark:to-cyan-950 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-fuchsia-200/40 via-violet-200/40 to-cyan-200/40 rounded-full blur-3xl dark:from-fuchsia-900/20 dark:via-violet-900/20 dark:to-cyan-900/20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-cyan-200/40 via-violet-200/40 to-fuchsia-200/40 rounded-full blur-3xl dark:from-cyan-900/20 dark:via-violet-900/20 dark:to-fuchsia-900/20 animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-200/30 via-fuchsia-200/30 to-cyan-200/30 rounded-full blur-3xl dark:from-violet-900/20 dark:via-fuchsia-900/20 dark:to-cyan-900/20 animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-block mb-8">
                
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 dark:from-fuchsia-400 dark:via-violet-400 dark:to-cyan-400 text-transparent bg-clip-text flex items-center justify-center gap-3">
                    Knowledge Base <BookOpen className="h-8 w-8 text-fuchsia-500 dark:text-fuchsia-400 animate-pulse" />
                  </h1>
                
              </div>
              <p className="text-slate-700 dark:text-slate-200 text-lg md:text-xl max-w-2xl mx-auto mb-12 bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-md p-6 rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl">
                AI-driven job search, resume tips, and career growth strategies.
              </p>
              
              <div className="relative max-w-xl mx-auto mb-12 group">
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/5 via-violet-500/5 to-cyan-500/5 dark:from-fuchsia-500/10 dark:via-violet-500/10 dark:to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-fuchsia-500 dark:text-fuchsia-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-12 py-6 w-full bg-white/80 dark:bg-gray-900/80 text-slate-800 dark:text-white border-white/30 dark:border-gray-700/30 rounded-xl shadow-xl backdrop-blur-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-0 rounded-xl ring-1 ring-fuchsia-500/20 group-hover:ring-fuchsia-500/40 transition-all pointer-events-none"></div>
              </div>
              
              <div className="mb-14 flex flex-wrap justify-center gap-3">
                {allCategories.map((category, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    key={category}
                  >
                    <Badge 
                      className={`cursor-pointer text-sm py-2.5 px-5 rounded-full transition-all duration-300 ${
                        (selectedCategory === category || (category === "All" && !selectedCategory))
                        ? 'bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 dark:from-fuchsia-500 dark:via-violet-500 dark:to-cyan-500 text-white shadow-md shadow-fuchsia-500/20 dark:shadow-fuchsia-500/10 hover:shadow-lg hover:shadow-fuchsia-500/30' 
                        : 'bg-white/80 dark:bg-gray-900/80 text-slate-700 dark:text-slate-200 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-800/90'
                      }`}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {filteredPosts.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {filteredPosts.map((post, idx) => {
                  const colorSchemes = {
                    fuchsia: {
                      gradient: 'from-fuchsia-500 to-pink-500',
                      bg: 'bg-fuchsia-100 dark:bg-fuchsia-900/30',
                      lightBg: 'bg-fuchsia-50 dark:bg-fuchsia-900/10',
                      text: 'text-fuchsia-600 dark:text-fuchsia-400',
                      hover: 'hover:bg-fuchsia-200 dark:hover:bg-fuchsia-800/40',
                      border: 'border-fuchsia-200 dark:border-fuchsia-800/40',
                      shadow: 'shadow-fuchsia-500/10'
                    },
                    violet: {
                      gradient: 'from-violet-500 to-purple-500',
                      bg: 'bg-violet-100 dark:bg-violet-900/30',
                      lightBg: 'bg-violet-50 dark:bg-violet-900/10',
                      text: 'text-violet-600 dark:text-violet-400',
                      hover: 'hover:bg-violet-200 dark:hover:bg-violet-800/40',
                      border: 'border-violet-200 dark:border-violet-800/40',
                      shadow: 'shadow-violet-500/10'
                    },
                    cyan: {
                      gradient: 'from-cyan-500 to-blue-500',
                      bg: 'bg-cyan-100 dark:bg-cyan-900/30',
                      lightBg: 'bg-cyan-50 dark:bg-cyan-900/10',
                      text: 'text-cyan-600 dark:text-cyan-400',
                      hover: 'hover:bg-cyan-200 dark:hover:bg-cyan-800/40',
                      border: 'border-cyan-200 dark:border-cyan-800/40',
                      shadow: 'shadow-cyan-500/10'
                    },
                    purple: {
                      gradient: 'from-purple-500 to-indigo-500',
                      bg: 'bg-purple-100 dark:bg-purple-900/30',
                      lightBg: 'bg-purple-50 dark:bg-purple-900/10',
                      text: 'text-purple-600 dark:text-purple-400',
                      hover: 'hover:bg-purple-200 dark:hover:bg-purple-800/40',
                      border: 'border-purple-200 dark:border-purple-800/40',
                      shadow: 'shadow-purple-500/10'
                    }
                  };
                  
                  const colorKeys = Object.keys(colorSchemes);
                  const colorKey = colorKeys[post.id % colorKeys.length] as keyof typeof colorSchemes;
                  const color = colorSchemes[colorKey];

                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
                      key={post.slug}
                    >
                      <Card className="group relative bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-md border border-white/30 dark:border-gray-700/30 shadow-2xl transition-all duration-300 h-full flex flex-col overflow-hidden rounded-2xl hover:shadow-fuchsia-500/10 dark:hover:shadow-fuchsia-500/5 hover:shadow-2xl">
                        <div className={`h-1.5 w-full bg-gradient-to-r ${color.gradient}`}></div>
                        <div className="absolute top-2 right-2 w-24 h-24 bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/30 dark:to-gray-800/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <CardHeader className="pb-2 pt-6">
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-3">
                            <div className={`flex items-center justify-center w-7 h-7 rounded-full ${color.bg}`}>
                              <Calendar className={`h-3.5 w-3.5 ${color.text}`} />
                            </div>
                            <span>{post.date}</span>
                            <span className="mx-1">•</span>
                            <div className={`flex items-center justify-center w-7 h-7 rounded-full ${color.bg}`}>
                              <User className={`h-3.5 w-3.5 ${color.text}`} />
                            </div>
                            <span>{post.author}</span>
                          </div>
                          
                          <CardTitle className="text-2xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fuchsia-600 group-hover:via-violet-600 group-hover:to-cyan-600 dark:group-hover:from-fuchsia-400 dark:group-hover:via-violet-400 dark:group-hover:to-cyan-400 transition-all duration-300">
                            {post.title}
                          </CardTitle>
                          
                          <CardDescription className="text-slate-700 dark:text-slate-300 text-lg mt-3 line-clamp-3">
                            {post.excerpt}
                          </CardDescription>

                          {post.categories && post.categories.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-5">
                              {post.categories.map(category => (
                                <Badge key={category} className={`${color.bg} ${color.text} rounded-full px-3 py-1 border ${color.border}`}>
                                  <Tag className="h-3 w-3 mr-1.5" />
                                  {category}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardHeader>
                        
                        <CardFooter className="pt-5 mt-auto">
                          <Link to={`/blog/${post.slug}`} className="w-full" onClick={handlePostClick}>
                            <Button 
                              variant="outline" 
                              className="w-full transition-all duration-300 border border-white/30 dark:border-gray-700/30 bg-white/50 dark:bg-gray-900/50 hover:bg-white/80 dark:hover:bg-gray-800/80 text-slate-800 dark:text-white group-hover:bg-gradient-to-r group-hover:from-fuchsia-600 group-hover:via-violet-600 group-hover:to-cyan-600 dark:group-hover:from-fuchsia-500 dark:group-hover:via-violet-500 dark:group-hover:to-cyan-500 group-hover:text-white group-hover:border-transparent"
                            >
                              <div className="flex items-center justify-center gap-2">
                                <div className={`flex items-center justify-center w-6 h-6 rounded-full ${color.bg}`}>
                                  <BookOpenText className={`h-3.5 w-3.5 ${color.text}`} />
                                </div>
                                <span>Read Full Article</span>
                                <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                              </div>
                            </Button>
                          </Link>
                        </CardFooter>
                        
                        <div className="absolute bottom-2 left-2 w-16 h-16 bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/30 dark:to-gray-800/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-24 bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-2xl"
              >
                <div className="mb-8 mx-auto w-20 h-20 bg-gradient-to-br from-fuchsia-500 to-violet-500 dark:from-fuchsia-400 dark:to-violet-400 rounded-2xl flex items-center justify-center transform rotate-3 transition-transform duration-300 hover:rotate-6 shadow-xl">
                  <Sparkles className="h-10 w-10 text-white animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 dark:from-fuchsia-400 dark:via-violet-400 dark:to-cyan-400 text-transparent bg-clip-text">
                  No articles found
                </h2>
                <p className="text-lg text-slate-700 dark:text-slate-300 max-w-md mx-auto mb-6">
                  {selectedCategory && selectedCategory !== "All" ? 
                    `No articles found in the "${selectedCategory}" category.` : 
                    searchQuery ? 
                      `No articles found matching "${searchQuery}".` : 
                      'Check back soon for new content.'}
                </p>
                {(selectedCategory || searchQuery) && (
                  <Button 
                    className="group relative mt-4 bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 dark:from-fuchsia-500 dark:via-violet-500 dark:to-cyan-500 text-white py-4 px-6 rounded-xl shadow-xl hover:from-fuchsia-500 hover:via-violet-500 hover:to-cyan-500 dark:hover:from-fuchsia-400 dark:hover:via-violet-400 dark:hover:to-cyan-400 transition-all duration-300 transform hover:scale-105 border border-white/30 dark:border-white/10"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20 dark:bg-white/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10">Reset Filters</span>
                  </Button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogIndex;
