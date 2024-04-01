import FormulaList from './components/formula-list';

export interface FormulaPageProps {}
export async function FormulaPage(props: FormulaPageProps) {
  return (
    <div>
      <FormulaList />
      {/* <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <MathKeyboard editable={true} />
        </CardContent>
      </Card> */}
    </div>
  );
}

export default FormulaPage;
