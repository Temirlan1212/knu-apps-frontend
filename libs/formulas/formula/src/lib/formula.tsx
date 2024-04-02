import FormulaList from './components/formula-list';
import { authConroller } from '@/libs/formulas/auth/data-access/src';

export interface FormulaPageProps {}
export async function FormulaPage(props: FormulaPageProps) {
  const { data } = authConroller.getServerSession();

  return (
    <div>
      <FormulaList variant={data?.role ?? 'CLIENT'} />
    </div>
  );
}

export default FormulaPage;
