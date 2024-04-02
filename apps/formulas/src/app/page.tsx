import { FormulaCarousel } from '@./formula';
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
      <div className="container py-5">
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

        <SectionBuilderWrapper
          title="Темы"
          slots={{
            titleRightBlock: <Button variant="ghost">Создать</Button>,
          }}
        />
      </div>
    </>
  );
}
