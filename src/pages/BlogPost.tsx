
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, BookOpenText } from 'lucide-react';
import { posts, colorPalette } from '@/utils/blogPosts';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const colors = slug && colorPalette[slug as keyof typeof colorPalette] 
    ? colorPalette[slug as keyof typeof colorPalette]
    : colorPalette['default'];
  
  const currentPost = slug && posts[slug as keyof typeof posts];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {currentPost ? (
          <div>
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
        ) : (
          <div className="text-center py-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
              <p className="mb-6">The article you're looking for doesn't exist or has been removed.</p>
              <Link to="/blog">
                <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to all articles
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BlogPost;
