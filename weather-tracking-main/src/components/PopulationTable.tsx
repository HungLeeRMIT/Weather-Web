"use client";
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar, Line, TooltipProps } from "recharts";
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
import { CustomTooltip } from "./chart";
import { formatNumber } from "@/lib/utils";

export interface YearPopulation {
  year: number;
  amount: number;
}

interface Props {
  data: YearPopulation[];
  asChart?: boolean;
}

export const columns: ColumnDef<YearPopulation>[] = [
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell({cell}) {
        return formatNumber(cell.getValue() as number)
    },
  },
];



const PopulationTable = (props: Props) => {

  const table = useReactTable({
    data: props.data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (props.asChart) {
    return (
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={props.data}>
          <XAxis
            dataKey="year"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            width={70}
            yAxisId="left"
            stroke="#888888"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => formatNumber(value)}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="amount"
            fill="#adfa1d"
            radius={[4, 4, 0, 0]}
            yAxisId="left"
            label="Population"
          />
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

export default PopulationTable;
