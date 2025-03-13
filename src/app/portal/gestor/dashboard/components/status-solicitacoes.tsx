"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartData = [
  { date: "2024-04-01", deferido: 222, indeferido: 150, em_andamento: 85 },
  { date: "2024-04-02", deferido: 97, indeferido: 180, em_andamento: 65 },
  { date: "2024-04-03", deferido: 167, indeferido: 120, em_andamento: 90 },
  { date: "2024-04-04", deferido: 242, indeferido: 260, em_andamento: 110 },
  { date: "2024-04-05", deferido: 373, indeferido: 290, em_andamento: 72 },
  { date: "2024-04-06", deferido: 301, indeferido: 340, em_andamento: 95 },
  { date: "2024-04-07", deferido: 245, indeferido: 180, em_andamento: 105 },
  { date: "2024-04-08", deferido: 409, indeferido: 320, em_andamento: 67 },
  { date: "2024-04-09", deferido: 59, indeferido: 110, em_andamento: 98 },
  { date: "2024-04-10", deferido: 261, indeferido: 190, em_andamento: 55 },
  { date: "2024-04-11", deferido: 327, indeferido: 350, em_andamento: 73 },
  { date: "2024-04-12", deferido: 292, indeferido: 210, em_andamento: 112 },
  { date: "2024-04-13", deferido: 342, indeferido: 380, em_andamento: 78 },
  { date: "2024-04-14", deferido: 137, indeferido: 220, em_andamento: 85 },
  { date: "2024-04-15", deferido: 120, indeferido: 170, em_andamento: 100 },
  { date: "2024-04-16", deferido: 138, indeferido: 190, em_andamento: 60 },
  { date: "2024-04-17", deferido: 446, indeferido: 360, em_andamento: 75 },
  { date: "2024-04-18", deferido: 364, indeferido: 410, em_andamento: 102 },
  { date: "2024-04-19", deferido: 243, indeferido: 180, em_andamento: 97 },
  { date: "2024-04-20", deferido: 89, indeferido: 150, em_andamento: 85 },
  { date: "2024-04-21", deferido: 137, indeferido: 200, em_andamento: 112 },
  { date: "2024-04-22", deferido: 224, indeferido: 170, em_andamento: 79 },
  { date: "2024-04-23", deferido: 138, indeferido: 230, em_andamento: 92 },
  { date: "2024-04-24", deferido: 387, indeferido: 290, em_andamento: 67 },
  { date: "2024-04-25", deferido: 215, indeferido: 250, em_andamento: 105 },
  { date: "2024-04-26", deferido: 75, indeferido: 130, em_andamento: 88 },
  { date: "2024-04-27", deferido: 383, indeferido: 420, em_andamento: 115 },
  { date: "2024-04-28", deferido: 122, indeferido: 180, em_andamento: 72 },
  { date: "2024-04-29", deferido: 315, indeferido: 240, em_andamento: 97 },
  { date: "2024-04-30", deferido: 454, indeferido: 380, em_andamento: 63 },
  { date: "2024-05-01", deferido: 165, indeferido: 220, em_andamento: 89 },
  { date: "2024-05-02", deferido: 293, indeferido: 310, em_andamento: 112 },
  { date: "2024-05-03", deferido: 247, indeferido: 190, em_andamento: 74 },
  { date: "2024-05-04", deferido: 385, indeferido: 420, em_andamento: 103 },
  { date: "2024-05-05", deferido: 481, indeferido: 390, em_andamento: 67 },
  { date: "2024-05-06", deferido: 498, indeferido: 520, em_andamento: 120 },
  { date: "2024-05-07", deferido: 388, indeferido: 300, em_andamento: 62 },
  { date: "2024-05-08", deferido: 149, indeferido: 210, em_andamento: 98 },
  { date: "2024-05-09", deferido: 227, indeferido: 180, em_andamento: 84 },
  { date: "2024-05-10", deferido: 293, indeferido: 330, em_andamento: 66 },
  { date: "2024-05-11", deferido: 335, indeferido: 270, em_andamento: 115 },
  { date: "2024-05-12", deferido: 197, indeferido: 240, em_andamento: 90 },
  { date: "2024-05-13", deferido: 197, indeferido: 160, em_andamento: 82 },
  { date: "2024-05-14", deferido: 448, indeferido: 490, em_andamento: 76 },
  { date: "2024-05-15", deferido: 473, indeferido: 380, em_andamento: 110 },
  { date: "2024-05-16", deferido: 338, indeferido: 400, em_andamento: 95 },
  { date: "2024-05-17", deferido: 499, indeferido: 420, em_andamento: 75 },
  { date: "2024-05-18", deferido: 315, indeferido: 350, em_andamento: 112 },
  { date: "2024-05-19", deferido: 235, indeferido: 180, em_andamento: 89 },
  { date: "2024-05-20", deferido: 177, indeferido: 230, em_andamento: 102 },
  { date: "2024-05-21", deferido: 82, indeferido: 140, em_andamento: 97 },
  { date: "2024-05-22", deferido: 81, indeferido: 120, em_andamento: 58 },
  { date: "2024-05-23", deferido: 252, indeferido: 290, em_andamento: 115 },
  { date: "2024-05-24", deferido: 294, indeferido: 220, em_andamento: 85 },
  { date: "2024-05-25", deferido: 201, indeferido: 250, em_andamento: 74 },
  { date: "2024-05-26", deferido: 213, indeferido: 170, em_andamento: 108 },
  { date: "2024-05-27", deferido: 420, indeferido: 460, em_andamento: 72 },
  { date: "2024-05-28", deferido: 233, indeferido: 190, em_andamento: 64 },
  { date: "2024-05-29", deferido: 78, indeferido: 130, em_andamento: 100 },
  { date: "2024-05-30", deferido: 340, indeferido: 280, em_andamento: 112 },
  { date: "2024-05-31", deferido: 178, indeferido: 230, em_andamento: 68 },
  { date: "2024-06-01", deferido: 178, indeferido: 200, em_andamento: 77 },
  { date: "2024-06-02", deferido: 470, indeferido: 410, em_andamento: 110 },
  { date: "2024-06-03", deferido: 369, indeferido: 320, em_andamento: 95 },
  { date: "2024-06-04", deferido: 283, indeferido: 260, em_andamento: 85 },
  { date: "2024-06-05", deferido: 198, indeferido: 200, em_andamento: 72 },
  { date: "2024-06-06", deferido: 320, indeferido: 290, em_andamento: 110 },
  { date: "2024-06-07", deferido: 387, indeferido: 340, em_andamento: 95 },
  { date: "2024-06-08", deferido: 150, indeferido: 180, em_andamento: 89 },
  { date: "2024-06-09", deferido: 422, indeferido: 390, em_andamento: 112 },
  { date: "2024-06-10", deferido: 275, indeferido: 260, em_andamento: 67 },
  { date: "2024-06-11", deferido: 192, indeferido: 210, em_andamento: 95 },
  { date: "2024-06-12", deferido: 325, indeferido: 270, em_andamento: 105 },
  { date: "2024-06-13", deferido: 255, indeferido: 240, em_andamento: 76 },
  { date: "2024-06-14", deferido: 498, indeferido: 450, em_andamento: 120 },
  { date: "2024-06-15", deferido: 312, indeferido: 280, em_andamento: 95 },
  { date: "2024-06-16", deferido: 207, indeferido: 180, em_andamento: 88 },
  { date: "2024-06-17", deferido: 415, indeferido: 380, em_andamento: 73 },
  { date: "2024-06-18", deferido: 299, indeferido: 260, em_andamento: 102 },
  { date: "2024-06-19", deferido: 234, indeferido: 210, em_andamento: 66 },
  { date: "2024-06-20", deferido: 190, indeferido: 190, em_andamento: 85 },
  { date: "2024-06-21", deferido: 277, indeferido: 230, em_andamento: 78 },
  { date: "2024-06-22", deferido: 370, indeferido: 310, em_andamento: 110 },
  { date: "2024-06-23", deferido: 255, indeferido: 250, em_andamento: 98 },
  { date: "2024-06-24", deferido: 189, indeferido: 200, em_andamento: 89 },
  { date: "2024-06-25", deferido: 400, indeferido: 360, em_andamento: 77 },
  { date: "2024-06-26", deferido: 321, indeferido: 270, em_andamento: 95 },
  { date: "2024-06-27", deferido: 239, indeferido: 210, em_andamento: 102 },
  { date: "2024-06-28", deferido: 271, indeferido: 230, em_andamento: 84 },
  { date: "2024-06-29", deferido: 154, indeferido: 190, em_andamento: 78 },
  { date: "2024-06-30", deferido: 456, indeferido: 420, em_andamento: 112 },
];

const chartConfig = {
  deferido: {
    label: "Deferido",
    color: "hsl(var(--chart-3))",
  },
  indeferido: {
    label: "Indeferido",
    color: "hsl(var(--chart-2))",
  },
  em_andamento: {
    label: "Em andamento",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function StatusForRquests() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="col-span-full">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Status das Solicitações</CardTitle>
          <CardDescription>
            Mostrando a distribuição por status dos últimos 3 meses
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Selecione um valor">
            <SelectValue placeholder="Últimos 3 meses" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Últimos 3 meses
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Últimos 30 dias
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Últimos 7 dias
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="filldeferido" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-deferido)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-deferido)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillindeferido" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-indeferido)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-indeferido)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillemandamento" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-em_andamento)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-em_andamento)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("pt-BR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="deferido"
              type="natural"
              fill="url(#filldeferido)"
              stroke="var(--color-deferido)"
              stackId="a"
            />
            <Area
              dataKey="indeferido"
              type="natural"
              fill="url(#fillindeferido)"
              stroke="var(--color-indeferido)"
              stackId="a"
            />
            <Area
              dataKey="em_andamento"
              type="natural"
              fill="url(#fillemandamento)"
              stroke="var(--color-em_andamento)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
