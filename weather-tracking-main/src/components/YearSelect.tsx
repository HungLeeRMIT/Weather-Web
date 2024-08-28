import { SelectProps } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { YearRange } from "@/hooks/useYearSelect";

const years = (() => {
  const arr = [];
  for (let i = 1960; i < 2013; i++) {
    arr.push(i);
  }
  return arr;
})();



const YearSelect = (
  props: SelectProps & {
    dateRange?: YearRange;
  }
) => {
  return (
    <Select {...props}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a year" />
      </SelectTrigger>
      <SelectContent>
        {years.map((y) => {
          
          if (props.dateRange?.from) {
            if (y <= Number(props.dateRange?.from)) {
              return null;
            }
          }
          return (
            <SelectItem key={y} value={y.toString()}>
              {y}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default YearSelect;
