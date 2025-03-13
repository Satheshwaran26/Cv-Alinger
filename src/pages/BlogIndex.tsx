
import { Layout } from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, Tag, BookOpenText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { posts } from '@/utils/blogPosts';

const BlogIndex = () => {
  // Get all available blog posts that have content
  const allPosts = Object.entries(posts).map(([slug, post]) => ({
    ...post,
    slug,
  }));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Blog</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Industry insights and expert advice on AI-powered job searching, resume optimization, and career advancement.
            </p>
          </div>

          {allPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {allPosts.map((post) => {
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
                  <Card key={post.slug} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="pb-2">
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
                      <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-400 text-lg mt-2">
                        {post.excerpt}
                      </CardDescription>

                      {post.categories && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {post.categories.map((category) => (
                            <Badge key={category} className={`${color.bg} ${color.text}`}>
                              <Tag className="h-3 w-3 mr-1" />
                              {category}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardHeader>
                    <CardFooter className="pt-4">
                      <Link to={`/blog/${post.slug}`} className="w-full">
                        <Button 
                          variant="outline" 
                          className={`w-full transition-colors ${color.hover}`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`flex items-center justify-center w-5 h-5 rounded-full ${color.bg}`}>
                              <BookOpenText className={`h-3 w-3 ${color.text}`} />
                            </div>
                            <span>Read Full Article</span>
                          </div>
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-xl font-medium mb-4 text-slate-700 dark:text-slate-300">
                No articles found
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Check back soon for new content.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BlogIndex;
