import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Cell, Tooltip, LabelList } from "recharts";
import { Reveal } from "./Reveal";

// Data: Projection of Fish Consumption in Indonesia (2000-2027)
const data = [
  { year: "2000", kg: 21.57, actual: true },
  { year: "2005", kg: 23.95, actual: true },
  { year: "2010", kg: 30.47, actual: true },
  { year: "2015", kg: 41.11, actual: true },
  { year: "2020", kg: 54.56, actual: true },
  { year: "2021", kg: 55.16, actual: true },
  { year: "2022", kg: 52.27, actual: true },
  { year: "2023", kg: 57.91, actual: true },
  { year: "2024", kg: 58.91, actual: true },
  { year: "2025", kg: 60.61, forecast: true },
  { year: "2026", kg: 62.30, forecast: true },
  { year: "2027", kg: 63.99, forecast: true },
];

export function DurationChart() {
  return (
    <section className="bg-background py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Babak 08 · Bahaya yang Mengintai</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-foreground md:text-6xl">
            Proyeksi Konsumsi Ikan <span className="italic">Kita</span>.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Menggunakan metode Double Exponential Smoothing, konsumsi ikan di Indonesia diproyeksikan akan terus meningkat setiap tahunnya. Menjelang 2027, konsumsi ini akan mencapai <span className="text-foreground font-medium">63.99 kg/kapita</span>. Dengan tingginya persentase ikan yang terkontaminasi mikroplastik, angka ini merupakan bom waktu bagi kesehatan sirkuler kita.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16 h-[420px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis
                  dataKey="year"
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 13 }}
                  axisLine={{ stroke: "var(--color-border)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 80]}
                  tickFormatter={(v: number) => `${v} kg`}
                />
                <Tooltip
                  cursor={{ fill: "var(--color-muted)", opacity: 0.1 }}
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontFamily: "var(--font-mono)",
                  }}
                  formatter={(v: number) => [`${v} kg/kapita`, "Konsumsi"]}
                />
                <Bar dataKey="kg" radius={[4, 4, 0, 0]} maxBarSize={45}>
                  {data.map((d, i) => (
                    <Cell
                      key={i}
                      fill={d.forecast ? "var(--color-danger)" : "var(--color-ocean)"}
                      fillOpacity={d.forecast ? 1 : 0.8}
                    />
                  ))}
                  <LabelList
                      dataKey="kg"
                      position="top"
                      formatter={(v: number) => `${v}`}
                      style={{ fill: "var(--color-foreground)", fontFamily: "var(--font-mono)", fontSize: 11 }}
                    />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Biru: Aktual · Merah: Forecast (Holt Method) · Proyeksi Konsumsi Ikan Indonesia
          </p>
        </Reveal>
      </div>
    </section>
  );
}
