import { useState, useCallback, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./Reveal";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Data Konsumsi Plastik Nasional — Negara Asia Tenggara (Ton) 2023
const SEA_DATA: Record<string, { plastic: number; iso: string }> = {
  Indonesia:   { plastic: 3_400_000, iso: "360" },
  Thailand:    { plastic: 3_400_000, iso: "764" },
  Vietnam:     { plastic: 3_000_000, iso: "704" },
  Malaysia:    { plastic: 1_400_000, iso: "458" },
  Philippines: { plastic:   938_200, iso: "608" },
  Singapore:   { plastic:   593_900, iso: "702" },
  Myanmar:     { plastic:   498_400, iso: "104" },
  Cambodia:    { plastic:    93_700, iso: "116" },
  Brunei:      { plastic:    34_600, iso: "096" },
  Laos:        { plastic:    21_500, iso: "418" },
};

const ISO_TO_NAME: Record<string, string> = Object.fromEntries(
  Object.entries(SEA_DATA).map(([name, d]) => [d.iso, name])
);
const SEA_ISO_SET = new Set(Object.values(SEA_DATA).map((d) => d.iso));
const MAX_PLASTIC = Math.max(...Object.values(SEA_DATA).map((d) => d.plastic));

function formatTon(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)} Juta Ton`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)} Ribu Ton`;
  return `${n} Ton`;
}

function getChoroplethColor(plastic: number): string {
  const t = plastic / MAX_PLASTIC;
  if (t > 0.85) return "#d74f3e"; // Sangat Tinggi (Merah bata / Coral tua)
  if (t > 0.65) return "#ee734a"; // Tinggi
  if (t > 0.40) return "#fa9560"; // Sedang
  if (t > 0.20) return "#febb7f"; // Rendah
  if (t > 0.08) return "#ffd7a5"; // Sangat Rendah
  return               "#ffebd1"; // Minimal (Peach pucat)
}

interface TooltipCb {
  onMouseMove: (name: string, plastic: number, e: React.MouseEvent<SVGPathElement>) => void;
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
              ? getChoroplethColor(data.plastic)
              : "#0f354a"; // Background color untuk negara bukan SEA

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={baseFill}
                stroke="#2376a1"
                strokeWidth={0.5}
                style={{
                  default: {
                    outline: "none",
                    transition: "fill 0.25s ease",
                  },
                  hover: {
                    outline: "none",
                    fill: inSEA && data
                      ? "#ffe7b8" // Warna kuning/peach terang saat di-hover
                      : "#0f354a",
                    cursor: inSEA ? "pointer" : "default",
                  },
                  pressed: { outline: "none" },
                }}
                onMouseMove={
                  inSEA && name && data
                    ? (e: React.MouseEvent<SVGPathElement>) => onMouseMove(name, data.plastic, e)
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

interface Tooltip { name: string; plastic: number; x: number; y: number }

export function FlowMap() {
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  // Stable callbacks — tidak berubah antar render → MapLayer tidak re-render
  const handleMouseMove = useCallback(
    (name: string, plastic: number, e: React.MouseEvent<SVGPathElement>) => {
      const svg  = e.currentTarget.closest("svg");
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      setTooltip({ name, plastic, x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    []
  );

  const handleMouseLeave = useCallback(() => setTooltip(null), []);

  const ranked = Object.entries(SEA_DATA).sort((a, b) => b[1].plastic - a[1].plastic);

  return (
    <section className="bg-background py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            Babak 03 · Peta Konsumsi Plastik
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-foreground md:text-6xl">
            Plastik di <span className="italic">Asia Tenggara</span>.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Di seluruh kawasan, plastik mengalir deras setiap hari. Indonesia dan Thailand memimpin
            di angka <span className="text-foreground font-medium">3,4 juta ton</span>, diikuti Vietnam dan Malaysia.
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
                    left: tooltip.x,
                    top: tooltip.y - 80,
                    transform: "translateX(-50%)",
                  }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-1">
                    {tooltip.name}
                  </p>
                  <p className="font-display text-xl text-foreground leading-tight">
                    {formatTon(tooltip.plastic)}
                  </p>
                  <p className="font-mono text-[9px] text-muted-foreground mt-1 uppercase tracking-wider">
                    Konsumsi Plastik Nasional
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
                  style={{ background: getChoroplethColor(d.plastic) }}
                />
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground truncate">
                    #{i + 1} {name}
                  </p>
                  <p className="font-mono text-[10px] text-foreground">
                    {formatTon(d.plastic)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Konsumsi Plastik Nasional (Ton) · Data Primer Penelitian · Asia Tenggara
            · Hover negara untuk detail
          </p>
        </Reveal>
      </div>
    </section>
  );
}
