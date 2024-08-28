import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCountry } from "@/hooks/useCountry";

interface Props {
  onValueChange?: (value: string) => void;
}

export function CountrySelect(props: Props) {
  const {data} = useCountry()
  return (
    <Select onValueChange={props.onValueChange}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        {data?.map((item) => (
          <SelectItem key={`${item.countryCode}`} value={item.countryCode}>
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
