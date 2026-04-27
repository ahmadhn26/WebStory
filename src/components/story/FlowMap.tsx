import { useState, useCallback, memo, useRef } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { Reveal } from "./Reveal";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Data Produksi Ikan Nasional — Negara Asia Tenggara (Ton)
const SEA_DATA: Record<string, { fish: number; iso: string }> = {
  Indonesia:   { fish: 21_800_000, iso: "360" },
  Vietnam:     { fish:  8_786_589, iso: "704" },
  Philippines: { fish:  4_014_862, iso: "608" },
  Thailand:    { fish:  2_308_267, iso: "764" },
  Myanmar:     { fish:  2_215_443, iso: "104" },
  Malaysia:    { fish:  1_787_174, iso: "458" },
  Cambodia:    { fish:    892_752, iso: "116" },
  Laos:        { fish:    213_150, iso: "418" },
  Brunei:      { fish:     22_370, iso: "096" },
  Singapore:   { fish:      7_096, iso: "702" },
};

const ISO_TO_NAME: Record<string, string> = Object.fromEntries(
  Object.entries(SEA_DATA).map(([name, d]) => [d.iso, name])
);
const SEA_ISO_SET = new Set(Object.values(SEA_DATA).map((d) => d.iso));
const MAX_FISH = Math.max(...Object.values(SEA_DATA).map((d) => d.fish));

function formatTon(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)} Juta Ton`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)} Ribu Ton`;
  return `${n} Ton`;
}

function getChoroplethColor(fish: number): string {
  const t = fish / MAX_FISH;
  if (t > 0.85) return "#d74f3e"; // Sangat Tinggi (Merah bata / Coral tua)
  if (t > 0.65) return "#ee734a"; // Tinggi
  if (t > 0.40) return "#fa9560"; // Sedang
  if (t > 0.20) return "#febb7f"; // Rendah
  if (t > 0.08) return "#ffd7a5"; // Sangat Rendah
  return               "#ffebd1"; // Minimal (Peach pucat)
}

interface TooltipCb {
  onMouseMove: (name: string, fish: number, e: React.MouseEvent<SVGPathElement>) => void;
  onMouseLeave: () => void;
}

// ─── Map layer memoised: TIDAK re-render saat tooltip state berubah ──────────
const MapLayer = memo(function MapLayer({ onMouseMove, onMouseLeave }: TooltipCb) {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ scale: 700, center: [113, 5] }}
      style={{ width: "100%", height: "520px" }}
    >
      <Geographies geography={GEO_URL}>
        {({ geographies }: { geographies: any[] }) =>
          geographies.map((geo: any) => {
            const isoNum = String(geo.id);
            const inSEA  = SEA_ISO_SET.has(isoNum);
            const name   = ISO_TO_NAME[isoNum];
            const data   = name ? SEA_DATA[name] : undefined;

            const baseFill = inSEA && data
              ? getChoroplethColor(data.fish)
              : "#f1f5f9"; // Background color untuk negara bukan SEA (slate-100)

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={baseFill}
                stroke="#cbd5e1" // slate-300
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { 
                    outline: "none", 
                    cursor: inSEA ? "pointer" : "default" 
                  },
                  pressed: { outline: "none" },
                }}
                onMouseMove={
                  inSEA && name && data
                    ? (e: React.MouseEvent<SVGPathElement>) => onMouseMove(name, data.fish, e)
                    : undefined
                }
                onMouseLeave={inSEA ? onMouseLeave : undefined}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
});
// ─────────────────────────────────────────────────────────────────────────────

interface Tooltip { name: string; fish: number }

export function FlowMap() {
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Stable callbacks — tidak berubah antar render → MapLayer tidak re-render
  const handleMouseMove = useCallback(
    (name: string, fish: number, e: React.MouseEvent<SVGPathElement>) => {
      // Batalkan penghapusan tooltip jika masuk/gerak di negara valid
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      const svg  = e.currentTarget.closest("svg");
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      
      // Update motion values directly without causing re-renders (60fps mulus)
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
      
      // Gunakan prev state check agar tidak merender ulang jika negaranya masih sama
      // Ini juga me-recover tooltip secara instan jika sempat hilang karena onMouseLeave negara sebelumnya
      setTooltip(prev => (prev?.name === name ? prev : { name, fish }));
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setTooltip(null);
    }, 50); // 50ms delay to prevent flickering between borders
  }, []);

  const ranked = Object.entries(SEA_DATA).sort((a, b) => b[1].fish - a[1].fish);

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            Bagian 03 · Potensi Sumber Daya Laut
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-foreground md:text-6xl">
            Produksi Ikan di <span className="italic text-primary">Asia Tenggara</span>.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Sebagai negara kepulauan, Indonesia memiliki peran vital dalam penyediaan pangan laut di kawasan ini. Dengan total produksi mencapai <span className="text-foreground font-medium">21,8 juta ton</span>, Indonesia memimpin sebagai produsen ikan terbesar di ASEAN.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          {/* Wrapper peta + tooltip overlay */}
          <div className="relative mt-12 overflow-hidden rounded-xl border border-border bg-card/30 backdrop-blur">

            {/* Tooltip — hanya div ini yang re-render saat hover */}
            <AnimatePresence>
              {tooltip && (
                <motion.div
                  key="tip"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.12 }}
                  className="pointer-events-none absolute z-20 rounded-lg border border-border bg-card px-4 py-3 shadow-xl"
                  style={{
                    left: mouseX,
                    top: mouseY,
                    x: "-50%",
                    y: "-120%" // geser ke atas kursor sedikit
                  }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-1">
                    {tooltip.name}
                  </p>
                  <p className="font-display text-xl text-foreground leading-tight">
                    {formatTon(tooltip.fish)}
                  </p>
                  <p className="font-mono text-[9px] text-muted-foreground mt-1 uppercase tracking-wider">
                    Total Produksi Ikan
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* MapLayer — TIDAK re-render saat tooltip berubah */}
            <MapLayer onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} />
          </div>

          {/* Legenda ranking */}
          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
            {ranked.map(([name, d], i) => (
              <div
                key={name}
                className="flex items-center gap-2 rounded-md border border-border bg-card/30 px-3 py-2"
              >
                <span
                  className="h-3 w-3 shrink-0 rounded-sm"
                  style={{ background: getChoroplethColor(d.fish) }}
                />
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground truncate">
                    #{i + 1} {name}
                  </p>
                  <p className="font-mono text-[10px] text-foreground">
                    {formatTon(d.fish)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Total Produksi Ikan (Ton) · Data Primer Penelitian · Asia Tenggara
            · Hover negara untuk detail
          </p>
        </Reveal>
      </div>
    </section>
  );
}
