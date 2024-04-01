import { Category, CategoryPaginationQuery } from '@/libs/formulas/utils/types';
import { categoryCrudService } from '../services/category-crud.service';

export const categoryConroller = () => {
  return {
    create(payload: { label: Category['label'] }) {
      return categoryCrudService().create(payload);
    },
    update(id: Category['id'], label: Category['label']) {
      return categoryCrudService().update(id, label);
    },
    findAll(data: CategoryPaginationQuery) {
      return categoryCrudService().findAll(data);
    },
    findOne(id: Category['id']) {
      return categoryCrudService().findOne(id);
    },
    delete(id: Category['id']) {
      return categoryCrudService().delete(id);
    },
  };
};
