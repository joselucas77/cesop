"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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
import { TrendingUp } from "lucide-react";

const tempoMedioAtendimentoData = [
  { agent: "Obras", time: 5, fill: "var(--color-obras)" },
  { agent: "Saúde", time: 3, fill: "var(--color-saude)" },
  { agent: "Educação", time: 4, fill: "var(--color-educacao)" },
  { agent: "Meio Ambiente", time: 2, fill: "var(--color-meio_ambiente)" },
  { agent: "Outras", time: 6, fill: "var(--color-outras)" },
];

const chartConfig = {
  obras: {
    label: "Obras",
    color: "hsl(var(--chart-1))",
  },
  saude: {
    label: "Saúde",
    color: "hsl(var(--chart-2))",
  },
  educacao: {
    label: "Educação",
    color: "hsl(var(--chart-3))",
  },
  meio_ambiente: {
    label: "Meio Ambiente",
    color: "hsl(var(--chart-4))",
  },
  outras: {
    label: "Outras",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function AverageServiceTime() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tempo Médio de Atendimento</CardTitle>
        <CardDescription>Por Secretaria (em dias)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={tempoMedioAtendimentoData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="agent"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Bar
              dataKey="time"
              name="Tempo"
              fill="var(--color-obras)"
              radius={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
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
