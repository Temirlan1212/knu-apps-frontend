import dynamic from 'next/dynamic';
export const BlockNoteView = dynamic(() => import('./blocknote-view'), {
  ssr: false,
});
