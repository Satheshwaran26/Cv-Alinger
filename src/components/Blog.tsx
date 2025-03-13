
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenText, Calendar, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Import the posts data to check which posts have content
import { posts } from '@/utils/blogPosts';

export const Blog: FC = () => {
  // Filter the recent posts to only include those with content in the posts object
  const recentPosts = [
    {
      id: 28,
      title: 'How to Customize Your AI-Generated Resume for Different Industries',
      date: 'July 15, 2024',
      author: 'Hanan Amos',
      excerpt: 'Learn industry-specific optimization strategies to maximize the effectiveness of your AI-generated resume across technology, healthcare, finance, and other major sectors.',
      slug: 'customize-ai-resume-for-industries',
      categories: ['AI Tools', 'Resume Optimization', 'Industry Insights'],
      color: {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-600 dark:text-blue-400',
        hover: 'hover:bg-blue-200 dark:hover:bg-blue-800/40'
      }
    },
    {
      id: 27,
      title: 'The Future of Resume Writing: AI Tools vs. Professional Resume Writers',
      date: 'July 5, 2024',
      author: 'Hanan Amos',
      excerpt: 'Compare the strengths and limitations of AI resume tools versus professional resume writers, and discover how hybrid approaches combining both may offer the optimal solution for modern job seekers.',
      slug: 'resume-writing-ai-vs-professionals',
      categories: ['AI Tools', 'Resume Optimization', 'Career Development'],
      color: {
        bg: 'bg-amber-100 dark:bg-amber-900/30',
        text: 'text-amber-600 dark:text-amber-400',
        hover: 'hover:bg-amber-200 dark:hover:bg-amber-800/40'
      }
    },
    {
      id: 26,
      title: '10 Ways Resume AI Tools Can Boost Your Interview Chances',
      date: 'June 25, 2024',
      author: 'Hanan Amos',
      excerpt: 'Discover ten proven strategies for using AI-powered resume tools to dramatically increase your interview invitation rate, backed by data showing up to 65% higher success rates for optimized applications.',
      slug: '10-ways-resume-ai-interview-chances',
      categories: ['AI Tools', 'Resume Optimization', 'Interview Tips'],
      color: {
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-600 dark:text-purple-400',
        hover: 'hover:bg-purple-200 dark:hover:bg-purple-800/40'
      }
    },
    {
      id: 25,
      title: 'The Art of Virtual Interviewing: Techniques for Remote Success',
      date: 'September 18, 2023',
      author: 'Hanan Amos',
      excerpt: 'Master the unique challenges of virtual interviews with expert techniques for technical preparation, environmental optimization, and adapted communication skills for remote hiring processes.',
      slug: 'virtual-interviewing-techniques',
      categories: ['Interview Tips', 'Career Growth', 'Remote Work'],
      color: {
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-600 dark:text-purple-400',
        hover: 'hover:bg-purple-200 dark:hover:bg-purple-800/40'
      }
    }
  ].filter(post => post.slug in posts);

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {recentPosts.map(post => (
            <Card key={post.id} className="bg-white dark:bg-slate-900 overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full ${post.color.bg}`}>
                    <Calendar className={`h-3 w-3 ${post.color.text}`} />
                  </div>
                  <span>{post.date}</span>
                  <span className="mx-1">•</span>
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full ${post.color.bg}`}>
                    <User className={`h-3 w-3 ${post.color.text}`} />
                  </div>
                  <span>{post.author}</span>
                </div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 line-clamp-3">
                  {post.excerpt}
                </CardDescription>
                
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.categories.map((category) => (
                    <Badge key={category} className={`${post.color.bg} ${post.color.text}`}>
                      <Tag className="h-3 w-3 mr-1" />
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="pt-2 mt-auto">
                <Link to={`/blog/${post.slug}`}>
                  <Button 
                    variant="outline" 
                    className={`w-full transition-colors ${post.color.hover}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`flex items-center justify-center w-5 h-5 rounded-full ${post.color.bg}`}>
                        <BookOpenText className={`h-3 w-3 ${post.color.text}`} />
                      </div>
                      <span>Read More</span>
                    </div>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Link to="/blog" onClick={handleViewAllClick}>
            <Button variant="outline" className="flex items-center gap-2">
              <BookOpenText className="h-4 w-4" />
              <span>View All Articles</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

