import { BlocknoteDocument } from '@/libs/formulas/utils/types';
import { BlocknoteDocumentCrudService } from '../services/blocknote-document-crud.service';

const blocknoteDocumentControllerFunc = () => {
  return {
    create(payload: Partial<BlocknoteDocument>) {
      return BlocknoteDocumentCrudService().create(payload);
    },
    update(id: BlocknoteDocument['id'], payload: Partial<BlocknoteDocument>) {
      return BlocknoteDocumentCrudService().update(id, payload);
    },
    findOne(id: BlocknoteDocument['id']) {
      return BlocknoteDocumentCrudService().findOne(id);
    },
    delete(id: BlocknoteDocument['id']) {
      return BlocknoteDocumentCrudService().delete(id);
    },
  };
};

export const blocknoteDocumentController = blocknoteDocumentControllerFunc();
