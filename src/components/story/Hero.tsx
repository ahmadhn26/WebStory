import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero-ocean.png";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden grain">
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <img
          src={heroImg}
          alt="Ocean surface littered with invisible plastic"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        <div className="absolute inset-0 vignette" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          Visualisasi Data dan Informasi · Kelompok 2 3SD2
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mt-8 max-w-5xl font-display text-5xl font-light leading-[1.05] text-balance text-foreground sm:text-7xl md:text-[5.5rem]"
        >
          IKAN RASA PLASTIK?
          <br />
          <span className="italic text-gradient-blood">Save Our Marine Life</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Pada tahun 2025, diperkirakan  <span className="font-medium text-foreground">16,02 juta ton</span> sampah masuk ke perairan Indonesia. Bila dibandingkan, angka tersebut setara dengan berat <span className="font-medium text-foreground">4,5 juta ekor gajah Afrika Jantan.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
          <ChevronDown className="h-5 w-5 animate-bounce text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
