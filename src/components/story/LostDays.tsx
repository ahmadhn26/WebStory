import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

// Minimal 2 jam/hari × 5 hari × 52 minggu = 520 jam/tahun ÷ 24 = ~22 hari
// Batas minimum: 60 menit/arah × 2 (PP), BPS Tabel 16, 2023
const TOTAL = 365;
const LOST = 22;

export function LostDays() {
  // Distribute lost days roughly evenly through the year
  const lostSet = new Set<number>();
  const step = TOTAL / LOST;
  for (let i = 0; i < LOST; i++) lostSet.add(Math.floor(i * step + 3));

  return (
    <section className="bg-background py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Babak 06 · Harga Yang Dibayar</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-foreground md:text-6xl">
            Puluhan lembar kalender yang robek <br />
            hanya karena terbakar <span className="italic text-gradient-blood">di jalan</span>.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Tiga ribu tetes keringat untuk setiap satu jam terjebak lalu lintas. Dalam kalkulasi minimum 2 jam tiap harinya merayap di jalan selama setahun, sejatinya ada {" "}
            <span className="text-foreground font-medium">~22 hari penuh (minimum)</span> yang hilang tanpa ampun dimakan asap. Titik gelap di tengah kalender kehidupan ini membisu tanpa kompromi.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16 grid grid-cols-[repeat(auto-fill,minmax(14px,1fr))] gap-[3px] md:gap-1">
            {Array.from({ length: TOTAL }).map((_, i) => {
              const lost = lostSet.has(i);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: Math.min(i * 0.002, 1.5),
                  }}
                  className="aspect-square rounded-[2px]"
                  style={{
                    backgroundColor: lost ? "var(--color-blood)" : "var(--color-muted)",
                    opacity: lost ? 1 : 0.7,
                    boxShadow: lost ? "0 0 8px var(--color-blood)" : undefined,
                  }}
                  title={`Day ${i + 1}${lost ? " — lost to commute" : ""}`}
                />
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-6">
            <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-muted opacity-70" />
                <span className="ml-2 font-mono text-xs tracking-widest text-muted-foreground uppercase">
                  Hari kehidupan
                </span>
              </span>
              <div className="flex items-center">
                <div className="mr-2 h-4 w-4 bg-primary" />
                <span className="ml-2 font-mono text-xs tracking-widest text-muted-foreground uppercase">
                  Hilang di jalan
                </span>
              </div>
            </div>
            <p className="font-display text-2xl text-foreground">
              22 / 365 hari · <span className="text-primary">min. ~6%</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
