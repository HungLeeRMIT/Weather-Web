"use client";
import { YearTemperature } from "@/hooks/useTempeture";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  LineChart,
  Line,
} from "recharts";
import { CustomTooltip } from "./chart";
import { YearPopulation } from "./PopulationTable";
import { useMemo } from "react";

interface Props {
  data: YearTemperature[];
  populationData?: YearPopulation[];
  asChart?: boolean;
  withPopulationData?: boolean;
}

export const columns: ColumnDef<YearTemperature>[] = [
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "averageTemp",
    header: "Average",
  },
  {
    accessorKey: "minTemp",
    header: "Min",
  },
  {
    accessorKey: "maxTemp",
    header: "Max",
  },
];

interface YearTemperatureWithPopulation extends YearTemperature {
  population: number;
}

const TemeperatureTable = (props: Props) => {
  const table = useReactTable({
    data: props.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const mergedData = useMemo<YearTemperatureWithPopulation[]>(() => {
    return props.data.map((d) => {

      return {
        ...d,
        population: props.populationData?.find((d2) => d2.year === d.year)
          ?.amount ?? 0,
      };
    });
  }, [props.data, props.populationData]);

  if (props.withPopulationData && !props.asChart) {
    return <h1>Wrong props pass in</h1>;
  }

  if (props.asChart) {
    return (
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={mergedData}>
          <XAxis
            dataKey="year"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            yAxisId="temp"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={<CustomTooltip label="year" />} />
          <Line
            // data={props.data}
            dataKey="maxTemp"
            fill="#adaa1d"
            yAxisId="temp"
          />
          <Line
            // data={props.data}
            dataKey="averageTemp"
            fill="#bdaa1d"
            yAxisId="temp"
          />
          <Line
            // data={props.data}
            dataKey="minTemp"
            fill="#cdaa1d"
            yAxisId="temp"
          />
          {props.withPopulationData && props.populationData && (
            <>
              <YAxis
                yAxisId="pop"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                orientation="right"
                tickFormatter={(value) => `${value}`}
              />
              <Bar
                dataKey="population"
                label="population"
                yAxisId="pop"
                fill="#555"
              />
            </>
          )}
        </ComposedChart>
      </ResponsiveContainer>
    );
  }

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TemeperatureTable;
