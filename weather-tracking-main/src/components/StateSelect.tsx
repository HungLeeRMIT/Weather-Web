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
import { useCountryState } from "@/hooks/useCountry";
import { SelectProps } from "@radix-ui/react-select";


interface Props extends SelectProps {
  countryId: string;
}

export function StateSelect(props: Props) {
  const { data } = useCountryState(props.countryId);

  return (
    <Select {...props}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a state" />
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
