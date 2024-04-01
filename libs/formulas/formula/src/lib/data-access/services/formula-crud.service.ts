import { apifetch } from '@/libs/core/http/src';
import {
  Formula,
  FormulaPaginationQuery,
  PaginationQuery,
  PaginationResponse,
} from '@/libs/formulas/utils/types';

const headers = {
  'Content-Type': 'application/json',
};

export const formulaCrudService = () => {
  return {
    async findAll({
      perPage = 10,
      page = 1,
      title,
      description,
      latex,
    }: FormulaPaginationQuery) {
      const params = new URLSearchParams();
      perPage && params.append('perPage', String(perPage));
      page && params.append('page', String(page));
      title && params.append('title', String(title));
      description && params.append('description', String(description));
      latex && params.append('latex', String(latex));

      return await apifetch<PaginationResponse<Formula>>(
        'formula?' + String(params),
        {
          method: 'GET',
          headers,
          cache: 'no-cache',
        }
      );
    },
    async create({ latex, title, description, categoryIds }: Partial<Formula>) {
      return await apifetch<Partial<Formula>>('formula', {
        method: 'POST',
        body: JSON.stringify({ latex, title, description, categoryIds }),
        headers,
      });
    },
    async update(
      id: Formula['id'],
      { latex, title, description, categoryIds }: Partial<Formula>
    ) {
      return await apifetch<{ id: Formula['id'] }>('formula' + '/' + id, {
        method: 'PATCH',
        body: JSON.stringify({ latex, title, description, categoryIds }),
        headers,
      });
    },
    async delete(id: Formula['id']) {
      return await apifetch<{ id: Formula['id'] }>('formula' + '/' + id, {
        method: 'DELETE',
        headers,
      });
    },
    async findOne(id: Formula['id']) {
      return await apifetch<Formula>('formula' + '/' + id, {
        method: 'GET',
        headers,
      });
    },
  };
};
