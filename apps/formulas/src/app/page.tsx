import { FormulaCarousel } from '@./formula';
import { BlogCarousel } from '@/libs/formulas/blog/src';
import { Header } from '@/libs/formulas/layouts/src';
import { SectionBuilderWrapper } from '@/libs/formulas/ui/src/section-builder-wrapper';
import { Button } from '@/ui/button';
import Link from 'next/link';

export default async function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */

  return (
    <>
      <Header />
      <div className="container py-5 flex flex-col gap-[30px]">
        <SectionBuilderWrapper
          title="Темы"
          slots={{
            titleRightBlock: (
              <Link href="/blog">
                <Button variant="ghost">Все</Button>
              </Link>
            ),
          }}
        >
          <BlogCarousel />
        </SectionBuilderWrapper>

        <SectionBuilderWrapper
          title="Формулы"
          slots={{
            titleRightBlock: (
              <Link href="/formula">
                <Button variant="ghost">Все</Button>
              </Link>
            ),
          }}
        >
          <FormulaCarousel />
        </SectionBuilderWrapper>
      </div>
    </>
  );
}
