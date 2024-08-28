import { useCountryPopulation } from "@/hooks/usePopulation";
import { Bar, BarChart, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function generateFakeData() {
  const fakeData = [];

  for (let year = 2000; year <= 2013; year++) {
    const dataPoint = {
      name: String(year),
      total: Math.floor(Math.random() * 5000) + 1000,
      minTemp: Math.floor(Math.random() * 10),
      averageTemp: Math.floor(Math.random() * 10),
      maxTemp: Math.floor(Math.random() * 10),
    };

    fakeData.push(dataPoint);
  }

  return fakeData;
}

const fakeData = generateFakeData();

interface Props {
  country: string;
  state?: string;
  city?: string;
}

export function PopulationChangeOverview(props: Props) {

  const {} = useCountryPopulation(props.country)

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart data={fakeData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          yAxisId="left"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Bar
          dataKey="total"
          fill="#adfa1d"
          radius={[4, 4, 0, 0]}
          yAxisId="left"
        />
        <Line
          type="monotone"
          dataKey="minTemp"
          stroke="#8884d8"
          yAxisId="right"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="averageTemp"
          stroke="#82ca9d"
          yAxisId="right"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="maxTemp"
          stroke="#ff7300"
          yAxisId="right"
          strokeWidth={2}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
