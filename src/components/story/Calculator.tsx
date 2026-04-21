import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Reveal } from "./Reveal";
import { Trash, Droplet, Ghost } from "lucide-react";

function AnimatedNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value.toFixed(decimals)}
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -16, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block tabular-nums"
      >
        {value.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
      </motion.span>
    </AnimatePresence>
  );
}

export function Calculator() {
  // Default 0.7 kg = rata-rata harian warga Surabaya
  const [kgPerDay, setKgPerDay] = useState(0.7);

  const stats = useMemo(() => {
    const yearlyKg = kgPerDay * 365;
    const leaked = yearlyKg * 0.47; // 47% kebocoran
    const bags = Math.round(yearlyKg / 0.005); // 5 gram per kantong plastik
    const generations = 16; // 400 tahun penguraian / 25 tahun = 16 generasi
    return { yearlyKg, leaked, bags, generations };
  }, [kgPerDay]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-card/40 to-background py-32 md:py-48">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-danger">Babak 10 · Kalkulasi Pribadi</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-foreground md:text-6xl">
            Mari kita hitung <span className="italic">warisan plastik Anda</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 rounded-lg border border-border bg-card/60 p-8 backdrop-blur md:p-12">
            <div className="flex items-baseline justify-between">
              <label className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Konsumsi Plastik Per Hari
              </label>
              <p className="font-display text-6xl text-danger">
                <AnimatedNumber value={kgPerDay} decimals={1} />
                <span className="ml-2 font-mono text-base text-muted-foreground">kg</span>
              </p>
            </div>

            <div className="mt-8">
              <Slider
                value={[kgPerDay]}
                onValueChange={(v) => setKgPerDay(v[0])}
                min={0.1}
                max={3}
                step={0.1}
                className="[&_[data-slot=slider-range]]:bg-danger [&_[data-slot=slider-thumb]]:border-danger"
              />
              <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>0.1 kg</span>
                <span>Rata-Rata (0.7 kg)</span>
                <span>3.0 kg</span>
              </div>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Trash,
                  value: stats.yearlyKg,
                  decimals: 1,
                  label: "kg / tahun",
                  highlight: true,
                },
                { icon: Droplet, value: stats.leaked, decimals: 1, label: "kemungkinan bocor ke sungai" },
                { icon: Trash, value: stats.bags, decimals: 0, label: "setara kantong kresek" },
                { icon: Ghost, value: stats.generations, decimals: 0, label: "generasi mewarisi sampahmu" },
              ].map((s) => (
                <div
                  key={s.label}
                  className={`rounded-md border p-5 ${
                    s.highlight
                      ? "border-danger/40 bg-danger/5"
                      : "border-border bg-background/40"
                  }`}
                >
                  <s.icon
                    className={`h-5 w-5 ${s.highlight ? "text-danger" : "text-muted-foreground"}`}
                    strokeWidth={1.5}
                  />
                  <p
                    className={`mt-4 font-display text-4xl ${
                      s.highlight ? "text-danger" : "text-foreground"
                    }`}
                  >
                    <AnimatedNumber value={s.value} decimals={s.decimals} />
                  </p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
              Setiap kali indikator di atas dinaikkan, kita mewariskan lebih banyak jejak beracun bagi 16 generasi yang akan datang. (Asumsi 400 tahun plastik mengurai).
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
