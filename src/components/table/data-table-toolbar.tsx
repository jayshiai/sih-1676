"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { severities, vendors } from "@/config/table";
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("title") && (
          <Input
            placeholder="Search Title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {table.getColumn("product_name") && (
          <Input
            placeholder="Search Products..."
            value={
              (table.getColumn("product_name")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("product_name")
                ?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {table.getColumn("vendor") && (
          <Input
            placeholder="Search Vendors..."
            value={
              (table.getColumn("vendor")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("vendor")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {table.getColumn("vendor") && (
          <DataTableFacetedFilter
            column={table.getColumn("vendor")}
            title="Vendors"
            options={vendors}
          />
        )}
        {table.getColumn("severity") && (
          <DataTableFacetedFilter
            column={table.getColumn("severity")}
            title="Severity"
            options={severities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
