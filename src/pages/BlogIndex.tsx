
import { Layout } from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const BlogIndex = () => {
  const posts = [
    {
      id: 1,
      title: 'AI Revolution in Job Hunting: A Personalized Approach',
      date: 'August 15, 2023',
      excerpt: 'AI has fundamentally transformed the way we approach job searching. Traditional methods are now giving way to highly personalized, targeted, and efficient AI-driven strategies.',
      slug: 'ai-revolution-job-hunting'
    }
  ];

  return (
    <Layout>
      <div className="bg-white dark:bg-gray-950 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Our Blog</h1>
            <p className="text-slate-600 max-w-2xl mx-auto dark:text-slate-400">
              Expert articles on AI-powered job searching, resume optimization, and career advancement strategies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {posts.map(post => (
              <Card key={post.id} className="bg-white dark:bg-slate-900 overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={`/blog/${post.slug}`}>
                    <Button variant="outline" className="w-full">Read More</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogIndex;
