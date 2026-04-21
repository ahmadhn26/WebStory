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
          Sebuah Krisis Tersembunyi · Indonesia 2024
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mt-8 max-w-5xl font-display text-5xl font-light leading-[1.05] text-balance text-foreground sm:text-7xl md:text-[5.5rem]"
        >
          Apakah lautan kita masih hidup…
          <br />
          <span className="italic text-gradient-blood">atau tenggelam dalam lautan plastik?</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Hanya pada tahun 2022, Indonesia melepaskan sekitar <span className="font-medium text-foreground">398.000 ton</span> plastik ke laut—setara dengan berat <span className="font-medium text-foreground">57.000 gajah Afrika</span>. Laut perlahan menjadi ruang senyap bagi kehidupan, dan tempat pembuangan abadi bagi keserakahan kita.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Gulir
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
