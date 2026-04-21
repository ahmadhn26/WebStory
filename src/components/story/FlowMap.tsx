import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

// Stylised map: Southeast Asia nodes
// Data: Fish Production in Southeast Asia (2023)
const SEA_CENTER = { x: 400, y: 240 }; // Center roughly
const COUNTRIES = [
  { name: "Indonesia", x: 400, y: 350, vol: 21, rank: 1 },
  { name: "Vietnam", x: 250, y: 150, vol: 8, rank: 2 },
  { name: "Philippines", x: 550, y: 180, vol: 4, rank: 3 },
];

export function FlowMap() {
  const maxVol = Math.max(...COUNTRIES.map((c) => c.vol));

  return (
    <section className="bg-background py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Babak 03 · Pusat Produksi</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-foreground md:text-6xl">
            Lumbung <span className="italic">Asia Tenggara</span>.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Sebagai negara kepulauan, perairan Indonesia menjadi salah satu yang tersibuk di dunia. Indonesia memproduksi <span className="text-foreground font-medium">21 Juta Ton</span> ikan pada tahun 2023, jauh melampaui tetangganya. Angka yang fantastis ini berada di ujung tanduk krisis mikroplastik.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16 overflow-hidden rounded-md border border-border bg-card/40 p-4">
            <svg viewBox="100 100 600 400" className="h-auto w-full" style={{ maxHeight: 560 }}>
              {/* Nodes and halos */}
              {COUNTRIES.map((c, i) => {
                const radius = (c.vol / maxVol) * 60 + 20; // scale up to 80px
                return (
                  <g key={`node-${c.name}`}>
                    <circle cx={c.x} cy={c.y} r={radius} fill="var(--color-fish)" fillOpacity={0.15} />
                    <circle cx={c.x} cy={c.y} r={radius * 0.5} fill="var(--color-fish)" fillOpacity={0.3} />
                    <circle cx={c.x} cy={c.y} r={12} fill="var(--color-fish)" />
                    
                    <motion.circle
                      cx={c.x} cy={c.y} r={radius + 10}
                      fill="none" stroke="var(--color-fish)" strokeOpacity={0.5} strokeDasharray="4 4"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      style={{ originX: `${c.x}px`, originY: `${c.y}px` }}
                    />

                    <text
                      x={c.x}
                      y={c.y - radius - 20}
                      textAnchor="middle"
                      className="fill-foreground font-display"
                      fontSize="22"
                    >
                      {c.name}
                    </text>
                    <text
                      x={c.x}
                      y={c.y - radius - 5}
                      textAnchor="middle"
                      className="fill-muted-foreground font-mono"
                      fontSize="14"
                    >
                      {c.vol} Juta Ton (# {c.rank})
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <p className="mt-4 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Produksi Ikan Terbesar di Asia Tenggara · Sumber: ReportLinker, 2023
          </p>
        </Reveal>
      </div>
    </section>
  );
}
