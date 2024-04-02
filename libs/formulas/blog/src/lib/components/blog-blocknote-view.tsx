'use client';
import { BlockNoteView } from '@/libs/formulas/ui/src/blocknote-view';
import {
  BlockNoteEditorViewOptions,
  EditorProps,
} from '@/libs/formulas/ui/src/blocknote-view/blocknote-view';
import { useState } from 'react';

const initTitleBlock = (text: string): EditorProps['document'] => {
  return [
    {
      id: 'dd7a9ebb-b492-4a19-95f0-e6a75dbf6efa',
      type: 'heading',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
        level: 1,
      },
      content: [
        {
          type: 'text',
          text: text,
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: '92c5bf39-0479-4236-ae56-1b44c41c3cec',
      type: 'paragraph',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
      },
      content: [],
      children: [],
    },
    {
      id: '92c5bf39-0479-4236-ae56-1b44c41c3cec',
      type: 'paragraph',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
      },
      content: [
        {
          type: 'text',
          text: 'Описание',
          styles: {},
        },
      ],
      children: [],
    },
  ];
};
export interface BlogBlocknoteViewProps extends BlockNoteEditorViewOptions {}

export const BlogBlocknoteView = ({
  initialContent,
  onInit,
  ...rest
}: BlogBlocknoteViewProps) => {
  const [formattingToolbar, setFormattingToolbar] = useState(true);
  return (
    <BlockNoteView
      {...rest}
      formattingToolbar={true}
      linkToolbar={false}
      initialContent={initialContent || initTitleBlock('Заголовок')}
      slotProps={{
        formattingToolbar: {
          blockTypeSelect: formattingToolbar,
          strikeStyleButton: formattingToolbar,
          createLinkButton: formattingToolbar,
          underlineStyleButton: formattingToolbar,
        },
      }}
      onInit={(editor) => {
        editor.formattingToolbar.onUpdate(() => {
          const selectedBlock = editor.getSelection()?.blocks[0];
          if (selectedBlock?.id == initTitleBlock('')[0].id)
            setFormattingToolbar(false);
          else setFormattingToolbar(true);
        });
        editor.onChange(() => {
          const titleBlock = editor.document[0];
          const level = (titleBlock.props as any)?.level;
          if (level !== 1) {
            editor.updateBlock({ id: titleBlock.id }, initTitleBlock('')[0]);
          }
        });
        onInit && onInit(editor);
      }}
    />
  );
};
