import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell, LabelList } from "recharts";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

// Data Category Item (2023)
const data = [
  { name: "Plastic", value: 98.19, amount: 5617 },
  { name: "Foam", value: 1.13, amount: 65 },
  { name: "Cigarette", value: 0.44, amount: 25 },
  { name: "Paper", value: 0.23, amount: 13 },
];

const COLORS = [
  "var(--color-coral)", 
  "var(--color-water)", 
  "var(--color-muted-foreground)", 
  "var(--color-border)"
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-xl font-mono text-xs text-foreground">
        <p className="font-bold text-primary mb-1 uppercase tracking-widest">{data.name}</p>
        <p className="text-muted-foreground">Persentase: <span className="text-foreground">{data.value}%</span></p>
        <p className="text-muted-foreground mt-1">Ditemukan: <span className="text-foreground">{data.amount} Unit</span></p>
      </div>
    );
  }
  return null;
};

export function TransportModes() {
  return (
    <section className="border-b border-border bg-gradient-to-b from-card/20 to-background py-32 text-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Babak 06 · Jenis Puing Laut</p>
              <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
                Lautan kita menelan <br />
                <span className="italic text-gradient-blood">apa saja?</span>
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Ada berbagai jenis sampah di perairan kita, namun <span className="text-foreground font-medium">plastik adalah dominator mutlak</span>.
              </p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="rounded-lg border border-border bg-card/40 p-6 backdrop-blur max-w-sm"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                  Klaim Monopoli:
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl md:text-6xl text-coral">98.2<span className="text-3xl text-muted-foreground">%</span></span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Dari seluruh sampel sampah yang diuji, plastik mendominasi mutlak secara abadi, menolak mati dan mengancam menjadi mikroplastik mematikan.
                </p>
              </motion.div>
            </div>

            {/* Visualisasi BarChart */}
            <div className="flex-1 w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 30, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: "var(--color-muted-foreground)", fontFamily: "var(--font-mono)", fontSize: 11 }} 
                    axisLine={{ stroke: "var(--color-border)" }}
                    tickLine={false}
                    tickMargin={12}
                  />
                  <YAxis 
                    tick={{ fill: "var(--color-muted-foreground)", fontFamily: "var(--font-mono)", fontSize: 11 }} 
                    axisLine={false} 
                    tickLine={false}
                    tickFormatter={(val) => `${val}%`}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--color-card)", opacity: 0.5 }} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    <LabelList 
                      dataKey="value" 
                      position="top" 
                      formatter={(val: number) => `${val}%`}
                      style={{ fill: "var(--color-foreground)", fontFamily: "var(--font-mono)", fontSize: "10px" }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Persentase Kategori Sampah yang Ditemukan (2023)
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
