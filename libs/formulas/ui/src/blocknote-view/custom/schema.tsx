import {
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  defaultStyleSpecs,
} from '@blocknote/core';
import { MathKeyboardBlock } from './blocks/math-keyboard-block';
import { BlockSpecTypes } from '../types';

export const BlockNoteCustomSchema = BlockNoteSchema.create({
  blockSpecs: {
    // Adds all default blocks.
    ...defaultBlockSpecs,
    // Adds the Alert block.
    [BlockSpecTypes['MATH-KEYBOARD']]: MathKeyboardBlock,
  },
  inlineContentSpecs: { ...defaultInlineContentSpecs },
  styleSpecs: { ...defaultStyleSpecs },
});
