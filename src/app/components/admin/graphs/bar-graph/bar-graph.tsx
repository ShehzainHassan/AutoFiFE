import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { BarGraphProps, MyData } from "./bar-graph.types";
import classes from "./bar-graph.module.css";
import type { TooltipProps } from "recharts";

export default function BarGraph({ data, viewReport }: BarGraphProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = (props: TooltipProps<number, string>) => {
    const { active, payload } = props as TooltipProps<number, string> & {
      payload: MyData[];
    };
    if (active && payload && payload.length) {
      const item = payload[0];
      const category = item.payload?.category;
      const value = item.payload.value;

      return (
        <div
          style={{
            background: "#fff",
            padding: "6px 10px",
            borderRadius: "6px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            zIndex: 1000,
          }}>
          <p style={{ margin: 0 }}>{`${category}: ${value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={classes.container}>
      <div className={classes.textContainer}>
        <div className={classes.header}>
          <h3>Auctions by Category</h3>
          {viewReport}
        </div>
        <h1>{total.toLocaleString()}</h1>
        <p>
          Total auctions this period <span>+10%</span>
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300} className={classes.chart}>
        <BarChart data={data}>
          <CartesianGrid vertical={false} horizontal={false} />
          <XAxis dataKey="category" axisLine={false} tickLine={false} />
          <YAxis hide axisLine={false} tickLine={false} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
          <Bar
            dataKey="value"
            fill="#61A5FA"
            radius={[10, 10, 0, 0]}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
