import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Cell, Tooltip, LabelList } from "recharts";
import { Reveal } from "./Reveal";

// Data Real: Konsumsi Plastik Nasional (Ton) — Negara Asia Tenggara (2023)
const data = [
  { region: "Indonesia", amount: 3400000 },
  { region: "Thailand", amount: 3400000 },
  { region: "Vietnam", amount: 3000000 },
  { region: "Malaysia", amount: 1400000 },
  { region: "Philippines", amount: 938200 },
  { region: "Singapore", amount: 593900 },
  { region: "Myanmar", amount: 498400 },
  { region: "Cambodia", amount: 93700 },
  { region: "Brunei", amount: 34600 },
  { region: "Laos", amount: 21500 },
];

// Urutkan descending, ambil top 8 (terbesar di atas)
const sortedData = [...data]
  .sort((a, b) => b.amount - a.amount)
  .slice(0, 8);

export function ScaleChart() {
  return (
    <section className="border-y border-border bg-card/40 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Teks narasi di kiri */}
          <Reveal>
            <div className="md:w-72 shrink-0 md:sticky md:top-28">
              <div className="infographic-section-header">Bagian 02 · Cakupan Masalah</div>
              <h2 className="mt-2 font-display text-3xl leading-tight text-foreground md:text-4xl">
                Di manakah posisi <span className="italic">Indonesia</span>?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Indonesia menempati posisi teratas sebagai konsumen plastik terbesar di ASEAN. Dengan angka mencapai <span className="text-foreground font-medium">3,4 juta ton</span> per tahun, jumlah konsumsi kita setara dengan Thailand dan menjadi yang tertinggi di kawasan ASEAN.
              </p>
              {/* Key stat callout */}
              <div className="mt-8 data-panel">
                <div className="stat-callout">
                  <span className="value">3.4 Juta</span>
                  <span className="label">Ton / Tahun — Indonesia (#1 di ASEAN)</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Chart di kanan — lebih besar */}
          <Reveal delay={0.15} className="flex-1 w-full">
            <div className="data-panel h-[480px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={sortedData}
                  margin={{ top: 10, right: 80, left: 90, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                    axisLine={{ stroke: "var(--color-border)" }}
                    tickLine={false}
                    tickFormatter={(v: number) =>
                      v >= 1000000 ? `${(v / 1000000).toFixed(0)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}K` : `${v}`
                    }
                  />
                  <YAxis
                    type="category"
                    dataKey="region"
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 13 }}
                    axisLine={false}
                    tickLine={false}
                    width={90}
                  />
                  <Tooltip
                    cursor={{ fill: "var(--color-muted)", opacity: 0.15 }}
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "var(--color-foreground)",
                    }}
                    itemStyle={{ color: "var(--color-muted-foreground)" }}
                    labelStyle={{ color: "var(--color-foreground)", fontWeight: "bold", marginBottom: "4px" }}
                    formatter={(v: number) => [`${v.toLocaleString("id-ID")} Ton`, "Konsumsi Plastik"]}
                  />
                  <Bar dataKey="amount" radius={[0, 4, 4, 0]} barSize={38}>
                    {sortedData.map((d, i) => (
                      <Cell
                        key={i}
                        fill={d.region === "Indonesia" ? "var(--color-coral)" : "var(--color-water)"}
                        fillOpacity={d.region === "Indonesia" ? 1 : 0.65}
                      />
                    ))}
                    <LabelList
                      dataKey="amount"
                      position="right"
                      formatter={(v: number) =>
                        v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}K` : `${v}`
                      }
                      style={{ fill: "var(--color-muted-foreground)", fontFamily: "var(--font-mono)", fontSize: 11 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Top 8 Konsumsi Plastik Nasional (Ton) · Data Primer Penelitian · Asia Tenggara (ASEAN)
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
