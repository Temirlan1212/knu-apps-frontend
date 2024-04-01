import { Formula, FormulaPaginationQuery } from '@/libs/formulas/utils/types';
import { formulaCrudService } from '../services/formula-crud.service';

export const formulaConroller = () => {
  return {
    create({ title, description, latex, categoryIds }: Partial<Formula>) {
      return formulaCrudService().create({
        title,
        description,
        latex,
        categoryIds,
      });
    },
    update(
      id: Formula['id'],
      { title, description, latex, categoryIds }: Partial<Formula>
    ) {
      return formulaCrudService().update(id, {
        title,
        description,
        latex,
        categoryIds,
      });
    },
    findAll(data: FormulaPaginationQuery) {
      return formulaCrudService().findAll(data);
    },
    findOne(id: Formula['id']) {
      return formulaCrudService().findOne(id);
    },
    delete(id: Formula['id']) {
      return formulaCrudService().delete(id);
    },
  };
};
