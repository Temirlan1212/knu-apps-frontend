'use client';
import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  CoreRow,
  RowSelectionState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table';
import { TableProps } from './row-control-menu';

export interface IDataTableProps {
  data: any[];
  columns: ColumnDef<any>[];
  rowSelection?: RowSelectionState;
  fields?: {
    getRowIdField?: string;
  };
  slots?: {
    headerLeftBlock?: (table: TableProps<any>) => React.ReactNode;
    headerRightBlock?: (table: TableProps<any>) => React.ReactNode;
  };
  onRowSelectionChange?: (value: RowSelectionState | undefined) => void;
  onOrigininalRowSelectionChange?: (value: CoreRow<any>['original'][]) => void;
}

export function DataTable({
  data,
  columns,
  slots,
  onRowSelectionChange,
  onOrigininalRowSelectionChange,
  ...rest
}: IDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const rowId = React.useId();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState(
    rest.rowSelection ? rest.rowSelection : {}
  );

  const table = useReactTable({
    data: data,
    columns: columns as any,
    getRowId: (row) => row?.[rest.fields?.getRowIdField || 'id'] || rowId,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting: sorting,
      columnFilters,
      columnVisibility,
      rowSelection: rowSelection,
    },
  });

  React.useEffect(() => {
    onRowSelectionChange && onRowSelectionChange(rowSelection);
    const originals = table
      .getSelectedRowModel()
      .rows.map((row) => row.original);
    onOrigininalRowSelectionChange && onOrigininalRowSelectionChange(originals);
  }, [rowSelection]);

  return (
    <div className="w-full">
      <div className="flex items-center pb-4 justify-between gap-2 flex-wrap">
        <div className="max-w-full w-full md:w-[fit-content]">
          {slots?.headerLeftBlock && slots?.headerLeftBlock(table)}
        </div>
        <div className="flex items-center gap-2 w-full md:w-[fit-content]">
          {slots?.headerRightBlock && slots?.headerRightBlock(table)}
        </div>
      </div>
      <div className="rounded-md border">
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
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Нету данных
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
