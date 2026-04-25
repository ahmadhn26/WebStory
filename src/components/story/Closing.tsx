import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import skylineImg from "@/assets/hero-ocean.png";

export function Closing() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.7, 0.7, 0.3]);

  return (
    <section ref={ref} className="relative h-[110vh] w-full overflow-hidden grain">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <img
          src={skylineImg}
          alt="Deep ocean surface"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      </motion.div>

      <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-mono text-xs uppercase tracking-[0.4em] text-primary"
        >
          Epilog
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="mt-10 font-display text-3xl font-light leading-[1.15] text-foreground text-balance sm:text-5xl md:text-6xl"
        >
          Kita belum terlambat. <br />
          <span className="italic text-gradient-blood">Lindungi lautan, lindungi diri Anda sendiri.</span>
        </motion.h2>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.8 }}
           className="mt-16 flex flex-col items-center gap-6 text-center"
        >
          <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase opacity-80">Langkah Rekomendasi</p>
          <ul className="space-y-4 font-sans text-sm md:text-base text-muted-foreground/80 max-w-md">
            <li>1. Perluas pengumpulan sampah primer di sumbernya.</li>
            <li>2. Tingkatkan daur ulang plastik secara komprehensif.</li>
            <li>3. Bersihkan sistem drainase secara rutin dari sumbatan.</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1 }}
          className="mt-16 h-px w-32 origin-left bg-primary"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="mt-16 max-w-2xl font-display text-2xl italic leading-relaxed text-muted-foreground sm:text-3xl"
        >
          Keputusan keliru hari ini akan ditanggung oleh laut. <br />
          Dan apa yang ditanggung laut, <br className="md:hidden" />
          <span className="text-danger italic font-medium">akan meracuni piring anak cucu kita</span>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-10 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
        >
          Sebuah cerita data · Krisis Plastik Indonesia · 2024
        </motion.p>
      </div>
    </section>
  );
}
