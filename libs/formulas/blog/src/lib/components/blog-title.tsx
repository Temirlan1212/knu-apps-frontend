'use client';
import { BlockNoteView } from '@/libs/formulas/ui/src/blocknote-view';
import { EditorProps } from '@/libs/formulas/ui/src/blocknote-view/blocknote-view';

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
  ];
};
export interface BlogTitleProps {
  initialContent?: EditorProps['document'];
}

export const BlogTitle = ({ initialContent }: BlogTitleProps) => {
  return (
    <BlockNoteView
      slashMenu={false}
      sideMenu={false}
      formattingToolbar={true}
      linkToolbar={false}
      slotProps={{
        formattingToolbar: {
          blockTypeSelect: false,
          strikeStyleButton: false,
          createLinkButton: false,
          underlineStyleButton: false,
        },
      }}
      initialContent={initialContent || initTitleBlock('')}
      onChange={(editor) => {
        const titleBlock = editor.document[0];
        const level = (titleBlock.props as any)?.level;

        if (level !== 1) {
          editor.updateBlock({ id: titleBlock.id }, initTitleBlock('')[0]);
        }
      }}
    />
  );
};
