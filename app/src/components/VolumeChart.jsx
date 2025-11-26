import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getVolume } from "@/queries/dashboard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";
import { Check } from "lucide-react";
import { Button } from "./ui/button";

const chartConfig = {
  weight: {
    label: "Charge totale (kg)",
    color: "var(--chart-1)",
  },
  repetitions: {
    label: "Nombre de répétitions",
    color: "var(--chart-2)",
  },
  rest: {
    label: "temps de repos (s)",
    color: "var(--chart-3)",
  },
};

export const VolumeChart = () => {
  const [activeChart, setActiveChart] = useState("weight");
  const [charts, setCharts] = useState(["weight", "repetitions", "rest"]);
  const options = [
    { value: "weight", label: "Weight" },
    { value: "repetitions", label: "Repetitions" },
    { value: "rest", label: "Rest" },
  ];

  const labelByValue = Object.fromEntries(
    options.map((o) => [o.value, o.label])
  );

  const toggle = (v) => {
    setCharts((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  };

  const { data, isLoading, isError } = useQuery({
    queryFn: getVolume,
    queryKey: ["dashboard"],
  });

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Error</div>;
  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Volume d'entrainement</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="w-[180px] p-2 border rounded-lg flex justify-between">
              {charts.length === 0
                ? "Select metrics"
                : charts
                    .map((c) => {
                      return labelByValue[c];
                    })

                    .join(", ")}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="p-0 w-[200px]">
            <Command>
              <CommandList>
                <CommandGroup>
                  {options.map((opt) => (
                    <CommandItem
                      key={opt.value}
                      onSelect={() => toggle(opt.value)}
                    >
                      <Check
                        className={
                          charts.includes(opt.value)
                            ? "mr-2 h-4 w-4 opacity-100"
                            : "mr-2 h-4 w-4 opacity-0"
                        }
                      />
                      {opt.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="createdAt"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("fr-FR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("fr-FR", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            {charts.map((c) => (
              <Line
                dataKey={c}
                type="monotone"
                stroke={`var(--color-${c})`}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
