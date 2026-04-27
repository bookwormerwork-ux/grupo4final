import { useEffect, useRef, useState } from "react";
import { useScroll, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import MapView from "@/components/MapView";
import Credits from "@/components/Credits";
import ScrollProgress from "@/components/ScrollProgress";
import CommandPalette from "@/components/CommandPalette";
import { slideUpVariants, slideUpTransition, hoverLiftVariants, hoverLiftTransition } from "@/lib/animations";
import { useSmoothScrollSnap, smoothScrollTo } from "@/hooks/use-smooth-scroll";

const Index = () => {
  const { scrollY } = useScroll();
  const [interactive, setInteractive] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const creditsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Initialize smooth scroll snap behavior
  useSmoothScrollSnap();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => {
      setInteractive(v > 620);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const scrollToHero = () => smoothScrollTo(heroRef.current, 0);
  const scrollToMap = () => smoothScrollTo(mapRef.current, 0);
  const scrollToCredits = () => smoothScrollTo(creditsRef.current, 0);

  return (
    <div className="relative bg-background">
      <Navbar scrollY={scrollY} onMapClick={scrollToMap} />
      <Hero scrollY={scrollY} />

      <ScrollProgress
        scrollY={scrollY}
        sections={[
          { id: "hero", label: "Inicio", scrollTo: scrollToHero },
          { id: "map", label: "Mapa", scrollTo: scrollToMap },
          { id: "credits", label: "Créditos", scrollTo: scrollToCredits },
        ]}
      />

      <CommandPalette
        onJumpToHero={scrollToHero}
        onJumpToMap={scrollToMap}
        onJumpToCredits={scrollToCredits}
      />

      {/* Hero anchor + spacer that drives scroll for the hero */}
      <div ref={heroRef} className="h-screen" data-scroll-section aria-hidden />

      {/* Map section */}
      <section
        ref={mapRef}
        className="relative h-screen w-full"
        data-scroll-section
        style={{ background: "#f8f9fa" }}
      >
        <MapView enableInteraction={interactive} />

        {/* Glass exit button — leads to credits */}
        <motion.button
          onClick={scrollToCredits}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          variants={hoverLiftVariants}
          transition={hoverLiftTransition}
          className="glass glass-hover group absolute bottom-6 left-1/2 z-[1100] flex -translate-x-1/2 items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:shadow-lg"
          aria-label="Salir del mapa y ver créditos"
        >
          <span>Salir del mapa</span>
          <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
        </motion.button>
      </section>

      {/* Credits section */}
      <div ref={creditsRef} data-scroll-section>
        <Credits />
      </div>
    </div>
  );
};

export default Index;
