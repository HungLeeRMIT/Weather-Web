import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface Country {
  countryCode: string;
  name: string;
}
interface StateWithoutCountry {
  id: number;
  name: string;
}
interface CityWithoutCountry {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export type AllowedCountryFilterTypes = "population" | "temperature" | "name";
export interface CountryFilter {
  type: AllowedCountryFilterTypes;
  direction: "asc" | "desc";
}



export const useCountry = (filter?: CountryFilter) => {
  return useQuery({
    queryKey: ["country", filter],
    queryFn: async (): Promise<Country[]> => {
      return (
        await api.get("country", {
          params: filter,
        })
      ).data;
    },
  });
};

export const useCountryState = (countryId: string) => {
  return useQuery({
    queryKey: ["country", countryId, "state"],
    queryFn: async (): Promise<StateWithoutCountry[]> => {
      return (
        await api.get("country/states", {
          params: {
            countryCode: countryId,
          },
        })
      ).data;
    },
  });
};




export const useCountryCity = (countryId: string) => {
  return useQuery({
    queryKey: ["country", countryId, "city"],
    queryFn: async (): Promise<CityWithoutCountry[]> => {
      return (
        await api.get("country/cities", {
          params: {
            countryCode: countryId,
          },
        })
      ).data;
    },
  });
};
