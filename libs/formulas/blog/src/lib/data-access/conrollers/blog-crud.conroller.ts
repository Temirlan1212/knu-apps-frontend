import { Blog, BlogPaginationQuery } from '@/libs/formulas/utils/types';
import { blogCrudService } from '../services/blog-crud.service';

export const blogController = () => {
  return {
    create(payload: Partial<Blog>) {
      return blogCrudService().create(payload);
    },
    update(id: Blog['id'], payload: Partial<Blog>) {
      return blogCrudService().update(id, payload);
    },
    findAll(data: BlogPaginationQuery) {
      return blogCrudService().findAll(data);
    },
    findOne(id: Blog['id']) {
      return blogCrudService().findOne(id);
    },
    delete(id: Blog['id']) {
      return blogCrudService().delete(id);
    },
  };
};
