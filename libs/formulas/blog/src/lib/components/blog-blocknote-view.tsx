'use client';
import { BlockNoteView } from '@/libs/formulas/ui/src/blocknote-view';
import {
  BlockNoteEditorViewOptions,
  EditorProps,
} from '@/libs/formulas/ui/src/blocknote-view/blocknote-view';
import { useState } from 'react';

const initBlock = ({
  title,
  descr,
}: Partial<{
  title: string;
  descr: string;
}>): EditorProps['document'] => {
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
          text: title || '',
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: '92c5bf39-0479-4236-ae56-1b44c41c3cec',
      type: 'heading',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
        level: 3,
      },
      content: [
        {
          type: 'text',
          text: descr || '',
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
      initialContent={
        initialContent || initBlock({ descr: 'Заголовок', title: 'Описание' })
      }
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
          setFormattingToolbar(true);

          const selectedBlock = editor.getSelection()?.blocks[0];
          if (selectedBlock?.id == initBlock({})[0].id)
            setFormattingToolbar(false);
          if (selectedBlock?.id == initBlock({})[1].id)
            setFormattingToolbar(false);
        });
        editor.onChange(() => {
          const titleBlock = editor.document[0];
          if ((titleBlock.props as any)?.level !== 1) {
            editor.updateBlock({ id: titleBlock.id }, initBlock({})[0]);
          }
          const descrBlock = editor.document[1];
          if ((descrBlock.props as any)?.level !== 3) {
            editor.updateBlock({ id: descrBlock.id }, initBlock({})[1]);
          }
        });
        onInit && onInit(editor);
      }}
    />
  );
};
