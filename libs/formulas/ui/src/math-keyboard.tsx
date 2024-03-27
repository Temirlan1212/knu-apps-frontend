'use client';
import { forwardRef, useEffect, useRef, useState } from 'react';
import MathInput from 'react-math-keyboard';
import { CustomBlockSpecTypesProps } from './blocknote-view/types';
import { twMerge } from 'tailwind-merge';

interface MathKeyboardProps extends Partial<CustomBlockSpecTypesProps> {
  initialLatex?: string;
  onChangeLatexChange?: (value: string) => void;
}

const MathKeyboard = forwardRef<HTMLDivElement, MathKeyboardProps>(
  (
    { initialLatex, editable = true, onChangeLatexChange }: MathKeyboardProps,
    ref
  ) => {
    const firstMathfieldRef = useRef<any>();
    const [latex, setLatex] = useState(initialLatex);

    const clear = () => setMathfieldRefLatex('');

    const setMathfieldRefLatex = (latex: string) => {
      firstMathfieldRef.current?.latex(latex);
    };

    const setMathfieldRefFocus = () => {
      if (!editable) return;
      firstMathfieldRef.current?.focus();
    };

    useEffect(() => {
      if (firstMathfieldRef.current != null && !!initialLatex) {
        setMathfieldRefLatex(initialLatex);
      }
    }, [initialLatex]);

    useEffect(() => {
      if (firstMathfieldRef.current != null && !initialLatex)
        setMathfieldRefFocus();
    }, [firstMathfieldRef]);

    useEffect(() => {
      if (!!latex && onChangeLatexChange) onChangeLatexChange(latex);
    }, [latex]);

    return (
      <div
        ref={ref}
        className={twMerge(
          'flex w-full flex-col gap-2',
          !editable && 'pointer-events-none'
        )}
      >
        <MathInput
          setValue={setLatex}
          setMathfieldRef={(mathfield: any) =>
            (firstMathfieldRef.current = mathfield)
          }
        />
      </div>
    );
  }
);

export default MathKeyboard;
