import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

interface Props {
    title: string;
    number?: number;
}

const StatisticCard = (props: Props) => {
  return (
    <Card className="w-[200px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {props.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{props.number ?? 0}</div>
      </CardContent>
    </Card>
  );
};

export default StatisticCard;