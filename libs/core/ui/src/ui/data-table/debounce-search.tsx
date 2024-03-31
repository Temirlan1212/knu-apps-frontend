'use client';
import { Input, InputProps } from '@/ui/input';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

export interface SearchProps extends Pick<InputProps, 'placeholder'> {
  debounceDelay?: number;
  onDebounceChange?: (value: string) => void;
}

export function DebounceSearch({
  debounceDelay,
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
    <Input
      value={text}
      onChange={(event) => setText(event.target.value)}
      {...rest}
    />
  );
}
