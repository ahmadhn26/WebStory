import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

// Siklus Mikroplastik
const segments = [
  { label: "Konsumsi Plastik", step: 1, color: "var(--color-plastic)" },
  { label: "Salah Kelola", step: 1, color: "var(--color-danger)" },
  { label: "Pecah di Samudra", step: 1, color: "var(--color-water)" },
  { label: "Rantai Makanan", step: 1, color: "var(--color-fish)" },
  { label: "Tubuh Manusia", step: 1, color: "var(--color-coral)" },
];

const TOTAL = 5;
const RADIUS = 140;
const STROKE = 60;
const CIRC = 2 * Math.PI * RADIUS;

export function HealthImpact() {
  let cumulative = 0;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-card/40 to-background py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Babak 09 · Lingkaran Setan</p>
          <h2 className="mt-4 max-w-4xl font-display text-4xl leading-tight text-foreground md:text-7xl">
            Plastik yang kita buang <span className="italic text-gradient-blood">meracuni piring kita sendiri</span>.
          </h2>
        </Reveal>

        <div className="mt-20 grid items-center gap-16 md:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <motion.svg
                viewBox="-180 -180 360 360"
                className="h-full w-full -rotate-90"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* track */}
                <circle r={RADIUS} fill="none" stroke="var(--color-border)" strokeWidth={STROKE} opacity={0.3} />

                {segments.map((s, i) => {
                  const length = (s.step / TOTAL) * CIRC;
                  const offset = (cumulative / TOTAL) * CIRC;
                  cumulative += s.step;
                  return (
                    <motion.circle
                      key={s.label}
                      r={RADIUS}
                      fill="none"
                      stroke={s.color}
                      strokeWidth={STROKE}
                      strokeDasharray={`${length} ${CIRC}`}
                      initial={{ strokeDashoffset: -offset, opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4 + i * 0.25 }}
                      style={{ strokeDashoffset: -offset }}
                    />
                  );
                })}
              </motion.svg>

              {/* center label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-danger">Bahaya Abadi</p>
                <p className="mt-1 font-display text-5xl text-foreground">Siklus</p>
                <p className="text-xs text-muted-foreground mt-2">Mikroplastik</p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-4">
            {segments.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
                className={`flex items-baseline justify-between border-b border-border pb-3 ${
                  s.label === "Tubuh Manusia" ? "text-danger" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <span
                    className={`font-display text-2xl ${
                      s.label === "Tubuh Manusia" ? "text-danger" : "text-foreground"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                <span className="font-mono text-xl text-muted-foreground">
                  ►
                </span>
              </motion.div>
            ))}
            <Reveal delay={1}>
              <p className="pt-4 text-sm leading-relaxed text-muted-foreground">
                Siklus ini merupakan ancaman serius. Ketika mikroplastik masuk ke dalam tubuh manusia, ia dapat memicu berbagai penyakit seperti <strong>Allergic Inflammation, Kanker, dan Autoimun</strong>. Kita sedang meracuni sumur kehidupan kita sendiri. (Bhuyan, 2022)
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
