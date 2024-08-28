import { useQuery } from "@tanstack/react-query"
import api from '@/lib/api'

interface MaxRange {
    min: number;
    max: number
}

interface Params {
  stateId: string;
  cityId: string;
}

export interface YearTemperature {
  year: number;
  averageTemp: number;
  minTemp: number;
  maxTemp: number;
}

export const useTemperature = (countryCode: string, filter: {cityId?: string, stateId?: string}) => {
  if (filter.cityId && filter.stateId) {
    throw new Error("Can't filter by both state and city")
  }
    return useQuery({
      queryKey: ["temperature", countryCode, filter],
      queryFn: async (): Promise<YearTemperature[]> => {
        return (await api.get(`temperature/${countryCode}`, {
          params: filter
        })).data;
      },
    });
}

interface ChangesParams {
  startDate?: number;
  endDate?: number;
}

interface TemperatureChangesDto {
  startAmount: number;
  endAmount: number;
  percentageChange: number;
  startAmountMin: number;
  endAmountMin: number;
  percentageChangeMin: number;
  startAmountMax: number;
  endAmountMax: number;
  percentageChangeMax: number;
}

export const useCountryTemperatureYearChanges = (
  country: string,
  params: ChangesParams
) => {
  return useQuery({
    queryKey: ["temperature", "year-changes", country, params],
    queryFn: async (): Promise<TemperatureChangesDto> => {
      return (
        await api.get(`temperature/year-changes/${country}`, {
          params,
        })
      ).data;
    },
    enabled: Boolean(params.startDate && params.endDate),
  });
};
