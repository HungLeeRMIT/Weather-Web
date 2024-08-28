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
import { SelectProps } from "@radix-ui/react-select";
import { useCountryCity } from "@/hooks/useCountry";

interface Props extends SelectProps {
  countryId: string;
}

export function CitySelect(props: Props) {
  const {data} = useCountryCity(props.countryId)
  return (
    <Select {...props} >
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a city" />
      </SelectTrigger>
      <SelectContent>
        {data?.map((item) => (
          <SelectItem key={item.id} value={item.id.toString()}>
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
