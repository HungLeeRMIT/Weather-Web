import { usePopulationCountryRank } from "@/hooks/usePopulation";
import { formatNumber } from "@/lib/utils";
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar, Line, Legend } from "recharts";
import { CustomTooltip } from "./chart";

const RankingView = () => {
    const {data} = usePopulationCountryRank();
    return (
      <ResponsiveContainer width="100%" height={2000}>
        <ComposedChart data={data} layout="vertical">
          <XAxis
            dataKey="amount"
            type="number"
            scale={"sqrt"}
            tickFormatter={(value) => formatNumber(value)}
          />
          <YAxis width={100} dataKey={"country.name"} type="category" />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid strokeDasharray="3 3" />
          <Legend />
          <Bar dataKey="amount" fill="#adfa1d" />
        </ComposedChart>
      </ResponsiveContainer>
    );
}

export default RankingView