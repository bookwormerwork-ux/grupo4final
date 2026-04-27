import { ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";
import { buttonPressVariants, buttonPressTransition } from "@/lib/animations";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

/**
 * Animated button component with built-in hover/press animations
 */
export const AnimatedButton = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled = false,
  ...props
}: AnimatedButtonProps) => {
  const baseClasses = "rounded-lg font-medium transition-all duration-300 inline-flex items-center justify-center gap-2";

  const variantClasses = {
    primary: "bg-park-green text-white hover:shadow-lg hover:bg-park-green/90",
    secondary: "bg-white border border-neutral-200 text-neutral-900 hover:bg-neutral-50 hover:shadow-sm",
    ghost: "text-neutral-700 hover:bg-neutral-100",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const disabledClasses = disabled || isLoading ? "opacity-60 cursor-not-allowed" : "";

  return (
    <motion.button
      initial="initial"
      whileHover={disabled || isLoading ? "initial" : "hover"}
      whileTap={disabled || isLoading ? "initial" : "tap"}
      variants={buttonPressVariants}
      transition={buttonPressTransition}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      {...props}
    >
      {isLoading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-4 w-4 border-2 border-current border-t-transparent rounded-full"
        />
      )}
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
