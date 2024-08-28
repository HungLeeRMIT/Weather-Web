"use client";
import PopulationSection from "@/components/screen/PopulationSection";
import TemperatureSection from "@/components/screen/TemperatureSection";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AllowedCountryFilterTypes,
  Country,
  CountryFilter,
  useCountry,
} from "@/hooks/useCountry";
import { cn } from "@/lib/utils";
import { AlertCircle, ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

const DetailPageCountry = ({
  selectedCountry,
}: {
  selectedCountry: Country;
}) => {
  return (
    <>
      {!selectedCountry.countryCode ? (
        <div className="w-full h-fit flex place-content-center">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Select a country on the left sidebar</AlertTitle>
            <AlertDescription>
              Select a country on the left sidebar for population and
              temperature view
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <div className="w-3/4" key={selectedCountry.countryCode}>
          <div className="mb-3">
            <h1 className="text-2xl mb-3">{selectedCountry.name}</h1>
            <Separator />
          </div>

          <Tabs defaultValue="population">
            <TabsList className="w-full">
              <TabsTrigger value="population">Population</TabsTrigger>
              <TabsTrigger value="temperature">Temperature</TabsTrigger>
            </TabsList>

            <TabsContent value="population">
              <PopulationSection selectedCountry={selectedCountry} />
            </TabsContent>

            <TabsContent value="temperature">
              <TemperatureSection selectedCountry={selectedCountry} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const SortButton = ({
  name,
  filter,
  setFilter,
}: {
  name: AllowedCountryFilterTypes;
  filter: CountryFilter;
  setFilter: Dispatch<SetStateAction<CountryFilter>>;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            className="gap-2"
            variant={filter.type === name ? "secondary" : "outline"}
            onClick={() => {
              setFilter({
                type: name,
                direction: filter.direction === "asc" ? "desc" : "asc",
              });
            }}
          >
            {filter.type === name ? (
              filter.direction === "asc" ? (
                <ArrowUp />
              ) : (
                <ArrowDown />
              )
            ) : (
              <ArrowUpDown />
            )}
            {capitalizeFirstLetter(name)}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Population and temperature is sorted by 2013 data
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const DetailPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<CountryFilter>({
    direction: "asc",
    type: "population",
  });

  const { data } = useCountry(filter);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    name: "United States",
    countryCode: "USA",
  });

  return (
    <>
      <div>
        <Input
          className="w-full mb-2"
          placeholder="Search"
          onChange={(v) => {
            setSearch(v.target.value);
          }}
        />
        <div className="flex gap-2 w-full">
          <SortButton filter={filter} setFilter={setFilter} name="name" />
          <SortButton
            filter={filter}
            setFilter={setFilter}
            name="temperature"
          />
          <SortButton filter={filter} setFilter={setFilter} name="population" />
        </div>
      </div>

      <div className="flex mt-5">
        <div
          className={cn(
            "flex flex-col h-screen overflow-y-scroll mr-5 pr-10 w-[300px]"
          )}
        >
          {data
            ?.filter((c) => {
              return c.name
                .toLowerCase()
                .includes(search.toLowerCase().normalize());
            })
            .map((item) => (
              <p
                key={item.countryCode}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "hover:bg-transparent hover:underline",
                  item.countryCode === selectedCountry.countryCode &&
                    "dark:bg-zinc-800 dark:text-zinc-5 underline",
                  "justify-start"
                )}
                onClick={() => {
                  setSelectedCountry(item);
                }}
              >
                {item.name}
              </p>
            ))}
        </div>

        {/*  */}
        <DetailPageCountry selectedCountry={selectedCountry} />
      </div>
    </>
  );
};

export default DetailPage;
