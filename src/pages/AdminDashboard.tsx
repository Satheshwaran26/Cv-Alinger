
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpenText, Edit, Eye, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { posts } from '@/utils/posts';

const AdminDashboard = () => {
  const postsCount = Object.keys(posts).length;
  const recentPosts = Object.entries(posts)
    .map(([slug, post]) => ({ slug, ...post }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Blog Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileText className="h-6 w-6 text-blue-500 mr-2" />
              <span className="text-3xl font-bold text-slate-900 dark:text-white">{postsCount}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Recent Posts</h2>
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {recentPosts.map((post) => (
            <div key={post.slug} className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">{post.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{post.date} • {post.author}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Link 
                  to={`/blog/${post.slug}`} 
                  className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View Post</span>
                </Link>
                <Link 
                  to={`/admin/posts/edit/${post.slug}`} 
                  className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit Post</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link 
          to="/admin/posts" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          <BookOpenText className="h-4 w-4 mr-1" />
          View All Blog Posts
        </Link>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
