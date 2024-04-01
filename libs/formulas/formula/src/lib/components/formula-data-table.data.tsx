import { Checkbox } from '@/libs/core/ui/src/ui/checkbox';
import { Category } from '@/libs/formulas/utils/types';
import { ColumnDef } from '@tanstack/react-table';

export const categoryColumns: ColumnDef<Category>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          !!table.getIsAllPageRowsSelected() ||
          !!(table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: () => <div className="text-right">Название</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue('title')}</div>
      );
    },
  },
  {
    accessorKey: 'latex',
    header: () => <div className="text-right">Формула</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue('latex')}</div>
      );
    },
  },
  {
    accessorKey: 'description',
    header: () => <div className="text-right">Описание</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.getValue('description')}
        </div>
      );
    },
  },
];
