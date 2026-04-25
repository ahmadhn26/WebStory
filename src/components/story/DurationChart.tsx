import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { Reveal } from "./Reveal";

// Data real dari data_projec_visdat.csv (2000–2027)
// actual: data historis BPS | forecast: proyeksi Holt Double Exponential Smoothing
const allData = [
  { year: 2000, kg: 21.57 },
  { year: 2001, kg: 22.47 },
  { year: 2002, kg: 22.79 },
  { year: 2003, kg: 22.36 },
  { year: 2004, kg: 22.58 },
  { year: 2005, kg: 23.95 },
  { year: 2006, kg: 25.94 },
  { year: 2007, kg: 27.89 },
  { year: 2008, kg: 28.28 },
  { year: 2009, kg: 29.08 },
  { year: 2010, kg: 30.47 },
  { year: 2011, kg: 32.25 },
  { year: 2012, kg: 33.89 },
  { year: 2013, kg: 35.21 },
  { year: 2014, kg: 38.14 },
  { year: 2015, kg: 41.11 },
  { year: 2016, kg: 43.94 },
  { year: 2017, kg: 47.34 },
  { year: 2018, kg: 50.69 },
  { year: 2019, kg: 54.50 },
  { year: 2020, kg: 54.56 },
  { year: 2021, kg: 55.16 },
  { year: 2022, kg: 52.27 },
  { year: 2023, kg: 57.91 },
  { year: 2024, kg: 58.91 },
  { year: 2025, kg: 60.61 },
  { year: 2026, kg: 62.30 },
  { year: 2027, kg: 63.99 },
];

// Pisah menjadi dua seri: aktual (2000-2024) dan forecast (2025-2027)
// Titik 2024 dimasukkan ke keduanya agar area terhubung mulus
const actualData = allData.map((d) => ({
  year: d.year,
  actual: d.year <= 2024 ? d.kg : undefined,
  forecast: d.year >= 2024 ? d.kg : undefined,
}));

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const val = payload[0]?.value ?? payload[1]?.value;
  const isForecast = Number(label) >= 2025;
  return (
    <div
      style={{
        background: "var(--color-card)",
        border: "1px solid var(--color-border)",
        borderRadius: 8,
        padding: "10px 14px",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
      }}
    >
      <p style={{ color: "var(--color-muted-foreground)", marginBottom: 4 }}>
        {label}
      </p>
      <p
        style={{
          color: isForecast ? "var(--color-danger)" : "var(--color-water)",
          fontWeight: 600,
          fontSize: 14,
        }}
      >
        {val?.toFixed(2)} kg/kapita
      </p>
      <p
        style={{
          color: "var(--color-muted-foreground)",
          fontSize: 10,
          marginTop: 2,
        }}
      >
        {isForecast ? "📊 Forecast (Holt DES)" : "✅ Data Aktual"}
      </p>
    </div>
  );
};

export function DurationChart() {
  return (
    <section className="bg-background py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            Babak 08 · Bahaya yang Mengintai
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-foreground md:text-6xl">
            Proyeksi Konsumsi Ikan <span className="italic">Kita</span>.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Garis biru adalah realita, garis merah adalah peringatan. Data historis (2000–2024) bertemu dengan proyeksi Holt Double Exponential Smoothing (2025–2027), menunjukkan laju konsumsi ikan yang tak terbendung.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16 h-[420px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={actualData}
                margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
              >
                <defs>
                  {/* Gradient area aktual — cyan/biru */}
                  <linearGradient id="gradActual" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-water)"
                      stopOpacity={0.5}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-water)"
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                  {/* Gradient area forecast — merah/danger */}
                  <linearGradient
                    id="gradForecast"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--color-danger)"
                      stopOpacity={0.55}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-danger)"
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="year"
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                  axisLine={{ stroke: "var(--color-border)" }}
                  tickLine={false}
                  interval={3}
                />
                <YAxis
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  domain={[15, 75]}
                  tickFormatter={(v: number) => `${v} kg`}
                />
                <Tooltip content={<CustomTooltip />} />

                {/* Garis pemisah tahun 2024 → 2025 */}
                <ReferenceLine
                  x={2024}
                  stroke="var(--color-border)"
                  strokeDasharray="6 3"
                  label={{
                    value: "← Aktual | Forecast →",
                    position: "top",
                    fill: "var(--color-muted-foreground)",
                    fontSize: 10,
                    fontFamily: "var(--font-mono)",
                  }}
                />

                {/* Area data aktual */}
                <Area
                  type="monotone"
                  dataKey="actual"
                  name="Data Aktual"
                  stroke="var(--color-water)"
                  strokeWidth={2.5}
                  fill="url(#gradActual)"
                  dot={false}
                  activeDot={{ r: 5, fill: "var(--color-water)" }}
                  connectNulls={false}
                />

                {/* Area data forecast */}
                <Area
                  type="monotone"
                  dataKey="forecast"
                  name="Forecast"
                  stroke="var(--color-danger)"
                  strokeWidth={2.5}
                  strokeDasharray="6 3"
                  fill="url(#gradForecast)"
                  dot={false}
                  activeDot={{ r: 5, fill: "var(--color-danger)" }}
                  connectNulls={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <span
                className="inline-block h-3 w-8 rounded-sm"
                style={{ background: "var(--color-water)", opacity: 0.85 }}
              />
              Data Aktual (2000–2024)
            </div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <span
                className="inline-block h-3 w-8 rounded-sm"
                style={{
                  background: "var(--color-danger)",
                  opacity: 0.85,
                }}
              />
              Forecast Holt DES (2025–2027)
            </div>
          </div>
          <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Konsumsi Ikan Indonesia (kg/kapita) · Sumber: BPS &amp; Proyeksi
            Holt Double Exponential Smoothing
          </p>
        </Reveal>
      </div>
    </section>
  );
}
