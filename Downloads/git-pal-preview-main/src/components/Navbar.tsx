import { motion, MotionValue, useTransform } from "framer-motion";
import { buttonPressVariants, buttonPressTransition } from "@/lib/animations";

interface NavbarProps {
  scrollY: MotionValue<number>;
  onMapClick: () => void;
}

const Navbar = ({ scrollY, onMapClick }: NavbarProps) => {
  const bgOpacity = useTransform(scrollY, [400, 700], [0, 0.6]);
  const borderOpacity = useTransform(scrollY, [400, 700], [0, 0.18]);
  const blurPx = useTransform(scrollY, [400, 700], [0, 16]);
  const saturate = useTransform(scrollY, [400, 700], [100, 180]);
  const textColor = useTransform(scrollY, [400, 700], ["#ffffff", "#0a0a0a"]);
  const bg = useTransform(bgOpacity, (v) => `rgba(255,255,255,${v})`);
  const border = useTransform(borderOpacity, (v) => `1px solid rgba(255,255,255,${v})`);
  const backdrop = useTransform([blurPx, saturate], ([b, s]: number[]) => `blur(${b}px) saturate(${s}%)`);

  return (
    <motion.header
      style={{
        background: bg,
        borderBottom: border,
        backdropFilter: backdrop,
        WebkitBackdropFilter: backdrop,
      }}
      className="fixed inset-x-0 top-0 z-50 h-14"
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <motion.div
          style={{ color: textColor }}
          className="text-sm font-semibold uppercase tracking-[0.18em]"
        >
          G4 · Medio Ambiente
        </motion.div>
        <motion.button
          onClick={onMapClick}
          style={{ color: textColor, borderColor: "rgba(125,125,125,0.25)" }}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          variants={buttonPressVariants}
          transition={buttonPressTransition}
          className="rounded-lg border px-4 py-1.5 text-sm font-medium transition-all duration-300 ease-smooth hover:bg-park-green hover:text-white hover:border-park-green hover:shadow-lg"
        >
          Mapa
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Navbar;
