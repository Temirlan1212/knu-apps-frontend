import { SectionBuilderWrapper } from '@/libs/formulas/ui/src/section-builder-wrapper';
import { Button } from '@/ui/button';

export default async function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */

  return (
    <div className="container">
      <SectionBuilderWrapper
        title="Формулы"
        slots={{
          titleRightBlock: <Button variant="ghost">Создать</Button>,
        }}
      >
        ddafs
      </SectionBuilderWrapper>

      <SectionBuilderWrapper
        title="Темы"
        slots={{
          titleRightBlock: <Button variant="ghost">Создать</Button>,
        }}
      />
    </div>
  );
}
