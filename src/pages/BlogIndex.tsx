
import { Layout } from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, Tag, BookOpenText, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { posts } from '@/utils/posts';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';

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

  const allPosts = Object.entries(posts).map(([slug, post], index) => {
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
  }) as PostWithMetadata[];

  const allCategories = useMemo(() => {
    return ["All", ...primaryCategories];
  }, []);

  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
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
  }, [allPosts, searchQuery, selectedCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === "All" ? "All" : 
      category === selectedCategory ? null : category);
  };

  return <Layout>
      <div className="container mx-auto px-4 py-12 bg-slate-900 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-3 text-white">Knowledge Base</h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
              AI-driven job search, resume tips, and career growth strategies.
            </p>
            
            <div className="relative max-w-lg mx-auto mb-12">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 w-full bg-slate-800 text-white border-slate-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="mb-10 flex flex-wrap justify-center gap-3">
              {allCategories.map(category => (
                <Badge 
                  key={category}
                  className={`cursor-pointer text-sm py-2 px-4 ${
                    (selectedCategory === category || (category === "All" && !selectedCategory))
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map(post => {
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
                  <Card key={post.slug} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
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

                      {post.categories && post.categories.length > 0 && <div className="flex flex-wrap gap-2 mt-4">
                          {post.categories.map(category => <Badge key={category} className={`${color.bg} ${color.text}`}>
                              <Tag className="h-3 w-3 mr-1" />
                              {category}
                            </Badge>)}
                        </div>}
                    </CardHeader>
                    <CardFooter className="pt-4 mt-auto">
                      <Link to={`/blog/${post.slug}`} className="w-full">
                        <Button variant="outline" className={`w-full transition-colors ${color.hover}`}>
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
              <h2 className="text-xl font-medium mb-4 text-slate-300">
                No articles found
              </h2>
              <p className="text-slate-400">
                {selectedCategory && selectedCategory !== "All" ? 
                  `No articles found in the "${selectedCategory}" category.` : 
                  searchQuery ? 
                    `No articles found matching "${searchQuery}".` : 
                    'Check back soon for new content.'}
              </p>
              {(selectedCategory || searchQuery) && (
                <Button 
                  variant="outline" 
                  className="mt-4 bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                >
                  Reset Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>;
};

export default BlogIndex;
