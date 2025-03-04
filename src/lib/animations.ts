
/**
 * Smooth intersection observer utility for animations
 */
export const setupIntersectionObserver = (
  elements: string, 
  animationClass: string, 
  threshold = 0.1, 
  rootMargin = '0px'
) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
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
    setTimeout(() => {
      child.classList.add(animationClass);
    }, index * staggerDelay);
  });
};
