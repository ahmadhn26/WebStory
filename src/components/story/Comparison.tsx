import { motion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Line } from "recharts";
import { Reveal } from "./Reveal";
import { AlertTriangle } from "lucide-react";

// Synthetic data representing the regression analysis trend across countries
const data = [
  { country: "A", plastic: 110, fishProd: 12 },
  { country: "B", plastic: 90, fishProd: 12.5 },
  { country: "C", plastic: 85, fishProd: 12.8 },
  { country: "Indonesia", plastic: 75, fishProd: 13.5 },
  { country: "E", plastic: 60, fishProd: 14.1 },
  { country: "F", plastic: 40, fishProd: 14.8 },
  { country: "G", plastic: 20, fishProd: 15 },
  { country: "H", plastic: 10, fishProd: 15.5 },
];

export function Comparison() {
  return (
    <section className="border-y border-border bg-card/40 py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-danger">Babak 07 · Hubungan Berbahaya</p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-foreground md:text-5xl">
                Setiap <span className="italic text-gradient-blood">1 kg plastik</span> menghancurkan ekosistem laut kita.
              </h2>
              <div className="mt-8 rounded-lg border border-danger/30 bg-danger/5 p-6 backdrop-blur flex gap-4 items-start">
                <AlertTriangle className="w-8 h-8 text-danger shrink-0 mt-1" />
                <div>
                  <p className="font-display text-2xl text-foreground mb-2">Penurunan 0.05% Produksi Ikan</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Analisis Regresi Linear menunjukkan bahwa peningkatan 1 kg konsumsi plastik per kapita menyebabkan penurunan sebesar 0,05% pada produksi ikan, menandakan dampak lingkungan yang sangat negatif. Semakin banyak plastik yang kita gunakan, kelangsungan laut semakin terancam.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPlastic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-water)" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="var(--color-water)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis dataKey="country" hide />
                  <YAxis yAxisId="left" hide />
                  <YAxis yAxisId="right" orientation="right" hide />
                  <Tooltip 
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontFamily: "var(--font-mono)",
                    }}
                   />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="plastic"
                    name="Plastic Consumption"
                    stroke="var(--color-water)"
                    fillOpacity={1}
                    fill="url(#colorPlastic)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="fishProd"
                    name="LN(Fish Production)"
                    stroke="var(--color-danger)"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "var(--color-danger)" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
              <p className="mt-4 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
                LN(Fish Prod) vs Plastic Consumption Per Capita (Negara)
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
