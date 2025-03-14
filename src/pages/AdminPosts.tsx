
import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Edit, 
  Eye, 
  PlusCircle, 
  Search, 
  Trash2 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { posts } from '@/utils/posts';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { getCustomPosts, deleteCustomPost } from '@/utils/blogStorage';

interface PostWithMetadata {
  slug: string;
  title: string;
  date: string;
  author: string;
  content: string;
  categories?: string[];
  isCustom: boolean;
}

const AdminPosts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [allPosts, setAllPosts] = useState<PostWithMetadata[]>([]);
  const { toast } = useToast();
  
  // Load all posts (built-in and custom)
  useEffect(() => {
    // Get predefined posts
    const predefinedPosts = Object.entries(posts).map(([slug, post]) => ({
      slug,
      ...post,
      isCustom: false
    }));
    
    // Get custom posts
    const customPosts = getCustomPosts();
    const customPostsArray = Object.entries(customPosts).map(([slug, post]) => ({
      slug,
      ...post,
      isCustom: true
    }));
    
    // Combine both types of posts
    setAllPosts([...predefinedPosts, ...customPostsArray]);
  }, []);

  const filteredPosts = allPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClick = (slug: string) => {
    setPostToDelete(slug);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!postToDelete) return;
    
    // Only custom posts can be deleted
    const postToRemove = allPosts.find(post => post.slug === postToDelete);
    
    if (postToRemove && postToRemove.isCustom) {
      // Delete from localStorage
      deleteCustomPost(postToDelete);
      
      // Update the UI by removing the post from our state
      setAllPosts(allPosts.filter(post => post.slug !== postToDelete));
      
      toast({
        title: "Post deleted",
        description: "The post has been successfully deleted.",
      });
    } else {
      toast({
        title: "Cannot delete predefined post",
        description: "Only custom posts can be deleted.",
        variant: "destructive"
      });
    }
    
    setIsDeleteDialogOpen(false);
    setPostToDelete(null);
  };
  
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Blog Posts</h1>
        <Button asChild>
          <Link to="/admin/posts/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>
      
      <div className="mb-6 relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
        <Input
          placeholder="Search posts..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <TableRow key={post.slug}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {post.categories && post.categories.slice(0, 2).map((category) => (
                        <Badge key={category} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                      {post.categories && post.categories.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{post.categories.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={post.isCustom ? "default" : "secondary"} className="text-xs">
                      {post.isCustom ? "Custom" : "Predefined"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/blog/${post.slug}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/admin/posts/edit/${post.slug}`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteClick(post.slug)}
                        disabled={!post.isCustom}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-slate-500 dark:text-slate-400">
                  No posts found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminPosts;
