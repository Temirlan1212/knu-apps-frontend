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
    accessorKey: 'label',
    header: () => <div className="text-right">Название</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue('label')}</div>
      );
    },
  },
];
