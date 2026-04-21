import { motion } from "framer-motion";
import fishImg from "@/assets/contaminated-fish.png";
import { Reveal } from "./Reveal";

const timeline = [
  { time: "Dibuang", label: "Akhir yang Semu", note: "Sampah plastik mengakhiri fungsinya di darat, namun baru memulai perjalanannya menuju sungai dan laut lepas.", icon: "♺" },
  { time: "Mengurai", label: "Mengecil, Bukan Hilang", note: "Dihantam ombak dan radiasi UV, plastik tidak hancur, melainkan terpecah menjadi mikroplastik yang tak kasat mata.", icon: "▤" },
  { time: "Diperangkap", label: "Jebakan Tersembunyi", note: "Ikan-ikan menelan mikroplastik dan polutan kimia yang menyerupai plankton di dasar rantai makanan.", icon: "◐" },
  { time: "Tersaji", label: "Kembali kepada Kita", note: "Ikan yang kita anggap bergizi, kini membawa racun yang mengendap dalam tubuh manusia.", icon: "↺" },
];

export function PersonalStory() {
  return (
    <section className="relative bg-background py-32 md:py-48">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:gap-24">
        <Reveal>
          <div className="sticky top-24">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Babak 01 · Korban Tak Bersuara</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-6xl">
              Kita tidak bisa lari dari <span className="italic">apa yang kita buang</span>.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              Dalam kesunyian laut dalam, kerusakan terburuk terjadi tanpa suara. Berdasarkan penelitian (Apriliani, 2024), <span className="text-foreground font-medium">80% dari ikan yang dikonsumsi di Indonesia</span> telah terkontaminasi mikroplastik. Rantai makanan yang kita rusak, kini kembali merusak kita.
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
