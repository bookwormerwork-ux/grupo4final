import { ReactNode } from "react";
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "@/lib/animations";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps page content to provide smooth entrance/exit animations
 * Use this to wrap your entire page content for polished transitions
 */
export const PageTransition = ({ children, className = "" }: PageTransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
