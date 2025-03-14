
// This file provides utilities for storing and retrieving blog posts
// that have been created through the admin interface

import { BlogPost } from './posts';

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
    [slug]: {
      ...post,
      // Generate a meta description from content if not provided (for SEO)
      metaDescription: post.metaDescription || post.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
      // Generate keywords from categories if not provided (for SEO)
      keywords: post.keywords || post.categories || []
    }
  };
  
  // Save back to localStorage
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPosts));
  console.log(`Saved post "${post.title}" with slug "${slug}"`, updatedPosts);
  
  // Force a refresh of localStorage to ensure data persists
  const backupPosts = JSON.stringify(updatedPosts);
  setTimeout(() => {
    // Double-check if the data is still there (localStorage can be flaky)
    const currentStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!currentStorage || currentStorage === "{}") {
      console.warn("localStorage data was lost, restoring from backup");
      localStorage.setItem(LOCAL_STORAGE_KEY, backupPosts);
    }
    
    const verifyPosts = getCustomPosts();
    console.log("Verification of saved posts:", verifyPosts);
  }, 500);
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

// Debug function to check what posts are stored
export const debugStoredPosts = (): Record<string, BlogPost> => {
  const posts = getCustomPosts();
  console.log("Currently stored custom posts:", posts);
  return posts;
};
