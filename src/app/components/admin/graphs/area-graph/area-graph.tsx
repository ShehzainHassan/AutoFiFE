import Dropdown from "@/app/components/dropdown";
import {
  Area,
  AreaChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AreaGraphProps } from "./area-graph.types";
import Loading from "@/app/components/loading";

const AreaGraph = ({
  data,
  title,
  period,
  setPeriod,
  periodOptions,
  pecentageChange,
  isLoading = false,
}: AreaGraphProps) => {
  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
  };

  const xAxisInterval = data.length <= 10 ? 0 : Math.floor(data.length / 8);
  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <div
      style={{
        marginTop: "32px",
        width: "100%",
        backgroundColor: "#FFFFFF",
        border: "2px solid #E2E8F0",
        borderRadius: "8px",
        padding: "20px",
      }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <div>
          <h3
            style={{
              margin: 0,
              marginBottom: "10px",
              fontSize: "18px",
              color: "#2D3748",
            }}>
            {title}
          </h3>
          <div>{pecentageChange}</div>
        </div>
        <Dropdown value={period} onChange={handlePeriodChange}>
          <Dropdown.Select options={periodOptions} />
        </Dropdown>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          margin={{ top: 10, right: 30, left: -30, bottom: 0 }}
          data={data}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#007BFF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#007BFF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            interval={xAxisInterval}
            tickFormatter={(label: string) => {
              if (/^[A-Za-z]+\s\d{4}$/.test(label)) {
                const month = label.split(" ")[0];
                return month.slice(0, 3);
              }

              if (/^\d{4}-\d{2}-\d{2}$/.test(label)) {
                const date = new Date(label);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }

              return label;
            }}
          />

          <YAxis axisLine={false} tick={false} tickLine={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#007BFF"
            strokeWidth={2}
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#007BFF"
            fill="url(#colorRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaGraph;
