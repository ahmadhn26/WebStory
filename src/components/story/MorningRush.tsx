import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Reveal } from "./Reveal";

export function MorningRush() {
  return (
    <section className="bg-background py-32 border-y border-border">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Babak 04 · Titik Nol Polusi</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-6xl">
            Dari rumah ke <span className="italic text-gradient-blood">saluran air kita</span>.
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Sebagai studi kasus, The Plastic Pollution Calculator diterapkan di Surabaya, salah satu kota percontohan di Asia Tenggara, untuk menelusuri jejak plastik.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-20">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              className="inline-flex items-center justify-center p-6 border border-primary/30 rounded-full bg-primary/5 mb-8"
            >
              <Trash2 className="w-12 h-12 text-primary" />
            </motion.div>
            <div className="font-mono text-2xl md:text-4xl text-primary tracking-widest mb-4">
              TOTAL TIMBUNAN SAMPAH SURABAYA
            </div>
            <div className="font-display text-7xl md:text-9xl text-foreground tracking-tighter">
              792.290<span className="text-muted-foreground font-mono text-3xl md:text-5xl ml-2 tracking-normal uppercase">Ton</span>
            </div>
            <p className="mt-8 mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground">
              Sekitar <span className="text-foreground font-medium">72%</span> dari angka tersebut berasal dari area pemukiman, di mana kelambanan mulai terbentuk. Tragisnya, <span className="text-foreground font-medium">47% plastik</span> tersebut menyusup ke jalur air semata-mata karena pembuangan sembarangan (dumping). Jejak kecil dari 0.70 kg per orang setiap harinya menumpuk menjadi monster raksasa menelan masa depan kita melawan air.
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Sumber: UNESCAP, Plastic Pollution Calculator (Surabaya), 2023
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
