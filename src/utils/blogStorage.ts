
// This file provides utilities for storing and retrieving blog posts
// that have been created through the admin interface

interface BlogPost {
  title: string;
  date: string;
  author: string;
  content: string;
  categories?: string[];
}

// Key for storing posts in localStorage
const LOCAL_STORAGE_KEY = 'custom_blog_posts';

// Get all custom posts from localStorage
export const getCustomPosts = (): Record<string, BlogPost> => {
  const storedPosts = localStorage.getItem(LOCAL_STORAGE_KEY);
  
  if (!storedPosts) {
    return {};
  }
  
  try {
    return JSON.parse(storedPosts);
  } catch (error) {
    console.error('Failed to parse stored blog posts:', error);
    return {};
  }
};

// Add or update a custom post
export const saveCustomPost = (slug: string, post: BlogPost): void => {
  const currentPosts = getCustomPosts();
  
  // Add/update the post with the given slug
  const updatedPosts = {
    ...currentPosts,
    [slug]: post
  };
  
  // Save back to localStorage
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPosts));
};

// Delete a custom post
export const deleteCustomPost = (slug: string): void => {
  const currentPosts = getCustomPosts();
  
  // If the post doesn't exist, do nothing
  if (!currentPosts[slug]) {
    return;
  }
  
  // Remove the post
  delete currentPosts[slug];
  
  // Save back to localStorage
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentPosts));
};
