import { Formula, FormulaPaginationQuery } from '@/libs/formulas/utils/types';
import { formulaCrudService } from '../services/formula-crud.service';

export const formulaConroller = () => {
  return {
    create({ title, description, latex }: Partial<Formula>) {
      return formulaCrudService().create({ title, description, latex });
    },
    update(id: Formula['id'], { title, description, latex }: Partial<Formula>) {
      return formulaCrudService().update(id, { title, description, latex });
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
