import { useState } from "react";

export interface YearRange {
  from?: number | string;
  to?: number | string;
}

const useYearSelect = (initial?: YearRange) => {
  const [date, setDate] = useState<YearRange>({
    from: initial?.from,
    to: initial?.to,
  });

  return [date, setDate] as const;
};

export default useYearSelect;
