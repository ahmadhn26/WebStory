import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

// Stylised map: Surabaya Development Units
const SURABAYA_CENTER = { x: 400, y: 240 };
const HOTSPOTS = [
  { name: "Pusat Kota", x: 400, y: 240, risk: "High", color: "var(--color-danger)" },
  { name: "Surabaya Utara", x: 400, y: 150, risk: "Critical", color: "var(--color-danger)" },
  { name: "Surabaya Timur", x: 500, y: 240, risk: "High", color: "var(--color-coral)" },
  { name: "Surabaya Selatan", x: 400, y: 350, risk: "Medium", color: "var(--color-primary)" },
  { name: "Surabaya Barat", x: 300, y: 240, risk: "Medium", color: "var(--color-primary)" },
];

export function SurabayaMap() {
  return (
    <section className="bg-card/30 py-32 border-y border-border">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-danger">Babak 05 · Peta Emisi Plastik</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-foreground md:text-6xl">
            Kebocoran yang tak <span className="italic">dapat dibendung</span>.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Pemetaan Aquatic Plastic Emission di 12 unit pembangunan di Surabaya menunjukkan estimasi kebocoran plastik ke jalur perairan (ton/tahun). Peta ini mengidentifikasi hotspot kebocoran utama untuk dicarikan solusi yang efektif.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16 overflow-hidden rounded-md border border-border bg-background p-4">
            <svg viewBox="100 100 600 400" className="h-auto w-full" style={{ maxHeight: 560 }}>
              <defs>
                <radialGradient id="hotspotGlow" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="var(--color-danger)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--color-danger)" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Grid abstracting the city mapping */}
              {Array.from({ length: 12 }).map((_, i) => (
                <line key={`grid-h-${i}`} x1={150} y1={120 + i * 30} x2={650} y2={120 + i * 30} stroke="var(--color-border)" strokeOpacity={0.2} strokeDasharray="3 3"/>
              ))}
              {Array.from({ length: 18 }).map((_, i) => (
                <line key={`grid-v-${i}`} x1={150 + i * 30} y1={120} x2={150 + i * 30} y2={450} stroke="var(--color-border)" strokeOpacity={0.2} strokeDasharray="3 3"/>
              ))}

              {/* Hotpot nodes */}
              {HOTSPOTS.map((h, i) => {
                const isCritical = h.risk === "Critical";
                const isHigh = h.risk === "High";
                const rBase = isCritical ? 45 : isHigh ? 35 : 25;
                
                return (
                  <g key={`hotspot-${h.name}`}>
                    {/* Pulsing glow for critical ones */}
                    {isCritical && (
                      <motion.circle
                        cx={h.x} cy={h.y} r={rBase * 2}
                        fill="url(#hotspotGlow)"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    
                    <circle cx={h.x} cy={h.y} r={rBase} fill={h.color} fillOpacity={0.2} />
                    <circle cx={h.x} cy={h.y} r={rBase * 0.6} fill={h.color} fillOpacity={0.5} />
                    <circle cx={h.x} cy={h.y} r={6} fill={h.color} />

                    <text
                      x={h.x}
                      y={h.y - rBase - 15}
                      textAnchor="middle"
                      className="fill-foreground font-display"
                      fontSize="18"
                    >
                      {h.name}
                    </text>
                    <text
                      x={h.x}
                      y={h.y - rBase - 2}
                      textAnchor="middle"
                      className="font-mono text-xs"
                      fill={h.color}
                    >
                      {h.risk} Risk
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <p className="mt-4 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Hotspot Kebocoran Plastik Surabaya · Sumber: UNESCAP, 2023
          </p>
        </Reveal>
      </div>
    </section>
  );
}
