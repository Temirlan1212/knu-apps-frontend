'use client';
import MathKeyboard from '@/libs/formulas/ui/src/math-keyboard';
import { defaultProps } from '@blocknote/core';
import { createReactBlockSpec } from '@blocknote/react';
import { BlockSpecTypes } from '../../types';
import { Input } from '@/ui/input';

// The types of alerts that users can choose from.

// The Alert block.
export const MathKeyboardBlock = createReactBlockSpec(
  {
    type: BlockSpecTypes['MATH-KEYBOARD'],
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
    },
    content: 'inline',
  },
  {
    render: (props) => {
      const latex = (props.block.content[0] as any)?.text;
      const isEditable = props.editor.isEditable;
      return (
        <div className="mt-[10px] flex flex-col gap-[2px]">
          <Input placeholder="Название формулы" />
          <MathKeyboard
            editable={isEditable}
            onChangeLatexChange={(value) => {
              (props.block.content as any) = [
                { type: 'text', text: value, styles: {} },
              ];
            }}
            initialLatex={latex ?? ''}
          />
          <div ref={props.contentRef} className="hidden"></div>
        </div>
      );
    },
  }
);
