import { TooltipProps } from "recharts";

const CustomTooltip: React.FC<TooltipProps<number, "">> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="tooltip">
        <p>{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={`tooltip-${index}`}>{`${entry.dataKey} : ${entry.value}`}</p>
        ))}
      </div>
    );
  }

  return null;
};


export { CustomTooltip };