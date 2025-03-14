
// Utility functions for the blog post form

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

// Debug functions to help diagnose blog post issues
export const validateSlug = (slug: string): boolean => {
  // Check if the slug is valid (not empty and properly formatted)
  return !!slug && /^[a-z0-9-]+$/.test(slug);
};

export const debugBlogPost = (slug: string, postData: any): void => {
  console.log('Blog Post Debug Info:');
  console.log('Slug:', slug);
  console.log('Title:', postData.title);
  console.log('Slug validation:', validateSlug(slug));
  console.log('Content length:', postData.content?.length || 0);
  console.log('Categories:', postData.categories);
  console.log('Keywords:', postData.keywords);
  console.log('Date:', postData.date);
};

