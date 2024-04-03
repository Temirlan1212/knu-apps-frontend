import { Button } from '@/ui/button';

export interface SimplePaginationProps {
  onPrev: () => void;
  onNext: () => void;
  props?: {
    nextBtn?: {
      loading?: boolean;
      disabled?: boolean;
    };
    prevBtn?: {
      loading?: boolean;
      disabled?: boolean;
    };
  };
  slots?: {
    leftTitle?: React.ReactNode;
  };
}

export function SimplePagination({
  onNext,
  onPrev,
  props,
  slots,
  ...rest
}: SimplePaginationProps) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {slots?.leftTitle && slots.leftTitle}
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => (onPrev ? onPrev() : null)}
          disabled={!!props?.prevBtn?.disabled}
          loading={!!props?.prevBtn?.loading}
        >
          Предыдущий
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => (onNext ? onNext() : null)}
          disabled={!!props?.nextBtn?.disabled}
          loading={!!props?.nextBtn?.loading}
        >
          Следующий
        </Button>
      </div>
    </div>
  );
}
