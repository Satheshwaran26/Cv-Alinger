
// Utility functions for the blog post form

export const generateSlug = (title: string): string => {
  if (!title) {
    console.error("Cannot generate slug: Empty title");
    return "";
  }
  
  const slug = title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
    
  console.log(`Generated slug from title "${title}": "${slug}"`);
  return slug;
};

// Debug functions to help diagnose blog post issues
export const validateSlug = (slug: string): boolean => {
  // Check if the slug is valid (not empty and properly formatted)
  const isValid = !!slug && /^[a-z0-9-]+$/.test(slug);
  console.log(`Validating slug "${slug}": ${isValid ? 'VALID' : 'INVALID'}`);
  return isValid;
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
  
  // Detailed debug for local storage
  try {
    const localStorageWorks = checkLocalStorage();
    console.log('Local storage working:', localStorageWorks);
    if (!localStorageWorks) {
      console.error('WARNING: Local storage is not working properly. Custom posts cannot be saved.');
    }
  } catch (error) {
    console.error('Local storage check failed:', error);
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
