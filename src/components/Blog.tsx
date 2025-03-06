
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenText, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export const Blog: FC = () => {
  const recentPosts = [
    {
      id: 1,
      title: 'KSAO Framework: The Foundation of Strategic HR Management',
      date: 'May 15, 2024',
      author: 'Hanan Amos',
      excerpt: 'Discover how the KSAO framework systematically aligns workforce capabilities with job requirements, enhancing recruitment, employee development, and organizational agility.',
      slug: 'ksao-hr-framework'
    },
    {
      id: 2,
      title: 'Generative AI: Revolutionizing Industries and Reshaping the Future',
      date: 'April 30, 2024',
      author: 'Hanan Amos',
      excerpt: 'Explore how generative AI is transforming industries through AI-powered content creation, business automation, and innovative applications across sectors.',
      slug: 'generative-ai-revolution'
    },
    {
      id: 3,
      title: 'AI Revolution in Job Hunting: A Personalized Approach',
      date: 'August 15, 2023',
      author: 'Hanan Amos',
      excerpt: 'AI has fundamentally transformed the way we approach job searching. Traditional methods are now giving way to highly personalized, targeted, and efficient AI-driven strategies.',
      slug: 'ai-revolution-job-hunting'
    }
  ];

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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {recentPosts.map(post => (
            <Card key={post.id} className="bg-white dark:bg-slate-900 overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                  <span className="mx-1">•</span>
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Link to={`/blog/${post.slug}`}>
                  <Button variant="outline" className="w-full">Read More</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Link to="/blog">
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
