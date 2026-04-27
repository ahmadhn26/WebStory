import { Reveal } from "./Reveal";

import imgAllergy from "@/assets/45.png";
import imgCancer from "@/assets/46.png";
import imgImmune from "@/assets/47.png";

const diseases = [
  {
    title: "Inflammation",
    desc: "Mikroplastik yang masuk ke aliran darah dikenali tubuh sebagai benda asing, memicu respon imun sistemik. Hal ini menyebabkan pelepasan agen inflamasi (sitokin) yang jika terjadi terus-menerus dapat memicu peradangan kronis pada jaringan.",
    img: imgAllergy,
    delay: 0.1
  },
  {
    title: "Cancer",
    desc: "Mikroplastik dapat menyerap polutan berbahaya dari lingkungan dan bertindak sebagai pembawa (vector) zat beracun ke dalam organ vital. Paparan jangka panjang dapat memicu stres oksidatif dan kerusakan DNA, yang meningkatkan risiko terjadinya mutasi seluler dan pembentukan kanker.",
    img: imgCancer,
    delay: 0.3
  },
  {
    title: "Immune Disorders",
    desc: "Paparan material sintetis secara terus-menerus dapat mengganggu fungsi sistem pertahanan tubuh kita. Hal ini memicu disfungsi di mana sistem imun dapat memberikan stimulasi yang salah dan berbalik menyerang sel-sel sehat, yang berpotensi menyebabkan berbagai gangguan autoimun.",
    img: imgImmune,
    delay: 0.5
  }
];

export function DiseaseImpact() {
  return (
    <section className="bg-background pt-10 md:pt-16 pb-20 border-b border-border relative overflow-hidden">
      {/* Latar Belakang Subtle */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[120px] mix-blend-screen">
        <div className="h-[400px] w-[600px] rounded-full bg-danger/30" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <Reveal>
          <div className="text-center mb-16">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-danger">BAGIAN 9 • DAMPAK KESEHATAN</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl max-w-4xl mx-auto">
              Tiga Risiko Utama Mikroplastik bagi Tubuh Kita
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              Saat mikroplastik masuk dan terakumulasi dalam jaringan tubuh, dampaknya dapat memengaruhi kesehatan dalam jangka panjang. Berikut adalah tiga dampak medis utama menurut penelitian terkini (Bhuyan, 2022).
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
