import React from "react";
import { AreaChart } from "@tremor/react";
import { Card } from "@tremor/react";

interface ChartData {
  hour: string;
  PlayerOnline: number;
}

const chartdata: ChartData[] = [
  { hour: "00:00", PlayerOnline: 0 },
  { hour: "01:00", PlayerOnline: 0 },
  { hour: "02:00", PlayerOnline: 0 },
  { hour: "03:00", PlayerOnline: 0 },
  { hour: "04:00", PlayerOnline: 0 },
  { hour: "05:00", PlayerOnline: 0 },
  { hour: "06:00", PlayerOnline: 0 },
  { hour: "07:00", PlayerOnline: 1 },
  { hour: "08:00", PlayerOnline: 1 },
  { hour: "09:00", PlayerOnline: 1 },
  { hour: "10:00", PlayerOnline: 3 },
  { hour: "11:00", PlayerOnline: 3 },
  { hour: "12:00", PlayerOnline: 3 },
  { hour: "13:00", PlayerOnline: 1 },
  { hour: "14:00", PlayerOnline: 1 },
  { hour: "15:00", PlayerOnline: 0 },
  { hour: "16:00", PlayerOnline: 0 },
  { hour: "17:00", PlayerOnline: 1 },
  { hour: "18:00", PlayerOnline: 1 },
  { hour: "19:00", PlayerOnline: 1 },
  { hour: "20:00", PlayerOnline: 2 },
  { hour: "21:00", PlayerOnline: 4 },
  { hour: "22:00", PlayerOnline: 4 },
  { hour: "23:00", PlayerOnline: 1 },
];

const valueFormatter = (number: number): string => {
  return "" + new Intl.NumberFormat("us").format(number);
};

const calculateAverage = (data: ChartData[], key: keyof ChartData): number => {
  const total = data.reduce((sum, item) => sum + item[key], 0);
  return total / data.length;
};

export function AreaChartPlayerOnline(): JSX.Element {
  const averagePlayerOnline = calculateAverage(chartdata, "PlayerOnline");

  return (
    <>
      <Card className="p-6 w-[50vw]">
        <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Average Player Online
        </h3>
        <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
          {valueFormatter(averagePlayerOnline)}
        </p>
        <AreaChart
          className="mt-4 h-72"
          data={chartdata}
          index="hour"
          curveType="natural"
          showAnimation
          allowDecimals={false}
          yAxisWidth={65}
          categories={["PlayerOnline", "Inverters"]}
          colors={["indigo", "cyan"]}
          valueFormatter={valueFormatter}
        />
      </Card>
    </>
  );
}
