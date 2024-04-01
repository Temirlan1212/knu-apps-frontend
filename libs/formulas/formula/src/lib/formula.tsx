import FormulaList from './components/formula-list';

export interface FormulaPageProps {}
export async function FormulaPage(props: FormulaPageProps) {
  return (
    <div>
      <FormulaList />
    </div>
  );
}

export default FormulaPage;
