
import { Layout } from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, Tag, BookOpenText, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { posts } from '@/utils/blogPosts';
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
  "Career Advice",
  "Resume Tips",
  "Interview Skills",
  "Job Search", 
  "Industry Trends",
  "AI Tools"
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
    return primaryCategories;
  }, []);

  const categoryColumns = useMemo(() => {
    return [
      allCategories.slice(0, 3),
      allCategories.slice(3)
    ];
  }, [allCategories]);

  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesSearch = 
        searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        !selectedCategory || 
        (post.categories && post.categories.includes(selectedCategory));
      
      return matchesSearch && matchesCategory;
    });
  }, [allPosts, searchQuery, selectedCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prevCategory => 
      prevCategory === category ? null : category
    );
  };

  return <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Knowledge Base</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
              Industry insights and expert advice on AI-powered job searching, resume optimization, and career advancement.
            </p>
            
            <div className="relative max-w-md mx-auto mb-8">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">
                <Tag className="inline mr-2 h-5 w-5" />
                Categories
              </h2>
              <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                {categoryColumns.map((column, colIndex) => (
                  <div key={colIndex} className="flex flex-col gap-2 w-full">
                    {column.map(category => (
                      <Badge 
                        key={category}
                        className={`cursor-pointer text-sm py-1.5 px-3 ${
                          selectedCategory === category 
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                            : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                        }`}
                        onClick={() => handleCategoryClick(category)}
                      >
                        {category} {selectedCategory === category && '✓'}
                      </Badge>
                    ))}
                  </div>
                ))}
              </div>
              
              {selectedCategory && (
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                  >
                    Clear Filter
                  </Button>
                </div>
              )}
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
              <h2 className="text-xl font-medium mb-4 text-slate-700 dark:text-slate-300">
                No articles found
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                {selectedCategory ? 
                  `No articles found in the "${selectedCategory}" category.` : 
                  searchQuery ? 
                    `No articles found matching "${searchQuery}".` : 
                    'Check back soon for new content.'}
              </p>
              {(selectedCategory || searchQuery) && (
                <Button 
                  variant="outline" 
                  className="mt-4"
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
