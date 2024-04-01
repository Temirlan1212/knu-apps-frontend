'use client';
import { Row } from '@tanstack/react-table';
import { Edit2, Trash } from 'lucide-react';
import { Button } from '@/ui/button';
import { Formula } from '@/libs/formulas/utils/types';

export const ActionCell = ({
  row,
  onDelete,
  onEdit,
}: {
  row: Row<Formula>;
  onDelete?: (id: string) => void;
  onEdit?: (id: Row<Formula>['original']) => void;
}) => {
  const id = row.original.id;

  const handleDelete = async (id: string) => {
    onDelete && onDelete(id);
  };

  const handleEdit = async (id: string) => {
    onEdit && onEdit(row.original);
  };

  if (!id) return null;

  return (
    <div className="flex justify-end gap-2">
      <Button
        onClick={() => handleDelete(id)}
        variant="outline"
        className="p-[10px]"
      >
        <Trash className="w-[15px] text-muted-foreground h-[15px]" />
      </Button>

      <Button
        variant="outline"
        className="p-[10px]"
        onClick={() => handleEdit(id)}
      >
        <Edit2 className="w-[15px] text-muted-foreground h-[15px]" />
      </Button>
    </div>
  );
};
