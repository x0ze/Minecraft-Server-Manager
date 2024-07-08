"use client";

import { useState } from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { AreaChartPlayerOnline } from "@/components/charts/playerChart";
import { AnimatedGridPatternDemo } from "@/components/admin-panel/background";
import CardGroup from "@/components/admin-panel/card-group";

interface CardData {
  value: number;
  label: string;
  title: string;
  color: string;
}

export default function DashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <AnimatedGridPatternDemo />
      <CardGroup />
      <div className="mt-4 pt-8 pb-8 px-4 sm:px-8">
        <AreaChartPlayerOnline />
      </div>
    </ContentLayout>
  );
}
