"use client";

import { Pie, PieChart } from "recharts";
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

// Cores para cada secretaria (você pode personalizar)
const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

interface RequestsForAgentProps {
  data: { secretary: string; count: number }[];
}

// Função para limpar o nome da secretaria
const formatSecretaryName = (name: string) =>
  name.replace(/^Secretaria( da| de)? /i, "").trim();

export function RequestsForAgent({ data }: RequestsForAgentProps) {
  // Formatar os dados para o gráfico
  const chartData = data.map((item, index) => ({
    secretaria: formatSecretaryName(item.secretary), // Removendo "Secretaria"
    solicitacoes: item.count,
    fill: colors[index % colors.length], // Rotaciona as cores caso tenha mais de 5
  }));

  const chartConfig: ChartConfig = {
    solicitacoes: { label: "Solicitações" },
    ...chartData.reduce((acc, item, index) => {
      acc[item.secretaria] = { label: item.secretaria, color: colors[index] };
      return acc;
    }, {} as ChartConfig),
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Solicitações por Secretaria</CardTitle>
        <CardDescription>Últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <Pie data={chartData} dataKey="solicitacoes" nameKey="secretaria" />
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
              cursor={false}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Tendência de alta de 5,2% neste mês <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando o total de solicitações dos últimos 6 meses
        </div>
      </CardFooter>
    </Card>
  );
}
