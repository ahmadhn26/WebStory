import { motion } from "framer-motion";
import { Droplet, Box } from "lucide-react";
import { Reveal } from "./Reveal";

export function TransportModes() {
  return (
    <section className="border-b border-border bg-gradient-to-b from-card/20 to-background py-32 text-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Babak 06 · Jenis Puing Laut</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-foreground md:text-6xl">
            Lautan kita menelan <br />
            <span className="italic text-gradient-blood">apa saja?</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Plastik bukan satu-satunya racun buatan yang mengendap, namun ia adalah <span className="text-foreground font-medium">sang dominator mutlak</span>. Keabadian senyawa plastiknya menjadi ironi terbesar bagi sebuah produk sekali pakai.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16 grid gap-12 md:grid-cols-2 items-center">
            {/* Visualisasi Plastik */}
            <div className="space-y-8">
              <div>
                <div className="flex items-end justify-between font-mono mb-2">
                  <div className="flex items-center gap-2 text-foreground">
                    <Droplet className="w-5 h-5 text-coral" />
                    <span>Plastik</span>
                  </div>
                  <span className="text-2xl text-coral tracking-widest">627.80 g/m²</span>
                </div>
                <div className="h-4 w-full bg-card rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "90%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-coral"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-end justify-between font-mono mb-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Box className="w-5 h-5" />
                    <span>Material Lainnya</span>
                  </div>
                  <span className="text-xl text-muted-foreground">Sebagian Kecil</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-2">
                  <span className="px-2 py-1 rounded bg-card/60">Kayu</span>
                  <span className="px-2 py-1 rounded bg-card/60">Karet</span>
                  <span className="px-2 py-1 rounded bg-card/60">Kaca & Keramik</span>
                  <span className="px-2 py-1 rounded bg-card/60">Logam</span>
                  <span className="px-2 py-1 rounded bg-card/60">Busa (Foam)</span>
                  <span className="px-2 py-1 rounded bg-card/60">Kain</span>
                  <span className="px-2 py-1 rounded bg-card/60">Kertas</span>
                </div>
              </div>
            </div>

            {/* Kotak Alasan */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="rounded-lg border border-border bg-card/40 p-8 backdrop-blur"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                Sang Dominator Tak Terkalahkan:
              </p>
              <div className="flex items-baseline gap-4">
                <span className="font-display text-5xl md:text-6xl text-coral">627.80<span className="text-3xl items-end text-muted-foreground ml-2">g/m²</span></span>
              </div>
              <p className="mt-4 font-display text-2xl text-foreground">
                "Beban Setiap Meter Persegi"
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Dari pesisir dangkal hingga palung terdalam, densitas sampah di wilayah perairan Indonesia didominasi secara paksa oleh material plastik. Kaca, logam, maupun kayu dapat kembali ke pelukan alam seiring waktu, tetapi plastik hanyalah benda asing yang menolak mati.
              </p>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground border-t border-border pt-4">
                Sumber: Types of Marine Debris, Divini, 2022
              </p>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
