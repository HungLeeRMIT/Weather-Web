"use client";
import YearSelect from "@/components/YearSelect";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Country } from "@/hooks/useCountry";
import {
  useCountryPopulation,
  useCountryPopulationYearChanges,
} from "@/hooks/usePopulation";
import useYearSelect, { YearRange } from "@/hooks/useYearSelect";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useState } from "react";

const PopulationTable = dynamic(() => import("@/components/PopulationTable"), {
  ssr: false,
});

const CompareSection = ({
  dateRange,
  setDateRange,
  countryCode,
}: {
  dateRange: YearRange;
  setDateRange: Dispatch<SetStateAction<YearRange>>;
  countryCode: string;
}) => {
  const { data: yearChange, isFetching } = useCountryPopulationYearChanges(
    countryCode,
    {
      startDate: Number(dateRange.from),
      endDate: Number(dateRange.to),
    }
  );

  return (
    <div className="my-3">
      <h2>Compare data between 2 years</h2>
      <div className="flex gap-3 my-3">
        <div>
          <Label htmlFor="startYear">Select start year</Label>

          <YearSelect
            value={dateRange.from?.toString()}
            onValueChange={(v) => {
              setDateRange({
                from: Number(v),
                to: "",
              });
            }}
          />
        </div>

        <div>
          <Label htmlFor="endYear">Select end year</Label>
          <YearSelect
            value={dateRange.to?.toString() ?? ""}
            disabled={!dateRange.from}
            dateRange={dateRange}
            onValueChange={(v) => {
              setDateRange({
                ...dateRange,
                to: Number(v),
              });
            }}
          />
        </div>
      </div>

      {dateRange.from && dateRange.to && !isFetching && (
        <div>
          <Card>
            <CardHeader>
              Changes between year {dateRange.from} to {dateRange.to}
            </CardHeader>
            <CardContent>
              <div>
                {dateRange.from} Population: {yearChange?.startAmount}
              </div>
              <div>
                {dateRange.to} Population: {yearChange?.endAmount}
              </div>
              <div className="mt-3 text-lg">
                Population Changes: {yearChange?.percentageChange?.toFixed(2)} %
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

const PopulationSection = ({
  selectedCountry,
}: {
  selectedCountry: Country;
}) => {
  const countryCode = selectedCountry.countryCode;
  const { data: populationData } = useCountryPopulation(countryCode);

  const [dateRange, setDateRange] = useYearSelect();

  return (
    <div>
      <CompareSection
        countryCode={countryCode}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <Separator />

      <div className="items-center my-3 w-full">
        <Tabs defaultValue="table">
          <TabsList>
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="chart">Chart</TabsTrigger>
          </TabsList>

          <TabsContent value="table">
            {populationData && (
              <div className="mt-3 border-solid border-2 rounded-lg p-2">
                <PopulationTable data={populationData} />
              </div>
            )}
          </TabsContent>
          <TabsContent value="chart">
            {populationData && (
              <div className="mt-3 border-solid border-2 rounded-lg p-2">
                <PopulationTable data={populationData} asChart />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PopulationSection;
