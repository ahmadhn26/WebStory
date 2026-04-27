import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import microplasticCycleImg from "../../assets/microplastics-cycle.png";

export function HealthImpact() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-card/40 to-background pt-20 md:pt-32 pb-10 md:pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-danger">Bagian 08 · Lingkaran Setan</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-6xl max-w-4xl mx-auto">
              Plastik yang kita buang <br className="hidden md:block" />
              <span className="italic text-gradient-blood">meracuni piring kita sendiri</span>.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              Mikroplastik yang masuk ke dalam tubuh memicu penyakit serius seperti <strong>Allergic Inflammation, Kanker, dan Autoimun</strong>. (Bhuyan, 2022)
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="relative mt-4 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-center"
            >
              <img 
                src={microplasticCycleImg} 
                alt="Microplastic Cycle" 
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
