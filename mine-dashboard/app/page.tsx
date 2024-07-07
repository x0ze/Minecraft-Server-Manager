"use client";

import { useState } from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { AreaChartPlayerOnline } from "@/components/charts/playerChart";
import { AnimatedGridPatternDemo } from "@/components/admin-panel/background";
import { CardStats } from "@/components/charts/cardStats";

interface CardData {
  value: number;
  label: string;
  title: string;
  color: string;
}

export default function DashboardPage() {
  const [cards, setCards] = useState<CardData[]>([
    { value: 100, label: "Status", title: "Online", color: "green" },
    { value: 65, label: "Ping", title: "153ms", color: "orange" },
    { value: 15, label: "Player", title: "3/20", color: "green" },
    { value: 65, label: "Up time", title: "14:26H", color: "orange" },
    { value: 84, label: "Processor", title: "84%", color: "red" },
    { value: 20, label: "Memory", title: "2/8 GB", color: "green" },
  ]);

  return (
    <ContentLayout title="Dashboard">
      <AnimatedGridPatternDemo />
      <div className="relative -mt-12 flex flex-wrap justify-center gap-4 px-4 sm:px-8">
        {cards.map((card, index) => (
          <CardStats
            key={index}
            value={card.value}
            label={card.label}
            title={card.title}
            color={card.color}
          />
        ))}
      </div>
      <div className="mt-4 pt-8 pb-8 px-4 sm:px-8">
        <AreaChartPlayerOnline />
      </div>
    </ContentLayout>
  );
}
