import { apifetch } from '@/libs/core/http/src';
import {
  Blog,
  BlogPaginationQuery,
  PaginationResponse,
} from '@/libs/formulas/utils/types';

const headers = {
  'Content-Type': 'application/json',
};

export const blogCrudService = () => {
  return {
    async findAll({ perPage = 10, page = 1, title }: BlogPaginationQuery) {
      const params = new URLSearchParams();
      perPage && params.append('perPage', String(perPage));
      page && params.append('page', String(page));
      title && params.append('title', String(title));

      return await apifetch<PaginationResponse<Blog>>(
        'blog?' + String(params),
        {
          method: 'GET',
          headers,
          cache: 'no-cache',
        }
      );
    },
    async create(data: Partial<Blog>) {
      return await apifetch<Partial<Blog>>('blog', {
        method: 'POST',
        body: JSON.stringify(data),
        headers,
      });
    },
    async update(id: Blog['id'], payload: Partial<Blog>) {
      return await apifetch<Blog>('blog' + '/' + id, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers,
        cache: 'no-cache',
      });
    },
    async delete(id: Blog['id']) {
      return await apifetch<{ id: Blog['id'] }>('blog' + '/' + id, {
        method: 'DELETE',
        headers,
      });
    },
    async findOne(id: Blog['id']) {
      return await apifetch<Blog>('blog' + '/' + id, {
        method: 'GET',
        headers,
        cache: 'no-cache',
      });
    },
  };
};
