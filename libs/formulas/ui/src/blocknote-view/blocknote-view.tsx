'use client';
import '@blocknote/core/fonts/inter.css';
import {
  BlockColorsItem,
  BlockNoteDefaultUIProps,
  DragHandleMenu,
  BlockNoteView as ReactBlockNoteView,
  RemoveBlockItem,
  SideMenu,
  SideMenuController,
  useCreateBlockNote,
} from '@blocknote/react';
import '@blocknote/react/style.css';
import { BlockNoteCustomSchema } from './custom/schema';
import { CustomSuggestionMenuController } from './custom/suggestion-menu-controller';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import FormattingToolbar, {
  FormattingToolbarProps,
} from './formatting-toolbar';

export type EditorProps = typeof BlockNoteCustomSchema.BlockNoteEditor;
export type EditorCustomSchemaProps = typeof BlockNoteCustomSchema.PartialBlock;

type SlotProps = {
  formattingToolbar: Partial<FormattingToolbarProps>;
};

type VeiwType = {
  editable: boolean;
  onChange: (editor: EditorProps) => void;
  onInit: (editor: EditorProps) => void;
  onDebounceChange: (document: EditorProps['document']) => void;
  initialContent: EditorCustomSchemaProps[];
  slotProps?: Partial<SlotProps>;
} & BlockNoteDefaultUIProps;

export interface BlockNoteEditorViewOptions extends Partial<VeiwType> {}

export default function BlockNoteView({
  initialContent = [{}],
  sideMenu = true,
  slashMenu = true,
  formattingToolbar = true,
  onDebounceChange,
  onChange,
  onInit,
  slotProps,
  ...componentProps
}: BlockNoteEditorViewOptions) {
  const [didMount, setDidMount] = useState(false);
  const [document, setDocument] = useState<EditorProps['document']>([]);
  const [value] = useDebounce(document, 1000);

  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    schema: BlockNoteCustomSchema,
    initialContent: initialContent,
  });

  useEffect(() => {
    setDidMount(true);
    onInit && editor && onInit(editor);
  }, []);

  useEffect(() => {
    if (didMount && onDebounceChange) onDebounceChange(document);
  }, [value]);
  // Renders the editor instance using a React component.
  return (
    <ReactBlockNoteView
      editable={true}
      editor={editor}
      {...componentProps}
      formattingToolbar={false}
      slashMenu={false}
      sideMenu={false}
      onChange={() => {
        onChange && onChange(editor);
        setDocument(editor.document);
      }}
    >
      {formattingToolbar && (
        <FormattingToolbar {...slotProps?.formattingToolbar} />
      )}

      {sideMenu && (
        <SideMenuController
          sideMenu={(props) => (
            <SideMenu
              {...props}
              dragHandleMenu={(props) => (
                <DragHandleMenu {...props}>
                  <RemoveBlockItem {...props}>Delete</RemoveBlockItem>
                  <BlockColorsItem {...props}>Colors</BlockColorsItem>
                </DragHandleMenu>
              )}
            />
          )}
        />
      )}
      {slashMenu && <CustomSuggestionMenuController editor={editor} />}
    </ReactBlockNoteView>
  );
}
