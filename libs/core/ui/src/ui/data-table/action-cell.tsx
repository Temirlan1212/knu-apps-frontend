'use client';
import { Row } from '@tanstack/react-table';
import { Edit2, Trash } from 'lucide-react';
import { Button } from '@/ui/button';
import Link from 'next/link';

export const ActionCell = ({
  row,
  onDelete,
  onUpdate,
}: {
  row: Row<any>;
  onDelete?: (row: Row<any>) => void;
  onUpdate?: (row: Row<any>) => void;
}) => {
  const handleDelete = async (row: Row<any>) => {
    onDelete && onDelete(row);
  };

  let content = null;
  if (!!onDelete) {
    content = (
      <Button
        onClick={() => handleDelete(row)}
        variant="outline"
        className="p-[10px]"
      >
        <Trash className="w-[15px] text-muted-foreground h-[15px]" />
      </Button>
    );
  }

  if (!!onUpdate) {
    content = (
      <Link passHref href={``}>
        <Button variant="outline" className="p-[10px]">
          <Edit2 className="w-[15px] text-muted-foreground h-[15px]" />
        </Button>
      </Link>
    );
  }

  return <div className="flex justify-end gap-2">{content}</div>;
};
