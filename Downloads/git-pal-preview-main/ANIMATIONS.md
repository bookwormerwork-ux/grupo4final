# Animation System Guide

This project now includes a comprehensive animation system inspired by Lovable's polished, smooth interactions. Here's how to use it:

## 📦 What Was Added

### 1. **Animation Utilities** (`src/lib/animations.ts`)
Contains reusable animation variants and easing curves for consistent, premium animations throughout the app.

### 2. **PageTransition Component** (`src/components/PageTransition.tsx`)
Wraps pages for smooth entrance/exit animations when navigating between routes.

### 3. **AnimatedButton Component** (`src/components/AnimatedButton.tsx`)
A pre-configured button component with built-in hover/press animations and loading states.

### 4. **Enhanced Components**
- **Navbar**: Added button press animations with better hover feedback
- **Index/Home Page**: Enhanced exit button with lift effect
- **Detail Page**: Added staggered animations to stat cards and better button interactions
- **Credits Section**: Contact cards now animate with staggered entrance

## 🎨 Using Animations

### Basic Fade-In Animation
```tsx
import { motion } from "framer-motion";
import { fadeInVariants, fadeInTransition } from "@/lib/animations";

export const MyComponent = () => (
  <motion.div
    initial="initial"
    animate="animate"
    variants={fadeInVariants}
    transition={fadeInTransition}
  >
    Your content here
  </motion.div>
);
```

### Staggered List Animation
```tsx
import { staggerContainerVariants, staggerItemVariants, staggerItemTransition } from "@/lib/animations";

export const MyList = ({ items }) => (
  <motion.ul
    initial="initial"
    animate="animate"
    variants={staggerContainerVariants}
  >
    {items.map((item) => (
      <motion.li
        key={item.id}
        variants={staggerItemVariants}
        transition={staggerItemTransition}
      >
        {item.name}
      </motion.li>
    ))}
  </motion.ul>
);
```

### Hover Lift Effect (for cards)
```tsx
import { hoverLiftVariants, hoverLiftTransition } from "@/lib/animations";

export const Card = () => (
  <motion.div
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    variants={hoverLiftVariants}
    transition={hoverLiftTransition}
    className="bg-white rounded-lg p-6 cursor-pointer"
  >
    Card content
  </motion.div>
);
```

### Button Press Animation
```tsx
import { buttonPressVariants, buttonPressTransition } from "@/lib/animations";

export const AnimatedButtonExample = () => (
  <motion.button
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    variants={buttonPressVariants}
    transition={buttonPressTransition}
  >
    Click me
  </motion.button>
);
```

### Using the AnimatedButton Component
```tsx
import { AnimatedButton } from "@/components/AnimatedButton";

export const MyForm = () => (
  <AnimatedButton
    variant="primary"
    size="md"
    onClick={handleSubmit}
  >
    Submit Form
  </AnimatedButton>
);
```

## 🌟 Available Animation Patterns

### Entrance Animations
- `fadeInVariants` - Simple opacity fade
- `scaleInVariants` - Fade with scale (0.92 → 1)
- `slideUpVariants` - Fade with upward movement
- `slideInLeftVariants` - Slide from left
- `slideInRightVariants` - Slide from right

### Interactive Animations
- `hoverLiftVariants` - Lifts on hover (y: -4px)
- `buttonPressVariants` - Scales on press (1.02 on hover, 0.98 on tap)

### List Animations
- `staggerContainerVariants` - Container for staggered children
- `staggerItemVariants` - Individual items that stagger

### Loading/Status Animations
- `pulseVariants` - Pulsing opacity (for loading states)
- `rotateVariants` - 360° rotation (for spinners)

### Modal/Dialog Animations
- `modalVariants` - Scale + fade entrance
- `backdropVariants` - Backdrop fade
- `tooltipVariants` - Small scale tooltip animation
- `toastVariants` - Toast notification animation

## 🎯 Easing Curves

All animations use premium easing curves:

```tsx
const EASING = {
  smooth: [0.22, 1, 0.36, 1],      // Smooth, polished feel
  easeOut: [0.22, 1, 0.36, 1],      // Exits with deceleration
  easeIn: [0.4, 0, 0.2, 1],         // Enters with acceleration
  easeInOut: [0.4, 0, 0.2, 1],      // Symmetric
  bounce: [0.175, 0.885, 0.32, 1.275], // Bouncy feel
  elastic: [0.68, -0.55, 0.265, 1.55], // Elastic spring
};
```

## ⚡ Performance Tips

1. **Use `layout` prop sparingly** - It can be performance-intensive
2. **Prefer `opacity` and `transform`** - These properties animate smoothly
3. **Keep animations short** - 0.3-0.5s for most interactions
4. **Use `exit` animations** - Wrap pages with `<AnimatePresence>`
5. **Respect `prefers-reduced-motion`** - Use `useReducedMotion()` hook

## 🔗 Example Usage in Real Component

```tsx
import { motion } from "framer-motion";
import { staggerContainerVariants, staggerItemVariants, staggerItemTransition } from "@/lib/animations";

export const LocationCard = ({ locations }) => (
  <motion.div
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, amount: 0.3 }}
    variants={staggerContainerVariants}
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
  >
    {locations.map((loc) => (
      <motion.div
        key={loc.id}
        variants={staggerItemVariants}
        transition={staggerItemTransition}
        className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg"
      >
        <h3>{loc.name}</h3>
        <p>{loc.description}</p>
      </motion.div>
    ))}
  </motion.div>
);
```

## 📚 Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Animation Principles](https://www.framer.com/motion/animation-principles/)
- [Variants Guide](https://www.framer.com/motion/variants/)

## 💡 Next Steps

To enhance your project further:

1. **Add Scroll Animations** - Use `whileInView` to trigger animations on scroll
2. **Gesture Animations** - Add `whileDrag` for draggable elements
3. **Page Transitions** - Customize transitions between routes with Framer Motion
4. **Micro-interactions** - Add animations to form inputs, checkboxes, etc.
5. **Loading States** - Use spinner/pulse animations while fetching data

Happy animating! 🎬
