
import { useParams, Link, Navigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { posts, colorPalette } from '@/utils/posts';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Check if the post exists in our posts object
  const postExists = slug && posts[slug as keyof typeof posts];
  
  // If the post doesn't exist, redirect to the blog index page
  if (!postExists) {
    return <Navigate to="/blog" replace />;
  }
  
  const colors = colorPalette[slug as keyof typeof colorPalette] 
    ? colorPalette[slug as keyof typeof colorPalette]
    : colorPalette['default'];
  
  const currentPost = posts[slug as keyof typeof posts];

  return (
    <Layout>
      <div className="bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center mb-6 text-sm font-medium transition-colors hover:text-blue-600">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all articles
            </Link>
            
            <div className={`rounded-lg p-6 mb-8 ${colors.bg}`}>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">{currentPost.title}</h1>
              
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <div className={`flex items-center gap-1 ${colors.text}`}>
                  <Calendar className="h-4 w-4" />
                  <span>{currentPost.date}</span>
                </div>
                <div className={`flex items-center gap-1 ${colors.text}`}>
                  <User className="h-4 w-4" />
                  <span>{currentPost.author}</span>
                </div>
              </div>
            </div>
            
            <div className="prose prose-blue max-w-none dark:prose-invert prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-700 dark:prose-p:text-slate-300">
              <div dangerouslySetInnerHTML={{ __html: currentPost.content }} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
