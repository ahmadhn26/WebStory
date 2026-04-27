import { Reveal } from "./Reveal";

import imgAllergy from "@/assets/45.png";
import imgCancer from "@/assets/46.png";
import imgImmune from "@/assets/47.png";

const diseases = [
  {
    title: "Allergic Inflammation",
    desc: "Partikel mikroplastik yang menembus aliran darah akan dianggap sebagai benda asing. Tubuh merespons fragmen mikroskopis ini layaknya patogen mematikan, memicu peradangan sistemik dan reaksi alergi kronis yang merusak jaringan.",
    img: imgAllergy,
    delay: 0.1
  },
  {
    title: "Kanker (Cancer)",
    desc: "Mikroplastik bertindak layaknya spons beracun yang menyerap polutan laut. Saat mengendap di organ vital, akumulasi zat karsinogenik dan logam berat ini secara langsung meningkatkan mutasi seluler yang memicu pertumbuhan sel kanker.",
    img: imgCancer,
    delay: 0.3
  },
  {
    title: "Immune Disorder",
    desc: "Paparan material sintetis yang terus-menerus membuat sistem kekebalan tubuh menjadi kebingungan. Hal ini memicu disfungsi di mana sistem imun akhirnya berbalik menyerang sel-sel sehat, menyebabkan berbagai gangguan autoimun.",
    img: imgImmune,
    delay: 0.5
  }
];

export function DiseaseImpact() {
  return (
    <section className="bg-background py-20 border-b border-border relative overflow-hidden">
      {/* Latar Belakang Subtle */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[120px] mix-blend-screen">
        <div className="h-[400px] w-[600px] rounded-full bg-danger/30" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <Reveal>
          <div className="text-center mb-16">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-danger">Bagian 09 · Ancaman Tersembunyi</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl max-w-4xl mx-auto">
              Tiga <span className="italic text-gradient-blood">ancaman mematikan</span> di dalam tubuh kita.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              Begitu siklus mikroplastik usai dan menetap di dalam jaringan biologis kita, konsekuensinya bukan sekadar gangguan ringan. Berikut adalah tiga dampak medis utama menurut penelitian medis terkini.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10 max-w-5xl mx-auto mt-12">
          {diseases.map((d) => (
            <Reveal key={d.title} delay={d.delay}>
              <div className="group flex flex-col items-center text-center h-full">
                {/* Image Container */}
                <div className="w-40 h-40 md:w-48 md:h-48 relative mb-8 shrink-0">
                  <img 
                    src={d.img} 
                    alt={d.title} 
                    className="w-full h-full object-contain drop-shadow-2xl opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" 
                    loading="lazy"
                  />
                  {/* Subtle glow effect behind the image */}
                  <div className="absolute inset-0 bg-danger/20 blur-2xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                {/* Text Content */}
                <h3 className="font-display text-2xl text-foreground mb-4 group-hover:text-danger transition-colors">
                  {d.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
                  {d.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.8}>
          <div className="mt-16 text-center">
            <p className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest">
              Sumber Data
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-2 max-w-xl mx-auto leading-relaxed">
              Effects of microplastics on fish and in human health<br/>
              MS Bhuyan - Frontiers in Environmental Science, 2022 - frontiersin.org
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
