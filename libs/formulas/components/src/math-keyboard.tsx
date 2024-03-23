'use client';
import MathInput from 'react-math-keyboard';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/ui/button';

export default function MathKeyboard() {
  const firstMathfieldRef = useRef<any>();
  const [value, setValue] = useState('');

  const clear = () => {
    firstMathfieldRef.current?.latex('');
  };

  useEffect(() => {
    if (firstMathfieldRef.current != null) {
      firstMathfieldRef.current.latex(
        '\\frac{\\int_a^b 2\\pi e^{2ix}\\cos(\\theta) \\gamma}{\\sum_2^9 i^2 - 1}'
      );
    }
  }, [firstMathfieldRef.current]);

  return (
    <div className="flex w-full flex-col gap-2">
      <MathInput
        setValue={setValue}
        setMathfieldRef={(mathfield: any) =>
          (firstMathfieldRef.current = mathfield)
        }
        lang="en"
      />
      <div className="flex justify-end gap-2">
        <Button
          className="bg-destructive hover:text-destructive-foreground' w-[fit-content]"
          disabled={!value}
          onClick={clear}
        >
          Очистить
        </Button>
      </div>
    </div>
  );
}
