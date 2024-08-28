"use client";
import { CitySelect } from "@/components/CitySelect";
import { StateSelect } from "@/components/StateSelect";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Country, useCountryCity, useCountryState } from "@/hooks/useCountry";
import { useCountryPopulation } from "@/hooks/usePopulation";
import {
  useCountryTemperatureYearChanges,
  useTemperature,
} from "@/hooks/useTempeture";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useYearSelect, { YearRange } from "@/hooks/useYearSelect";
import YearSelect from "../YearSelect";

const TemperatureTable = dynamic(
  () => import("@/components/TemperatureTable"),
  {
    ssr: false,
  }
);

const CompareSection = ({
  dateRange,
  setDateRange,
  countryCode,
}: {
  dateRange: YearRange;
  setDateRange: Dispatch<SetStateAction<YearRange>>;
  countryCode: string;
}) => {
  const { data: yearChange, isFetching } = useCountryTemperatureYearChanges(
    countryCode,
    {
      startDate: Number(dateRange.from),
      endDate: Number(dateRange.to),
    }
  );

  return (
    <Card>
      <CardHeader>Compare data between 2 years of the whole region</CardHeader>
      <CardContent className="">
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
          <div className="p-3 rounded border mt-3">
            <h3>
              Changes between year {dateRange.from} to {dateRange.to}
            </h3>

            <div>
              <p>
                {dateRange.from} Average Temperature: {yearChange?.startAmount}
              </p>
              <p>
                {dateRange.from} Min Temperature: {yearChange?.startAmountMin}
              </p>
              <p>
                {dateRange.from} Max Temperature: {yearChange?.startAmountMax}
              </p>
            </div>

            <div className="mt-2">
              <p>
                {dateRange.to} Average Temperature: {yearChange?.endAmount}
              </p>
              <p>
                {dateRange.to} Min Temperature: {yearChange?.endAmountMin}
              </p>
              <p>
                {dateRange.to} Max Temperature: {yearChange?.endAmountMax}
              </p>
            </div>
            <div className="mt-3 text-lg">
              <p>
                Average Temperature Changes:{" "}
                {yearChange?.percentageChange?.toFixed(2)} %
              </p>
              <p>
                Min Temperature Changes:{" "}
                {yearChange?.percentageChangeMin?.toFixed(2)} %
              </p>
              <p>
                Max Temperature Changes:{" "}
                {yearChange?.percentageChangeMax?.toFixed(2)} %
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const TemperatureSection = ({
  selectedCountry,
}: {
  selectedCountry: Country;
}) => {
  const countryCode = selectedCountry.countryCode;

  const [citySelect, setCitySelect] = useState("");
  const [stateSelect, setStateSelect] = useState("");

  const { data: cities } = useCountryCity(countryCode);
  const { data: states } = useCountryState(countryCode);

  const [dateRange, setDateRange] = useYearSelect();

  const { data: temperatureData } = useTemperature(countryCode, {
    cityId: citySelect,
  });
  const { data: populationData } = useCountryPopulation(countryCode);

  return (
    <div>
      <h2 className="mb-3">Yearly temperature of {selectedCountry.name} </h2>

      <CompareSection
        dateRange={dateRange}
        setDateRange={setDateRange}
        countryCode={countryCode}
      />

      <div className="mb-3">
        {citySelect && (
          <>
            {" "}
            City: {cities?.find((c) => c.id.toString() === citySelect)?.name}
          </>
        )}
        {stateSelect && (
          <>
            {" "}
            State: {states?.find((c) => c.id.toString() === stateSelect)?.name}
          </>
        )}
      </div>

      <div className="flex gap-3">
        <CitySelect
          value={citySelect}
          countryId={countryCode}
          onValueChange={(v) => {
            setCitySelect(v);
            setStateSelect("");
          }}
        />

        <StateSelect
          value={stateSelect}
          countryId={countryCode}
          onValueChange={(v) => {
            setStateSelect(v);
            setCitySelect("");
          }}
        />

        <Button
          onClick={() => {
            setCitySelect("");
            setStateSelect("");
          }}
        >
          Clear Selection
        </Button>
      </div>

      <div className="items-center my-3 w-full">
        <Tabs defaultValue="table">
          <TabsList>
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="chart" disabled={temperatureData?.length === 0}>
              Chart
            </TabsTrigger>
          </TabsList>

          <TabsContent value="table">
            {temperatureData && (
              <div className="mt-3 border-solid border-2 rounded-lg p-2">
                <TemperatureTable data={temperatureData ?? []} />
              </div>
            )}
          </TabsContent>
          <TabsContent value="chart">
            {temperatureData && (
              <div className="mt-3 border-solid border-2 rounded-lg p-2">
                <TemperatureTable
                  data={temperatureData ?? []}
                  asChart
                  withPopulationData={true}
                  populationData={populationData ?? []}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TemperatureSection;
