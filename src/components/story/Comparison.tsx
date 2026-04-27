import { motion } from "framer-motion";
import { ScatterChart, Scatter, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, ZAxis, Cell } from "recharts";
import { Reveal } from "./Reveal";
import { AlertTriangle } from "lucide-react";

// Data dari VDI.xlsx - Agregat (2023)
const rawData = [
  { country: "China", plastic: 26.7, fish: 89662525.0 },
  { country: "India", plastic: 5.3, fish: 15633898.0 },
  { country: "Japan", plastic: 30.2, fish: 3987038.0 },
  { country: "Indonesia", plastic: 12.4, fish: 21249690.0 },
  { country: "Thailand", plastic: 46.9, fish: 2308267.0 },
  { country: "Vietnam", plastic: 30.5, fish: 8786589.0 },
  { country: "Saudi Arabia", plastic: 58.5, fish: 216080.5 },
  { country: "Malaysia", plastic: 41.3, fish: 1787174.0 },
  { country: "UAE", plastic: 116.3, fish: 61847.59 },
  { country: "Israel", plastic: 105.5, fish: 16201.4 },
  { country: "Philippines", plastic: 8.4, fish: 4014862.0 },
  { country: "Pakistan", plastic: 3.5, fish: 672141.4 },
  { country: "Singapore", plastic: 104.4, fish: 7095.95 },
  { country: "Bangladesh", plastic: 3.5, fish: 4880744.0 },
  { country: "Myanmar", plastic: 9.3, fish: 2215443.0 },
  { country: "Sri Lanka", plastic: 8.4, fish: 519706.3 },
  { country: "Cambodia", plastic: 5.7, fish: 892752.0 },
  { country: "Brunei", plastic: 78.3, fish: 22370.45 },
  { country: "Laos", plastic: 2.9, fish: 213150.0 },
  { country: "Maldives", plastic: 12.3, fish: 155876.0 }
];

// Menghitung Natural Logaritma LN(Fish Production) untuk Y-axis
const data = rawData.map(d => ({
  ...d,
  lnFish: Math.log(d.fish)
}));

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-xl font-mono text-xs text-foreground">
        <p className="font-bold text-primary mb-1 uppercase tracking-widest">{data.country}</p>
        <p className="text-muted-foreground">Konsumsi Plastik: <span className="text-foreground">{data.plastic} kg/kapita</span></p>
        <p className="text-muted-foreground mt-1">Produksi Ikan: <span className="text-foreground">{data.fish.toLocaleString("id-ID")} Ton</span></p>
        <p className="text-muted-foreground mt-1 text-[10px]">LN(Fish): {data.lnFish.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

export function Comparison() {
  return (
    <section className="border-y border-border bg-card/40 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="infographic-section-header">Babak 07 · Hubungan Berbahaya</div>
              <h2 className="mt-2 max-w-3xl font-display text-4xl leading-tight text-foreground md:text-5xl">
                Setiap <span className="italic text-gradient-blood">1 kg plastik</span> menghancurkan ekosistem laut kita.
              </h2>
              <div className="mt-8 rounded-lg border border-danger/30 bg-danger/5 p-6 backdrop-blur flex gap-4 items-start">
                <AlertTriangle className="w-8 h-8 text-danger shrink-0 mt-1" />
                <div>
                  <p className="font-display text-2xl text-foreground mb-2">Penurunan 0.05% Produksi Ikan</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Analisis Regresi Linear dari 20 negara menunjukkan bahwa peningkatan 1 kg konsumsi plastik per kapita berkorelasi langsung dengan penurunan tren produksi ikan.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="data-panel flex-1 w-full h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis 
                    type="number" 
                    dataKey="plastic" 
                    name="Plastic Consumption" 
                    unit="kg"
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                    axisLine={{ stroke: "var(--color-border)" }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="lnFish" 
                    name="LN(Fish Production)" 
                    domain={['auto', 'auto']}
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <ZAxis type="category" dataKey="country" name="Country" />
                  <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Countries" data={data}>
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.country === "Indonesia" ? "var(--color-coral)" : "var(--color-water)"} 
                        opacity={entry.country === "Indonesia" ? 1 : 0.6}
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
              <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                LN(Produksi Ikan) vs Konsumsi Plastik Per Kapita (kg) · 20 Negara (2023)
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
