import { motion } from "framer-motion";
import fishImg from "@/assets/contaminated-fish.png";
import { Reveal } from "./Reveal";

const timeline = [
  { time: "01", label: "Plastik Terbawa ke Laut", note: "Sampah plastik yang tidak terkelola di darat terbawa oleh aliran air hingga berakhir di laut lepas.", icon: "♺" },
  { time: "02", label: "Pecah Menjadi Mikroplastik", note: "Akibat paparan sinar matahari dan hantaman ombak, plastik pecah menjadi partikel kecil yang disebut mikroplastik.", icon: "▤" },
  { time: "03", label: "Tertelan oleh Ikan", note: "Ikan sering kali salah mengira butiran plastik tersebut sebagai makanan, sehingga partikel tersebut masuk ke dalam tubuh mereka.", icon: "◐" },
  { time: "04", label: "Dampak pada Kesehatan", note: "Saat kita mengonsumsi ikan tersebut, partikel plastik dan zat beracun di dalamnya ikut masuk ke dalam tubuh kita.", icon: "↺" },
];

export function PersonalStory() {
  return (
    <section className="relative bg-background py-32 md:py-48">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:gap-24">
        <Reveal>
          <div className="sticky top-24">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Bagian 01 · Dampak Terhadap Ekosistem Laut</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-6xl">
              Sampah yang Kita Buang Akhirnya <span className="italic text-primary">Kembali ke Kita</span>.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              Berdasarkan penelitian (Apriliani, 2024), <span className="text-foreground font-medium">80% ikan konsumsi di Indonesia</span> telah terkontaminasi mikroplastik.
            </p>
            <div className="mt-10 overflow-hidden rounded-md">
              <img
                src={fishImg}
                alt="A translucent oceanic fish swimming with glowing microplastics inside its stomach"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover opacity-90 saturate-50"
              />
            </div>
          </div>
        </Reveal>

        <ol className="relative">
          <div className="absolute left-[1.4rem] top-2 bottom-2 w-px bg-border" />
          {timeline.map((t, i) => (
            <motion.li
              key={t.time}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-12 flex gap-6"
            >
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-card font-mono text-lg text-primary">
                {t.icon}
              </div>
              <div>
                <p className="font-mono text-sm tracking-widest text-primary">{t.time}</p>
                <h3 className="mt-1 font-display text-2xl text-foreground">{t.label}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {t.note}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
