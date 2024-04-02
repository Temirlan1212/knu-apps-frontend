'use client';
import {
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  FormattingToolbarController,
  ImageCaptionButton,
  NestBlockButton,
  ReplaceImageButton,
  TextAlignButton,
  UnnestBlockButton,
  FormattingToolbar as FormattingToolbarBlocknote,
} from '@blocknote/react';
import '@blocknote/react/style.css';
import '@blocknote/core/fonts/inter.css';

export interface FormattingToolbarProps {
  blockTypeSelect: boolean;
  imageCaptionButton: boolean;
  replaceImageButton: boolean;
  boldStyleButton: boolean;
  italicStyleButton: boolean;
  underlineStyleButton: boolean;
  strikeStyleButton: boolean;
  codeStyleButton: boolean;
  textAlignLeftButton: boolean;
  textAlignCenterButton: boolean;
  textAlignRightButton: boolean;
  colorStyleButton: boolean;
  nestBlockButton: boolean;
  unnestBlockButton: boolean;
  createLinkButton: boolean;
}

const FormattingToolbar = ({
  blockTypeSelect = true,
  imageCaptionButton = true,
  replaceImageButton = true,
  boldStyleButton = true,
  italicStyleButton = true,
  underlineStyleButton = true,
  strikeStyleButton = true,
  codeStyleButton = true,
  textAlignLeftButton = true,
  textAlignCenterButton = true,
  textAlignRightButton = true,
  colorStyleButton = true,
  nestBlockButton = true,
  unnestBlockButton = true,
  createLinkButton = true,
}: Partial<FormattingToolbarProps>) => {
  return (
    <FormattingToolbarController
      formattingToolbar={() => (
        <FormattingToolbarBlocknote>
          {blockTypeSelect && <BlockTypeSelect key={'blockTypeSelect'} />}
          {imageCaptionButton && (
            <ImageCaptionButton key={'imageCaptionButton'} />
          )}
          {replaceImageButton && (
            <ReplaceImageButton key={'replaceImageButton'} />
          )}
          {boldStyleButton && (
            <BasicTextStyleButton
              basicTextStyle={'bold'}
              key={'boldStyleButton'}
            />
          )}
          {italicStyleButton && (
            <BasicTextStyleButton
              basicTextStyle={'italic'}
              key={'italicStyleButton'}
            />
          )}
          {underlineStyleButton && (
            <BasicTextStyleButton
              basicTextStyle={'underline'}
              key={'underlineStyleButton'}
            />
          )}
          {strikeStyleButton && (
            <BasicTextStyleButton
              basicTextStyle={'strike'}
              key={'strikeStyleButton'}
            />
          )}
          {codeStyleButton && (
            <BasicTextStyleButton
              basicTextStyle={'code'}
              key={'codeStyleButton'}
            />
          )}
          {textAlignLeftButton && (
            <TextAlignButton
              textAlignment={'left'}
              key={'textAlignLeftButton'}
            />
          )}
          {textAlignCenterButton && (
            <TextAlignButton
              textAlignment={'center'}
              key={'textAlignCenterButton'}
            />
          )}
          {textAlignRightButton && (
            <TextAlignButton
              textAlignment={'right'}
              key={'textAlignRightButton'}
            />
          )}
          {colorStyleButton && <ColorStyleButton key={'colorStyleButton'} />}
          {nestBlockButton && <NestBlockButton key={'nestBlockButton'} />}
          {unnestBlockButton && <UnnestBlockButton key={'unnestBlockButton'} />}
          {createLinkButton && <CreateLinkButton key={'createLinkButton'} />}
        </FormattingToolbarBlocknote>
      )}
    />
  );
};

export default FormattingToolbar;
