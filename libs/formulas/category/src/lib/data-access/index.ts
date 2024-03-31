import { useCategoryState, useCategoryCuState } from './store/category.store';
import { categoryConroller as categoryConrollerLocal } from './conrollers/category-crud.conroller';
const categoryConroller = categoryConrollerLocal();
export { categoryConroller, useCategoryState, useCategoryCuState };
