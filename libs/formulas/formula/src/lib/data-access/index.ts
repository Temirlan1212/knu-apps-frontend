import { useFormulaState, useFormulaCuState } from './store/formula.store';
import { formulaConroller as formulaConrollerLocal } from './conrollers/formula-crud.conroller';
const formulaConroller = formulaConrollerLocal();
export { formulaConroller, useFormulaState, useFormulaCuState };
