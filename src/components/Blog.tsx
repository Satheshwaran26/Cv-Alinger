
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenText, Calendar, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const Blog: FC = () => {
  const recentPosts = [
    {
      id: 5,
      title: 'How AI Resume Builders Are Revolutionizing the Job Application Process',
      date: 'May 28, 2024',
      author: 'Hanan Amos',
      excerpt: 'Discover how AI resume builders are transforming the job application process with ATS optimization, data-driven content recommendations, personalized job matching, and professional design optimization.',
      slug: 'ai-resume-builders-revolution',
      categories: ['AI Tools', 'Resume Optimization', 'Job Search'],
      color: {
        bg: 'bg-teal-100 dark:bg-teal-900/30',
        text: 'text-teal-600 dark:text-teal-400',
        hover: 'hover:bg-teal-200 dark:hover:bg-teal-800/40'
      }
    },
    {
      id: 1,
      title: 'KSAO Framework: The Foundation of Strategic HR Management',
      date: 'May 15, 2024',
      author: 'Hanan Amos',
      excerpt: 'Discover how the KSAO framework systematically aligns workforce capabilities with job requirements, enhancing recruitment, employee development, and organizational agility.',
      slug: 'ksao-hr-framework',
      categories: ['AI Tools', 'Career Growth'],
      color: {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-600 dark:text-blue-400',
        hover: 'hover:bg-blue-200 dark:hover:bg-blue-800/40'
      }
    },
    {
      id: 2,
      title: 'Generative AI: Revolutionizing Industries and Reshaping the Future',
      date: 'April 30, 2024',
      author: 'Hanan Amos',
      excerpt: 'Explore how generative AI is transforming industries through AI-powered content creation, business automation, and innovative applications across sectors.',
      slug: 'generative-ai-revolution',
      categories: ['AI Tools'],
      color: {
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-600 dark:text-purple-400',
        hover: 'hover:bg-purple-200 dark:hover:bg-purple-800/40'
      }
    },
    {
      id: 3,
      title: 'AI Revolution in Job Hunting: A Personalized Approach',
      date: 'August 15, 2023',
      author: 'Hanan Amos',
      excerpt: 'AI has fundamentally transformed the way we approach job searching. Traditional methods are now giving way to highly personalized, targeted, and efficient AI-driven strategies.',
      slug: 'ai-revolution-job-hunting',
      categories: ['AI Tools', 'Job Search'],
      color: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-600 dark:text-green-400',
        hover: 'hover:bg-green-200 dark:hover:bg-green-800/40'
      }
    }
  ];

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {recentPosts.map(post => (
            <Card key={post.id} className="bg-white dark:bg-slate-900 overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
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
              <CardContent className="mt-auto">
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
