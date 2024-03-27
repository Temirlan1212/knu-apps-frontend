'use client';
import '@blocknote/core/fonts/inter.css';
import {
  BlockColorsItem,
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

type VeiwType = {
  editable: boolean;
  slashMenu: boolean;
  sideMenu: boolean;
  onChange: (editor: typeof BlockNoteCustomSchema.BlockNoteEditor) => void;
};

export interface BlockNoteEditorViewOptions extends Partial<VeiwType> {
  initialContent?: (typeof BlockNoteCustomSchema.PartialBlock)[];
}

export default function BlockNoteView({
  initialContent = [{}],
  ...componentProps
}: BlockNoteEditorViewOptions) {
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    schema: BlockNoteCustomSchema,
    initialContent: initialContent,
  });

  // Renders the editor instance using a React component.
  return (
    <ReactBlockNoteView
      editable={true}
      editor={editor}
      slashMenu={false}
      sideMenu={false}
      {...componentProps}
      onChange={() => {
        componentProps?.onChange && componentProps.onChange(editor);
      }}
    >
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
      <CustomSuggestionMenuController editor={editor} />
    </ReactBlockNoteView>
  );
}
