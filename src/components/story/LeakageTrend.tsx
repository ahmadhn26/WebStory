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
    <section className="bg-background py-20 border-y border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Teks di kiri — sticky */}
          <Reveal>
            <div className="md:w-72 shrink-0 md:sticky md:top-28">
              <div className="infographic-section-header">Babak 05 · Secercah Harapan</div>
              <h2 className="mt-2 font-display text-3xl leading-tight text-foreground md:text-4xl">
                Gelombang yang mulai <span className="italic text-gradient-blood">mereda</span>.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Meskipun masih didominasi plastik, ada tanda positif. Tren kebocoran sampah plastik ke laut di Indonesia menunjukkan <span className="text-foreground font-medium">penurunan stabil</span> sejak tahun 2018.
              </p>
              {/* Key stat */}
              <div className="mt-8 data-panel">
                <div className="stat-callout">
                  <span className="value" style={{ color: 'var(--color-water)' }}>−35%</span>
                  <span className="label">Penurunan Kebocoran 2018–2022</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Chart di kanan — lebih besar tanpa box */}
          <Reveal delay={0.15} className="flex-1 w-full">
            <div className="data-panel h-[450px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLeakage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-water)" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="var(--color-water)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="year" 
                    tick={{ fill: "var(--color-muted-foreground)", fontFamily: "var(--font-mono)", fontSize: 13 }} 
                    axisLine={{ stroke: "var(--color-border)" }}
                    tickLine={false}
                    tickMargin={12}
                  />
                  <YAxis 
                    tick={{ fill: "var(--color-muted-foreground)", fontFamily: "var(--font-mono)", fontSize: 13 }} 
                    axisLine={false} 
                    tickLine={false}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                    width={55}
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
                    activeDot={{ r: 7, fill: "var(--color-water)", stroke: "var(--color-card)", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Total Kebocoran Sampah Plastik di Laut (Ton) · Indonesia 2018–2022
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
