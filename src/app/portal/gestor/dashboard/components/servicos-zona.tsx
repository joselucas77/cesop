"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { zone: "Norte", services: 275, fill: "var(--color-norte)" },
  { zone: "Centro", services: 200, fill: "var(--color-centro)" },
  { zone: "Oeste", services: 187, fill: "var(--color-oeste)" },
  { zone: "Sul", services: 173, fill: "var(--color-sul)" },
  { zone: "Expansão", services: 90, fill: "var(--color-expansao)" },
];

const chartConfig = {
  norte: {
    label: "Norte",
    color: "hsl(var(--chart-1))",
  },
  centro: {
    label: "Centro",
    color: "hsl(var(--chart-2))",
  },
  oeste: {
    label: "Oeste",
    color: "hsl(var(--chart-3))",
  },
  sul: {
    label: "Sul",
    color: "hsl(var(--chart-4))",
  },
  expansao: {
    label: "Expansão",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function ServicesForZone() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Serviços por Zona</CardTitle>
        <CardDescription>Junho - Dezembro 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}>
            <YAxis
              dataKey="zone"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <XAxis dataKey="services" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="services"
              name="serviços"
              layout="vertical"
              radius={5}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Tendência de alta de 4,8% neste mês <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando o total de serviços dos últimos 6 meses
        </div>
      </CardFooter>
    </Card>
  );
}
