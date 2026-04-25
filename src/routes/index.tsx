import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/story/Hero";
import { PersonalStory } from "@/components/story/PersonalStory";
import { ScaleChart } from "@/components/story/ScaleChart"; // Rank in Asia
import { FlowMap } from "@/components/story/FlowMap"; // Fish Prod in SEA
import { MorningRush } from "@/components/story/MorningRush"; // Surabaya Waste
import { LeakageTrend } from "@/components/story/LeakageTrend"; // Leakage Trend 2018-2022
import { TransportModes } from "@/components/story/TransportModes"; // Debris Types
import { Comparison } from "@/components/story/Comparison"; // Regression
import { DurationChart } from "@/components/story/DurationChart"; // Projection
import { HealthImpact } from "@/components/story/LifeClock"; // Health Cycle
import { Calculator } from "@/components/story/Calculator"; // Footprint
import { Closing } from "@/components/story/Closing";
import { ProgressBar } from "@/components/story/ProgressBar";
import { Pullquote } from "@/components/story/Pullquote";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ocean's Hidden Crisis — The Plastic Reality" },
      {
        name: "description",
        content:
          "An interactive data story about plastic consumption and its impact on marine life and human health in Indonesia.",
      },
      { property: "og:title", content: "Ocean's Hidden Crisis — The Plastic Reality" },
      {
        property: "og:description",
        content:
          "Are you consuming fish, or microplastics? An emotional, data-driven look at the cost of plastic pollution.",
      },
      { property: "og:type", content: "article" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground antialiased">
      <ProgressBar />
      <Hero />
      <PersonalStory />
      <Pullquote attribution="Ocean Conservancy, 2024">
        Indonesia menempati urutan keempat sebagai negara dengan penyumbang sampah plastik terbesar di dunia.
      </Pullquote>
      <ScaleChart />
      <FlowMap />
      
      <MorningRush />
      <LeakageTrend />
      
      <TransportModes />
      <Pullquote attribution="Divini, 2022">
        Plastik merupakan ancaman abadi; material pembunuh dominan seberat 627.80 g/m² merongrong perairan dangkal dan dalam kita.
      </Pullquote>
      <Comparison />
      <DurationChart />
      
      <HealthImpact />
      
      <Calculator />
      <Closing />
    </main>
  );
}
