
/**
 * Smooth intersection observer utility for animations
 */
export const setupIntersectionObserver = (
  elements: string, 
  animationClass: string, 
  threshold = 0.1, 
  rootMargin = '0px'
) => {
  // Create a basic observer for any element type
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Make element visible immediately to prevent disappearing
        if (!entry.target.classList.contains(animationClass)) {
          entry.target.classList.add(animationClass);
        }
      });
    },
    {
      threshold,
      rootMargin,
    }
  );

  // Observe all elements that match the selector
  setTimeout(() => {
    document.querySelectorAll(elements).forEach((el) => {
      observer.observe(el);
    });
  }, 100);

  // Return the observer for cleanup
  return observer;
};

/**
 * Staggered animation helper for lists
 */
export const staggeredAnimation = (
  parentSelector: string, 
  childSelector: string, 
  animationClass: string, 
  staggerDelay = 100
) => {
  const parent = document.querySelector(parentSelector);
  if (!parent) return;
  
  const children = parent.querySelectorAll(childSelector);
  children.forEach((child, index) => {
    // Make elements immediately visible
    child.classList.add(animationClass);
  });
};
