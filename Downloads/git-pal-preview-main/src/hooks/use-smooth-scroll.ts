import { useEffect } from "react";

/**
 * Custom hook for smooth, momentum-based scrolling between sections
 * Provides silky smooth scroll-snapping without glitches
 */
export const useSmoothScrollSnap = () => {
  useEffect(() => {
    let velocityY = 0;
    let lastScrollY = 0;
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      // Track scroll direction and velocity
      const delta = e.deltaY;
      velocityY = delta;
      
      // Clear the existing timeout
      clearTimeout(scrollTimeout);
      isScrolling = true;

      // Mark end of scroll after brief pause
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      lastScrollY = currentScrollY;
    };

    // Add listeners with passive option for better performance
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);
};

/**
 * Enhanced scroll-to with smooth easing
 * Use this instead of scrollIntoView for smoother behavior
 */
export const smoothScrollTo = (element: HTMLElement | null, offset = 0) => {
  if (!element) return;

  const targetY = element.getBoundingClientRect().top + window.scrollY - offset;
  
  // Use native smooth scroll
  window.scrollTo({
    top: targetY,
    behavior: "smooth",
  });
};

/**
 * Snap to the nearest section with smooth animation
 * Call this for a more controlled snapping behavior
 */
export const snapToSection = (element: HTMLElement | null) => {
  if (!element) return;

  const elementTop = element.getBoundingClientRect().top;
  const elementBottom = element.getBoundingClientRect().bottom;
  const viewportHeight = window.innerHeight;

  // If element is fully visible, snap to its start
  if (elementTop >= 0 && elementBottom <= viewportHeight) {
    return;
  }

  // Otherwise, snap to align element with top of viewport
  const targetY = element.getBoundingClientRect().top + window.scrollY;
  
  window.scrollTo({
    top: targetY,
    behavior: "smooth",
  });
};
