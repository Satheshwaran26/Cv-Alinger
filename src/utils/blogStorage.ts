
// This file provides utilities for storing and retrieving blog posts
// that have been created through the admin interface

import { BlogPost } from './posts';

// Key for storing posts in localStorage
const LOCAL_STORAGE_KEY = 'custom_blog_posts';

// Get all custom posts from localStorage
export const getCustomPosts = (): Record<string, BlogPost> => {
  const storedPosts = localStorage.getItem(LOCAL_STORAGE_KEY);
  
  if (!storedPosts) {
    console.log("No custom posts found in localStorage");
    return {};
  }
  
  try {
    const parsedPosts = JSON.parse(storedPosts);
    console.log("Successfully retrieved custom posts:", Object.keys(parsedPosts));
    return parsedPosts;
  } catch (error) {
    console.error('Failed to parse stored blog posts:', error);
    return {};
  }
};

// Add or update a custom post
export const saveCustomPost = (slug: string, post: BlogPost): void => {
  if (!slug) {
    console.error("Cannot save post: Empty slug");
    return;
  }
  
  // Validate the post has required fields
  if (!post.title || !post.content || !post.author) {
    console.error("Cannot save post: Missing required fields", { slug, post });
    return;
  }
  
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
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPosts));
    console.log(`Successfully saved post "${post.title}" with slug "${slug}"`, updatedPosts);
    
    // Verify the post was saved correctly
    const verifyPosts = getCustomPosts();
    if (!verifyPosts[slug]) {
      console.error("Post saving verification failed - post not found after save");
    } else {
      console.log("Post saving verification successful");
    }
  } catch (error) {
    console.error("Error saving post to localStorage:", error);
  }
  
  // Force a refresh of localStorage to ensure data persists
  const backupPosts = JSON.stringify(updatedPosts);
  setTimeout(() => {
    // Double-check if the data is still there (localStorage can be flaky)
    const currentStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!currentStorage || currentStorage === "{}") {
      console.warn("localStorage data was lost, restoring from backup");
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, backupPosts);
      } catch (error) {
        console.error("Failed to restore backup posts:", error);
      }
    }
    
    const verifyPosts = getCustomPosts();
    console.log("Verification of saved posts:", verifyPosts);
    console.log("Post keys:", Object.keys(verifyPosts));
  }, 500);
};

// Delete a custom post
export const deleteCustomPost = (slug: string): void => {
  const currentPosts = getCustomPosts();
  
  // If the post doesn't exist, do nothing
  if (!currentPosts[slug]) {
    console.log(`Post with slug "${slug}" not found, cannot delete`);
    return;
  }
  
  // Remove the post
  delete currentPosts[slug];
  
  // Save back to localStorage
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentPosts));
    console.log(`Successfully deleted post with slug "${slug}"`);
  } catch (error) {
    console.error(`Error deleting post with slug "${slug}":`, error);
  }
};

// Debug function to check what posts are stored
export const debugStoredPosts = (): Record<string, BlogPost> => {
  try {
    const posts = getCustomPosts();
    console.log("Currently stored custom posts:", posts);
    console.log("Post slugs:", Object.keys(posts));
    console.log("localStorage size:", localStorage.getItem(LOCAL_STORAGE_KEY)?.length || 0, "bytes");
    return posts;
  } catch (error) {
    console.error("Error in debugStoredPosts:", error);
    return {};
  }
};

// Check if localStorage is available and working
export const checkLocalStorage = (): boolean => {
  try {
    const testKey = '_test_storage_';
    localStorage.setItem(testKey, 'test');
    const testValue = localStorage.getItem(testKey);
    localStorage.removeItem(testKey);
    
    const storageWorking = testValue === 'test';
    console.log("localStorage is working:", storageWorking);
    
    if (!storageWorking) {
      console.error("localStorage test failed - browser storage may be disabled");
    }
    
    return storageWorking;
  } catch (error) {
    console.error("localStorage is not available:", error);
    return false;
  }
};

