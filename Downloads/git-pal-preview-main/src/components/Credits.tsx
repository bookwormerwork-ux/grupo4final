import { motion } from "framer-motion";
import { Github, Mail, MapPin } from "lucide-react";

type Member = {
  name: string;
  role: string;
  emoji: string;
  description: string;
};

// =====================================================================
// ✏️  EDIT HERE — Team members (name, role, emoji avatar, description)
// Add / remove / reorder freely. The grid auto-adjusts.
// =====================================================================
const members: Member[] = [
  {
    name: "MC",
    role: "Cartografía & Mapa",
    emoji: "🗺️",
    description:
      "Diseñó e integró el mapa interactivo de Pinar de Chamartín: selección de proveedor de tiles, definición de las áreas destacadas (parques y colegio) y el comportamiento de zoom, paneo y resaltado al pasar el cursor.",
  },
  {
    name: "MV",
    role: "Interfaz & Código UI",
    emoji: "🎨",
    description:
      "Construyó toda la interfaz en React + Tailwind: hero con globo terráqueo, navegación, tarjetas glass, animaciones con Framer Motion y el sistema de diseño responsive que une todas las pantallas. Encargado del servidor de la web y la integración con el backend para mostrar los datos en tiempo real.",
  },
  {
    name: "SL",
    role: "Backend & Datos en vivo",
    emoji: "⚙️",
    description:
      "Implementó la capa de backend: endpoints, lectura de sensores, normalización de las métricas y la entrega de los datos que alimentan los popups y la página de detalle.",
  },
  {
    name: "MU",
    role: "Datos & Geolocalización",
    emoji: "📍",
    description:
      "Recopiló y posicionó cada punto sobre el mapa: coordenadas exactas, radios de influencia y verificación en campo de los parques y del Colegio Madrid – FSM para que la información coincida con la realidad.",
  },
];
// =====================================================================
// ✏️  END EDIT HERE — team members
// =====================================================================

const Credits = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0b1d3a] via-[#0a0a0a] to-[#072116] px-6 py-24 text-white">
      {/* Decorative blobs for the glass to refract */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-park-green/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-accent-amber/25 blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 bottom-1/3 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="glass-dark rounded-2xl px-6 py-3 text-xs uppercase tracking-[0.3em] text-white/80"
        >
          Créditos
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-6 text-center font-bold leading-tight"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Grupo 4 · Digitalizando el Medio Ambiente
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-5 max-w-2xl text-center text-white/70"
        >
          Un proyecto de monitorización ambiental en Pinar de Chamartín.
          Datos abiertos, sensores y mapas para entender mejor nuestro entorno. Se usó la ayuda de IA para depurar código y optimizar el uso en dispositivos móviles. 
        </motion.p>

        {/* Team grid */}
        <div className="mt-14 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="glass-dark glass-hover flex flex-col items-center rounded-2xl p-6 text-center"
            >
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-3xl"
                aria-hidden
              >
                {m.emoji}
              </div>
              <div className="text-base font-semibold">{m.name}</div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-accent-amber">
                {m.role}
              </div>
              <p className="mt-3 text-[12.5px] leading-relaxed text-white/70">
                {m.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ============================================================
            ✏️  EDIT HERE — Contact / location / GitHub link
        ============================================================ */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.2,
              },
            },
          }}
          className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <motion.div
            variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass-dark glass-hover rounded-2xl p-5 transition-all duration-300"
          >
            <MapPin className="h-5 w-5 text-park-green" />
            <div className="mt-3 text-xs uppercase tracking-wider text-white/50">
              Ubicación
            </div>
            <div className="mt-1 text-sm">Pinar de Chamartín, Madrid</div>
          </motion.div>
          <motion.div
            variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass-dark glass-hover rounded-2xl p-5 transition-all duration-300"
          >
            <Mail className="h-5 w-5 text-accent-amber" />
            <div className="mt-3 text-xs uppercase tracking-wider text-white/50">
              Contacto
            </div>
            <div className="mt-1 text-sm">bach@cm-fsm.es</div>
          </motion.div>
          <motion.div
            variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass-dark glass-hover rounded-2xl p-5 transition-all duration-300"
          >
            <Github className="h-5 w-5 text-white/80" />
            <div className="mt-3 text-xs uppercase tracking-wider text-white/50">
              Código
            </div>
            <div className="mt-1 text-sm">github.com/bookwormerwork-ux/git-pal-preview</div>
          </motion.div>
        </motion.div>
        {/* ============================================================
            ✏️  END EDIT HERE — contact info
        ============================================================ */}

        <div className="mt-16 text-center text-[12px] uppercase tracking-[0.25em] text-white/40">
          © {new Date().getFullYear()} Grupo 4 · Hecho en Colegio Madrid
        </div>
      </div>
    </section>
  );
};

export default Credits;
