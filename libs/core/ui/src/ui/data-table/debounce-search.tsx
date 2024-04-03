'use client';
import { Input, InputProps } from '@/ui/input';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Button } from '../button';

export interface SearchProps extends Pick<InputProps, 'placeholder'> {
  debounceDelay?: number;
  loading?: boolean;
  onDebounceChange?: (value: string) => void;
}

export function DebounceSearch({
  debounceDelay,
  loading,
  onDebounceChange,
  ...rest
}: SearchProps) {
  const [didMount, setDidMount] = useState(false);

  const [text, setText] = useState('');
  const [value] = useDebounce(text, debounceDelay || 1000);

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount && onDebounceChange) onDebounceChange(value);
  }, [value]);

  return (
    <div className="w-full relative">
      <Input
        value={text}
        onChange={(event) => setText(event.target.value)}
        {...rest}
      />
      {loading && (
        <Button
          variant={'ghost'}
          className="absolute top-[1px] right-1 w-[5px] h-[94%] bg-white opacity-1"
          loading={loading}
          disabled={false}
        />
      )}
    </div>
  );
}
