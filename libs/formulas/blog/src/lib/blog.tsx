'use client';
import { Button } from '@/ui/button';
import { BlockNoteView } from '@/libs/formulas/ui/src/blocknote-view';
import { useState } from 'react';
import { BlockNoteEditorViewOptions } from '@/libs/formulas/ui/src/blocknote-view/blocknote-view';

/* eslint-disable-next-line */
export interface BlogProps {}

export function Blog(props: BlogProps) {
  const [content, setContent] = useState<
    BlockNoteEditorViewOptions['initialContent']
  >([
    {
      id: 'a0b61a28-baac-4562-be0f-fe64eed0a553',
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
          text: 'Заголовок',
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: '1a43fe78-1911-430d-aafb-9980cfd7b87d',
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
          text: 'Описание',
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: 'c1a96577-4e6d-453d-8919-3b5c9c56b805',
      type: 'paragraph',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
      },
      content: [
        {
          type: 'text',
          text: 'Любой текст Любой текст Любой текст Любой текст Любой текст Любой текст Любой текст Любой текст Любой текст Любой текст  ',
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: '010e32da-04b0-48ce-87c8-ec510b9dfd5a',
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
      id: 'a5ea7dd6-3bb6-42c3-8b83-379a0dd0a7ba',
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
      id: 'f08a86bb-6dd5-4221-8fb9-091ff18a81ef',
      type: 'paragraph',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
      },
      content: [],
      children: [],
    },
  ]);

  return (
    <div className="my-2">
      <div className="flex gap-2 justify-end">
        {/* <Button variant="destructive">Отменить</Button>
        <Button>Сохранить</Button> */}
      </div>
      <BlockNoteView
        initialContent={content}
        onChange={(editor) => {
          console.log(editor.document);
        }}
      />
    </div>
  );
}

export default Blog;
