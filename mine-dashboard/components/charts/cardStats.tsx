import { Card, ProgressCircle } from "@tremor/react";

interface CardStatsProps {
  value: number;
  label: string;
  title: string;
  color: string;
}

export function CardStats({ value, label, title, color }: CardStatsProps) {
  return (
    <Card
      className="mx-auto max-w-[200px] border-white"
      decorationColor="white"
    >
      <div className="flex justify-start space-x-5 items-center">
        <ProgressCircle value={value} size="md" color={color} showAnimation>
          <span className="text-xs font-medium text-white-700">{value}%</span>
        </ProgressCircle>
        <div>
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            {label}
          </p>
          <p className="text-xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            {title}
          </p>
        </div>
      </div>
    </Card>
  );
}
