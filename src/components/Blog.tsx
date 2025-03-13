
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenText, Calendar, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Import the posts data
import { posts } from '@/utils/blogPosts';

export const Blog: FC = () => {
  // Create an array of post data from the posts object
  const allPostsData = Object.entries(posts).map(([slug, post]) => ({
    ...post,
    slug
  }));

  // Sort by date (newest first) and limit to 4 posts
  const recentPosts = allPostsData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  const handleViewAllClick = () => {
    // Scroll to top when user navigates to the blog page
    window.scrollTo(0, 0);
  };

  return (
    <section id="blog" className="py-16 relative overflow-hidden bg-white dark:bg-gray-950">
      {/* Background light elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-20 dark:bg-blue-900 dark:opacity-10"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-20 dark:bg-blue-900 dark:opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Latest Insights</h2>
          <p className="text-slate-600 max-w-2xl mx-auto dark:text-slate-400">
            Expert articles on AI-powered job searching, resume optimization, and career advancement strategies.
          </p>
        </div>
        
        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {recentPosts.map(post => {
              const colorClasses = {
                blue: {
                  bg: 'bg-blue-100 dark:bg-blue-900/30',
                  text: 'text-blue-600 dark:text-blue-400',
                  hover: 'hover:bg-blue-200 dark:hover:bg-blue-800/40'
                },
                amber: {
                  bg: 'bg-amber-100 dark:bg-amber-900/30',
                  text: 'text-amber-600 dark:text-amber-400',
                  hover: 'hover:bg-amber-200 dark:hover:bg-amber-800/40'
                },
                purple: {
                  bg: 'bg-purple-100 dark:bg-purple-900/30',
                  text: 'text-purple-600 dark:text-purple-400',
                  hover: 'hover:bg-purple-200 dark:hover:bg-purple-800/40'
                },
                green: {
                  bg: 'bg-green-100 dark:bg-green-900/30',
                  text: 'text-green-600 dark:text-green-400', 
                  hover: 'hover:bg-green-200 dark:hover:bg-green-800/40'
                }
              };

              const colorKeys = Object.keys(colorClasses);
              const colorKey = colorKeys[post.id % colorKeys.length] as keyof typeof colorClasses;
              const color = colorClasses[colorKey];

              return (
                <Card key={post.slug} className="bg-white dark:bg-slate-900 overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                      <div className={`flex items-center justify-center w-6 h-6 rounded-full ${color.bg}`}>
                        <Calendar className={`h-3 w-3 ${color.text}`} />
                      </div>
                      <span>{post.date}</span>
                      <span className="mx-1">•</span>
                      <div className={`flex items-center justify-center w-6 h-6 rounded-full ${color.bg}`}>
                        <User className={`h-3 w-3 ${color.text}`} />
                      </div>
                      <span>{post.author}</span>
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400 line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                    
                    {post.categories && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.categories.map((category) => (
                          <Badge key={category} className={`${color.bg} ${color.text}`}>
                            <Tag className="h-3 w-3 mr-1" />
                            {category}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="pt-2 mt-auto">
                    <Link to={`/blog/${post.slug}`}>
                      <Button 
                        variant="outline" 
                        className={`w-full transition-colors ${color.hover}`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`flex items-center justify-center w-5 h-5 rounded-full ${color.bg}`}>
                            <BookOpenText className={`h-3 w-3 ${color.text}`} />
                          </div>
                          <span>Read More</span>
                        </div>
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-slate-600 dark:text-slate-400">
              Check back soon for new content.
            </p>
          </div>
        )}
        
        {recentPosts.length > 0 && (
          <div className="flex justify-center mt-12">
            <Link to="/blog" onClick={handleViewAllClick}>
              <Button variant="outline" className="flex items-center gap-2">
                <BookOpenText className="h-4 w-4" />
                <span>View All Articles</span>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
