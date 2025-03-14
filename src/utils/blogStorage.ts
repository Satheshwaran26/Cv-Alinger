
// This file provides utilities for storing and retrieving blog posts
// that have been created through the admin interface

import { BlogPost } from './posts';
import { validateSlug, checkLocalStorage } from '@/components/admin/BlogPostFormUtils';

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
  
  // Check if localStorage is available
  if (!checkLocalStorage()) {
    console.error("Cannot save post: localStorage is not available or not working");
    return;
  }
  
  // Normalize the slug to lowercase to avoid case sensitivity issues
  const normalizedSlug = slug.toLowerCase();
  console.log(`Normalizing slug from "${slug}" to "${normalizedSlug}"`);
  
  // Validate the slug format
  if (!validateSlug(normalizedSlug)) {
    console.error("Cannot save post: Invalid slug format", normalizedSlug);
    return;
  }
  
  // Validate the post has required fields
  if (!post.title || !post.content || !post.author) {
    console.error("Cannot save post: Missing required fields", { slug: normalizedSlug, post });
    return;
  }
  
  const currentPosts = getCustomPosts();
  
  // Ensure HTML formatting is preserved
  const processedContent = post.content;
  
  // Add/update the post with the given slug
  const updatedPosts = {
    ...currentPosts,
    [normalizedSlug]: {
      ...post,
      content: processedContent,
      // Generate a meta description from content if not provided (for SEO)
      metaDescription: post.metaDescription || processedContent.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
      // Generate keywords from categories if not provided (for SEO)
      keywords: post.keywords && post.keywords.length > 0 ? post.keywords : post.categories || []
    }
  };
  
  // Save back to localStorage
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPosts));
    console.log(`Successfully saved post "${post.title}" with slug "${normalizedSlug}"`, updatedPosts);
    
    // Verify the post was saved correctly
    const verifyPosts = getCustomPosts();
    if (!verifyPosts[normalizedSlug]) {
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
  const normalizedSlug = slug.toLowerCase();
  const currentPosts = getCustomPosts();
  
  // If the post doesn't exist, do nothing
  if (!currentPosts[normalizedSlug]) {
    console.log(`Post with slug "${normalizedSlug}" not found, cannot delete`);
    return;
  }
  
  // Remove the post
  delete currentPosts[normalizedSlug];
  
  // Save back to localStorage
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentPosts));
    console.log(`Successfully deleted post with slug "${normalizedSlug}"`);
  } catch (error) {
    console.error(`Error deleting post with slug "${normalizedSlug}":`, error);
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

// Check if localStorage is available and working - reusing the function from BlogPostFormUtils
