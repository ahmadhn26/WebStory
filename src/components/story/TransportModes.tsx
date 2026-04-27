import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell, LabelList } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { useState, useMemo } from "react";
import { pack, hierarchy } from "d3-hierarchy";

// Data Category Item (2023)
const data = [
  { name: "Plastic", value: 98.19, amount: 5617 },
  { name: "Foam", value: 1.13, amount: 65 },
  { name: "Cigarette", value: 0.44, amount: 25 },
  { name: "Paper", value: 0.23, amount: 13 },
];

const top10Bubbles = [
  { rank: 1, name: "Food wrappers", category: "Plastic", amount: 2025, percent: 35.40, floatDelay: 0, icon: "🍬", color: "bg-sky-800", border: "border-sky-950" },
  { rank: 2, name: "Other bags", category: "Plastic", amount: 1583, percent: 27.67, floatDelay: 1, icon: "🛍️", color: "bg-blue-800", border: "border-blue-950" },
  { rank: 3, name: "Grocery bags", category: "Plastic", amount: 937, percent: 16.38, floatDelay: 0.5, icon: "🛒", color: "bg-indigo-800", border: "border-indigo-950" },
  { rank: 4, name: "Beverage bottles", category: "Plastic", amount: 395, percent: 6.91, floatDelay: 1.5, icon: "🍾", color: "bg-cyan-700", border: "border-cyan-900" },
  { rank: 5, name: "Straws/stirrers", category: "Plastic", amount: 318, percent: 5.56, floatDelay: 0.8, icon: "🥤", color: "bg-teal-700", border: "border-teal-900" },
  { rank: 6, name: "Food containers", category: "Plastic", amount: 182, percent: 3.18, floatDelay: 2, icon: "🍱", color: "bg-emerald-700", border: "border-emerald-900" },
  { rank: 7, name: "Bottle caps", category: "Plastic", amount: 177, percent: 3.09, floatDelay: 1.2, icon: "🔘", color: "bg-sky-600", border: "border-sky-900" },
  { rank: 8, name: "Foam containers", category: "Foam", amount: 65, percent: 1.14, floatDelay: 0.3, icon: "🥡", color: "bg-rose-600", border: "border-rose-950" },
  { rank: 9, name: "Cigarette butts", category: "Cigarette", amount: 25, percent: 0.44, floatDelay: 2.2, icon: "🚬", color: "bg-purple-600", border: "border-purple-950" },
  { rank: 10, name: "Cups, Plates", category: "Paper", amount: 13, percent: 0.23, floatDelay: 0.7, icon: "🍽️", color: "bg-orange-600", border: "border-orange-950" },
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
      <div className="rounded-lg border border-border bg-card p-3 shadow-xl font-mono text-xs text-foreground backdrop-blur-md">
        <p className="font-bold text-primary mb-1 uppercase tracking-widest">{data.name}</p>
        <p className="text-muted-foreground">Persentase: <span className="text-foreground">{data.value}%</span></p>
        <p className="text-muted-foreground mt-1">Ditemukan: <span className="text-foreground">{data.amount} Unit</span></p>
      </div>
    );
  }
  return null;
};

export function TransportModes() {
  const [hoveredBubble, setHoveredBubble] = useState<number | null>(null);

  const packedBubbles = useMemo(() => {
    // Gunakan d3-hierarchy untuk merapatkan gelembung secara matematis (seperti referensi gambar)
    const root = hierarchy({ children: top10Bubbles })
      .sum((d: any) => d.amount)
      .sort((a, b) => (b.value || 0) - (a.value || 0)); // Terbesar di tengah

    const packLayout = pack<any>()
      .size([500, 500]) // Ukuran koordinat abstrak (akan dikonversi ke %)
      .padding(4); // Jarak/padding antar gelembung

    const nodes = packLayout(root).leaves();
    
    // Kembalikan data gabungan
    return nodes.map(node => ({
      ...node.data,
      x: node.x,
      y: node.y,
      r: node.r
    }));
  }, []);

  return (
    <section className="border-b border-border bg-gradient-to-b from-card/20 to-transparent py-32 text-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Bagian 05 · Jenis Puing Laut</p>
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
                className="data-panel max-w-sm"
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
                Persentase Kategori Sampah (2023)
              </p>
            </div>
          </div>
        </Reveal>

        {/* Top 10 Items List - Packed Bubble Chart */}
        <Reveal delay={0.4}>
          <div className="mt-24 data-panel p-6 md:p-10 relative">
            <h3 className="font-display text-2xl mb-2 text-center">Gugusan Sampah Laut Kita</h3>
            <p className="text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
              Bungkus makanan dan kantong plastik merupakan penyumbang polusi terbesar yang menempel erat satu sama lain.
            </p>

            <div className="relative w-full max-w-[550px] aspect-square mx-auto mt-10">
              {packedBubbles.map((bubble) => (
                <div
                  key={bubble.rank}
                  onMouseEnter={() => setHoveredBubble(bubble.rank)}
                  onMouseLeave={() => setHoveredBubble(null)}
                  className="absolute flex items-center justify-center rounded-full cursor-pointer z-10"
                  style={{
                    width: `${(bubble.r / 500) * 200}%`,
                    height: `${(bubble.r / 500) * 200}%`,
                    left: `${((bubble.x - bubble.r) / 500) * 100}%`,
                    top: `${((bubble.y - bubble.r) / 500) * 100}%`,
                    zIndex: hoveredBubble === bubble.rank ? 50 : 10
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className={`w-full h-full rounded-full shadow-xl transition-all duration-300 flex flex-col items-center justify-center border-4 sm:border-8 ${bubble.color} ${bubble.border} ${
                      hoveredBubble && hoveredBubble !== bubble.rank ? 'opacity-40 grayscale-[50%]' : 'opacity-100'
                    }`}
                    animate={
                      hoveredBubble === bubble.rank ? { y: 0, scale: 1.05 } : { y: [0, -10, 0] }
                    }
                    // @ts-ignore - framer motion types
                    transition={
                      hoveredBubble === bubble.rank 
                        ? { type: "spring", stiffness: 300, damping: 20 }
                        : {
                            y: {
                              duration: 4 + (bubble.rank % 3),
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: bubble.floatDelay
                            },
                            scale: { type: "spring", stiffness: 100, damping: 15, delay: bubble.rank * 0.1 },
                            opacity: { delay: bubble.rank * 0.1 }
                          }
                    }
                  >
                    {/* Tulisan Melingkar di Atas (Simulasi) */}
                    <div className="absolute top-2 sm:top-4 w-full text-center px-2">
                      <p className={`font-display text-[8px] sm:text-[10px] md:text-xs text-white/90 uppercase tracking-widest drop-shadow-md leading-tight ${hoveredBubble === bubble.rank ? 'opacity-0' : 'opacity-100'}`}>
                        {bubble.category}
                      </p>
                    </div>

                    <div className="text-center flex flex-col items-center justify-center p-2 pointer-events-none w-full h-full">
                      {/* Icon Container */}
                      <div className={`flex items-center justify-center transition-all duration-300 ${hoveredBubble === bubble.rank ? 'opacity-10 scale-150 absolute' : 'opacity-100'} ${bubble.r > 60 ? 'text-4xl sm:text-6xl mt-4' : bubble.r > 40 ? 'text-2xl sm:text-4xl mt-2' : bubble.r > 20 ? 'text-xl mt-1' : 'text-sm'}`}>
                        {bubble.icon}
                      </div>

                      {/* Hover Info Overlay */}
                      <div className={`absolute inset-0 flex flex-col items-center justify-center bg-black/40 rounded-full backdrop-blur-sm transition-opacity duration-300 ${hoveredBubble === bubble.rank ? 'opacity-100' : 'opacity-0'}`}>
                        <p className="font-bold text-white text-xs sm:text-sm md:text-base leading-tight px-4 drop-shadow-lg mb-1">
                          {bubble.name}
                        </p>
                        <p className="font-mono text-[10px] sm:text-xs text-white bg-black/50 px-2 py-0.5 rounded-full">
                          {bubble.percent}%
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
            
            <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Total Penemuan Item: 5,720 Unit · Berdasarkan data pengumpulan 2023
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
