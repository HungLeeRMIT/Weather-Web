import { useQuery } from "@tanstack/react-query"
import api from '@/lib/api'

interface MaxRange {
    min: number;
    max: number
}

interface Population {
  id: number;
  year: number;
  amount: number;
}

interface PopulationChangeDto {
  startAmount: number;
  endAmount: number;
  percentageChange: number;
}

export const usePopulation = () => {
    return useQuery({
      queryKey: ["population"],
      queryFn: async (): Promise<MaxRange> => {
        return (await api.get("population/year-range")).data;
      },
    });
}

export const useCountryPopulation = (country: string) => {
  return useQuery({
    queryKey: ["population", country],
    queryFn: async (): Promise<Population[]> => {
      return (
        await api.get("population", {
          params: {
            countryCode: country,
          },
        })
      ).data;
    },
  });
};

interface Params {
  startDate?: number;
  endDate?: number
}

export const useCountryPopulationYearChanges = (country: string, params: Params) => {
  return useQuery({
    queryKey: ["population", "year-changes", country, params],
    queryFn: async (): Promise<PopulationChangeDto> => {
      return (
        await api.get(`population/year-changes/${country}`, {
          params,
        })
      ).data;
    },
    enabled: Boolean(params.startDate && params.endDate),
  });
};

interface CountryPopulation {
  country: {
    countryCode: string;
    name: string
  },
  amount: number
}

export const usePopulationCountryRank = () => {
  return useQuery({
    queryKey: ["population", "country-rank"],
    queryFn: async (): Promise<CountryPopulation[]> => {
      return (await api.get(`population/country-rank`)).data;
    },
    initialData: [] as CountryPopulation[],
  });
}
