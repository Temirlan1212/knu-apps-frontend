'use client';
import { Plus } from 'lucide-react';
import { Button, ButtonProps } from '@/ui/button';

export function AddAction(props: ButtonProps) {
  return (
    <Button variant="outline" className="p-[10px]" {...props}>
      <Plus className="w-[15px] text-muted-foreground h-auto" />
    </Button>
  );
}
