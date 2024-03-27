import {
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
} from '@blocknote/react';
import { BlockNoteCustomSchema } from './schema';
import { insertOrUpdateBlock } from '@blocknote/core';
import { BlockSpecTypes } from '../types';
import { TbMathXDivide2 } from 'react-icons/tb';

const insertMathKeyboard = (
  editor: typeof BlockNoteCustomSchema.BlockNoteEditor
) => ({
  title: 'Formula',
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: BlockSpecTypes['MATH-KEYBOARD'],
    });
  },
  aliases: ['math', 'keyboard', 'physics'],
  group: 'Other',
  icon: <TbMathXDivide2 />,
  subtext: "Used to insert a block with 'Math keyboard",
});

export const CustomSuggestionMenuController = ({
  editor,
}: {
  editor: typeof BlockNoteCustomSchema.BlockNoteEditor;
}) => {
  return (
    <SuggestionMenuController
      triggerCharacter={'/'}
      getItems={async (query) => {
        // Gets all default slash menu items and `insertAlert` item.
        return [
          insertMathKeyboard(editor),
          ...getDefaultReactSlashMenuItems(editor),
        ];
      }}
    />
  );
};
