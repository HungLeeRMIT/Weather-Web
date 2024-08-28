import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

interface Meta {
  "totalGlobalTemperatureDataPoint": number,
  "totalGlobalPopulationDataPoint": number,
  "totalCountryDataPoint": number,
  "totalCityDataPoint": number,
  "totalStateDataPoint": number,
  "totalCountry": number,
  "totalState": number,
  "totalCity": number,
  "minYear": number,
  "maxYear": number,
}


export const useMeta = () => {
  return useQuery({
    queryKey: ["meta"],
    queryFn: async (): Promise<Meta> => {
      return (
        await api.get("meta")
      ).data;
    },
  });
};