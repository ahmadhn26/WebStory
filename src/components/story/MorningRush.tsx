import { motion } from "framer-motion";
import { Trash2, Home, Droplets, User } from "lucide-react";
import { Reveal } from "./Reveal";

const metrics = [
  {
    icon: Home,
    value: "72%",
    label: "Berasal dari Pemukiman",
    color: "text-foreground",
    bg: "bg-card",
  },
  {
    icon: Droplets,
    value: "47%",
    label: "Bocor ke Jalur Air",
    color: "text-danger",
    bg: "bg-danger/10",
  },
  {
    icon: User,
    value: "0.70 Kg",
    label: "Sampah Harian per Orang",
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

export function MorningRush() {
  return (
    <section className="bg-background py-32 border-y border-border">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Babak 04 · Titik Nol Polusi</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl">
            Studi Kasus Surabaya: <br />
            <span className="italic text-gradient-blood">Dari Rumah ke Saluran Air.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16">
            {/* Main Big Metric */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              className="inline-flex items-center justify-center p-6 border border-primary/30 rounded-full bg-primary/5 mb-6"
            >
              <Trash2 className="w-10 h-10 text-primary" />
            </motion.div>
            <div className="font-mono text-xl md:text-2xl text-muted-foreground tracking-widest mb-2 uppercase">
              Total Timbunan Sampah
            </div>
            <div className="font-display text-6xl md:text-8xl text-foreground tracking-tighter mb-16">
              792.290<span className="text-muted-foreground font-mono text-2xl md:text-4xl ml-2 tracking-normal uppercase">Ton</span>
            </div>

            {/* Grid of Mini Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.2 }}
                  className={`flex flex-col items-center justify-center p-8 rounded-xl border border-border ${m.bg} backdrop-blur-sm`}
                >
                  <m.icon className={`w-8 h-8 mb-4 ${m.color}`} />
                  <p className={`font-display text-4xl mb-2 ${m.color}`}>{m.value}</p>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {m.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <p className="mt-12 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Sumber: UNESCAP, Plastic Pollution Calculator (Surabaya), 2023
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
