import { motion } from "framer-motion";
import { Package, Trash2, Waves, Fish, Activity } from "lucide-react";
import { Reveal } from "./Reveal";

// Siklus Mikroplastik
const steps = [
  { 
    label: "Konsumsi Plastik", 
    desc: "Penggunaan masif plastik sekali pakai.",
    icon: Package,
    color: "var(--color-plastic)" 
  },
  { 
    label: "Salah Kelola", 
    desc: "Plastik bocor dan mencemari aliran sungai.",
    icon: Trash2,
    color: "var(--color-danger)" 
  },
  { 
    label: "Pecah di Samudra", 
    desc: "Terpecah menjadi mikroplastik (<5mm).",
    icon: Waves,
    color: "var(--color-water)" 
  },
  { 
    label: "Rantai Makanan", 
    desc: "Ikan menelan partikel beracun ini.",
    icon: Fish,
    color: "var(--color-fish)" 
  },
  { 
    label: "Tubuh Manusia", 
    desc: "Mikroplastik masuk ke darah kita.",
    icon: Activity,
    color: "var(--color-coral)" 
  },
];

export function HealthImpact() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-card/40 to-background py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center mb-16">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-danger">Babak 09 · Lingkaran Setan</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-6xl max-w-4xl mx-auto">
              Plastik yang kita buang <br className="hidden md:block"/>
              <span className="italic text-gradient-blood">meracuni piring kita sendiri</span>.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              Mikroplastik yang masuk ke dalam tubuh memicu penyakit serius seperti <strong>Allergic Inflammation, Kanker, dan Autoimun</strong>. (Bhuyan, 2022)
            </p>
          </div>
        </Reveal>

        {/* Desktop Horizontal Layout */}
        <div className="hidden md:block relative mt-24">
          {/* Garis Horizontal */}
          <div className="absolute top-[28px] left-[5%] right-[5%] h-px bg-border">
            <motion.div 
              className="h-full bg-gradient-to-r from-water via-danger to-coral origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </div>

          <div className="grid grid-cols-5 gap-4 relative z-10">
            {steps.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.3 }}
                className="flex flex-col items-center text-center"
              >
                {/* Icon Circle */}
                <div 
                  className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-background shadow-lg mb-6"
                  style={{ backgroundColor: s.color }}
                >
                  <s.icon className="h-6 w-6 text-background" strokeWidth={2.5} />
                  
                  {/* Pingpong pulse effect */}
                  {i === steps.length - 1 && (
                    <motion.div
                      className="absolute inset-[-4px] rounded-full border-2 border-coral"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                </div>

                {/* Konten Text */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    Tahap 0{i + 1}
                  </p>
                  <h3 
                    className={`font-display text-xl mb-2 ${
                      i === steps.length - 1 ? "text-coral" : "text-foreground"
                    }`}
                  >
                    {s.label}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground max-w-[180px] mx-auto">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Vertical Layout (Lebih Rapat) */}
        <div className="md:hidden relative mx-auto max-w-sm pl-4 mt-12">
          {/* Garis Vertikal */}
          <div className="absolute left-[35px] top-4 bottom-4 w-px bg-border">
            <motion.div 
              className="w-full bg-gradient-to-b from-water via-danger to-coral origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              style={{ height: "100%" }}
            />
          </div>

          <div className="space-y-10">
            {steps.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="relative flex items-start gap-6"
              >
                {/* Icon Circle */}
                <div 
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-background shadow-md"
                  style={{ backgroundColor: s.color }}
                >
                  <s.icon className="h-4 w-4 text-background" strokeWidth={2.5} />
                  
                  {i === steps.length - 1 && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-coral"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                </div>

                {/* Konten Text */}
                <div className="pt-1">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                    Tahap 0{i + 1}
                  </p>
                  <h3 
                    className={`font-display text-xl mb-1 ${
                      i === steps.length - 1 ? "text-coral" : "text-foreground"
                    }`}
                  >
                    {s.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
