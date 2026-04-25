import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Reveal } from "./Reveal";

// Data Kebocoran Sampah Plastik di Laut (Ton) 2018-2022
const data = [
  { year: 2018, amount: 615674.63 },
  { year: 2019, amount: 566074.94 },
  { year: 2020, amount: 521540.67 },
  { year: 2021, amount: 440106.70 },
  { year: 2022, amount: 398000.15 },
];

export function LeakageTrend() {
  return (
    <section className="bg-background py-32 border-y border-border">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            Babak 05 · Secercah Harapan
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-foreground md:text-6xl">
            Gelombang yang mulai <span className="italic text-gradient-blood">mereda</span>.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Meskipun masih didominasi plastik, ada tanda positif. Tren kebocoran sampah plastik ke laut di Indonesia menunjukkan <span className="text-foreground font-medium">penurunan stabil</span> sejak tahun 2018.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16 h-[380px] w-full rounded-xl border border-border bg-card/30 p-6 backdrop-blur">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 20, right: 0, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLeakage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-water)" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="var(--color-water)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fill: "var(--color-muted-foreground)", fontFamily: "var(--font-mono)", fontSize: 12 }} 
                  axisLine={{ stroke: "var(--color-border)" }}
                  tickLine={false}
                  tickMargin={12}
                />
                <YAxis 
                  tick={{ fill: "var(--color-muted-foreground)", fontFamily: "var(--font-mono)", fontSize: 12 }} 
                  axisLine={false} 
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                />
                <Tooltip 
                  cursor={{ stroke: "var(--color-muted)", strokeWidth: 1, strokeDasharray: "4 4" }}
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-foreground)",
                  }}
                  itemStyle={{ color: "var(--color-water)" }}
                  labelStyle={{ color: "var(--color-foreground)", fontWeight: "bold", marginBottom: "4px" }}
                  formatter={(value: number) => [`${value.toLocaleString("id-ID")} Ton`, "Total Kebocoran"]}
                  labelFormatter={(label) => `Tahun ${label}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="var(--color-water)" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorLeakage)" 
                  activeDot={{ r: 6, fill: "var(--color-water)", stroke: "var(--color-card)", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
            <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Total Kebocoran Sampah Plastik di Laut (Ton) · Indonesia 2018-2022
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
