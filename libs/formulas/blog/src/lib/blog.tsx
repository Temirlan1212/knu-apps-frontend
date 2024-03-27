import { Button } from '@/ui/button';
import { BlockNoteView } from '@/libs/formulas/ui/src/blocknote-view';

/* eslint-disable-next-line */
export interface BlogProps {}

export function Blog(props: BlogProps) {
  return (
    <div>
      <BlockNoteView />
    </div>
  );
}

export default Blog;
