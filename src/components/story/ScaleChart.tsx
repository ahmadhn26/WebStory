import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Cell, Tooltip } from "recharts";
import { Reveal } from "./Reveal";

// Data: Ocean Conservancy 2024 - Plastic Consumption Rank in Asia
const data = [
  { region: "China", amount: 38000000 },
  { region: "India", amount: 23000000 },
  { region: "Japan", amount: 15000000 },
  { region: "Indonesia", amount: 10500000 },
  { region: "Thailand", amount: 8000000 },
  { region: "Russia", amount: 7000000 },
  { region: "Vietnam", amount: 6000000 },
  { region: "South Korea", amount: 5000000 },
];

export function ScaleChart() {
  const target = data.find((d) => d.region === "Indonesia")?.amount || 0;
  return (
    <section className="border-y border-border bg-card/40 py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Babak 02 · Skala Masalah</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-foreground md:text-6xl">
            Di manakah posisi <span className="italic">Indonesia</span>?
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Angka tidak pernah berbohong. Di kawasan Asia, Indonesia menempati urutan <span className="text-foreground font-medium">keempat</span> sebagai negara dengan konsumsi penyumbang sampah plastik terbesar. Posisi yang seharusnya tidak kita banggakan.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16 h-[420px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={data.reverse()} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                  axisLine={{ stroke: "var(--color-border)" }}
                  tickLine={false}
                  tickFormatter={(v: number) => `${v / 1000000}M`}
                />
                <YAxis
                  type="category"
                  dataKey="region"
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 13 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "var(--color-muted)", opacity: 0.3 }}
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontFamily: "var(--font-mono)",
                  }}
                  formatter={(v: number) => [`${v.toLocaleString("id-ID")} Ton`, "Konsumsi"]}
                />
                <Bar dataKey="amount" radius={[0, 6, 6, 0]} barSize={24}>
                  {data.map((d, i) => (
                    <Cell
                      key={i}
                      fill={d.region === "Indonesia" ? "var(--color-coral)" : "var(--color-muted-foreground)"}
                      fillOpacity={d.region === "Indonesia" ? 1 : 0.5}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Konsumsi Plastik Nasional (Ton) · Sumber: Ocean Conservancy, 2024
          </p>
        </Reveal>
      </div>
    </section>
  );
}
