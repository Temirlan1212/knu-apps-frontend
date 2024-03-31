import { apifetch } from '@/libs/core/http/src';
import {
  Category,
  PaginationQuery,
  PaginationResponse,
} from '@/libs/formulas/utils/types';

const headers = {
  'Content-Type': 'application/json',
};

export const categoryCrudService = () => {
  return {
    async findAll({
      perPage = 10,
      page = 1,
      label,
    }: PaginationQuery<number> & { label?: string }) {
      const params = new URLSearchParams();
      perPage && params.append('perPage', String(perPage));
      page && params.append('page', String(page));
      label && params.append('label', String(label));

      return await apifetch<PaginationResponse<Category>>(
        'category?' + String(params),
        {
          method: 'GET',
          headers,
          cache: 'no-cache',
        }
      );
    },
    async create({ label }: Partial<Category>) {
      return await apifetch<Partial<Category>>('category', {
        method: 'POST',
        body: JSON.stringify({ label }),
        headers,
      });
    },
    async update(id: Category['id'], label: Category['label']) {
      return await apifetch<{ id: Category['id'] }>('category' + '/' + id, {
        method: 'PATCH',
        body: JSON.stringify({ label }),
        headers,
      });
    },
    async delete(id: Category['id']) {
      return await apifetch<{ id: Category['id'] }>('category' + '/' + id, {
        method: 'DELETE',
        headers,
      });
    },
    async findOne(id: Category['id']) {
      return await apifetch<Category>('category' + '/' + id, {
        method: 'GET',
        headers,
      });
    },
  };
};
