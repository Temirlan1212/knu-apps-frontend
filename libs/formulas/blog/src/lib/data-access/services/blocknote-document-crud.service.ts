import { apifetch } from '@/libs/core/http/src';
import { BlocknoteDocument } from '@/libs/formulas/utils/types';

const headers = {
  'Content-Type': 'application/json',
};

export const BlocknoteDocumentCrudService = () => {
  return {
    async create(data: Partial<BlocknoteDocument>) {
      return await apifetch<Partial<BlocknoteDocument>>('blocknote-document', {
        method: 'POST',
        body: JSON.stringify(data),
        headers,
      });
    },
    async update(
      id: BlocknoteDocument['id'],
      payload: Partial<BlocknoteDocument>
    ) {
      return await apifetch<{ id: BlocknoteDocument['id'] }>(
        'blocknote-document' + '/' + id,
        {
          method: 'PATCH',
          body: JSON.stringify(payload),
          headers,
          cache: 'no-cache',
        }
      );
    },
    async delete(id: BlocknoteDocument['id']) {
      return await apifetch<{ id: BlocknoteDocument['id'] }>(
        'blocknote-document' + '/' + id,
        {
          method: 'DELETE',
          headers,
        }
      );
    },
    async findOne(id: BlocknoteDocument['id']) {
      return await apifetch<BlocknoteDocument>(
        'blocknote-document' + '/' + id,
        {
          method: 'GET',
          headers,
          cache: 'no-cache',
        }
      );
    },
  };
};
