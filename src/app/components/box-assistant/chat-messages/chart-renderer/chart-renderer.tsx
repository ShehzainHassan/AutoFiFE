"use client";
import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "var(--color-purple400)",
  "var(--color-green600)",
  "var(--color-yellow500)",
  "var(--color-blue300)",
];

export type ChartRendererProps = {
  chartType: "bar" | "line" | "pie";
  chartData: Record<string, unknown>[];
};

export const ChartRenderer: React.FC<ChartRendererProps> = ({
  chartType,
  chartData,
}) => {
  if (!chartData || chartData.length === 0) return <p>No chart data</p>;

  const firstRow = chartData[0];

  const numericKeys = Object.keys(firstRow).filter(
    (key) => typeof firstRow[key] === "number"
  );
  const valueKey = numericKeys[0] || "";

  const categoryKey =
    Object.keys(firstRow).find((k) => typeof firstRow[k] === "string") || "";

  switch (chartType) {
    case "line":
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey={categoryKey} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={valueKey} stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      );
    case "pie":
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey={valueKey}
              nameKey={categoryKey}
              cx="50%"
              cy="50%"
              outerRadius={80}>
              {chartData.map((_, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    case "bar":
    default:
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey={categoryKey} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={valueKey} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      );
  }
};
