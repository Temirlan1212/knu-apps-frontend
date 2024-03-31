'use client';
import { useEffect } from 'react';
import { useCategoryCuState, useCategoryState } from '../data-access';
import { SectionBuilderWrapper } from '@/libs/formulas/ui/src/section-builder-wrapper';
import { Button } from '@/ui/button';
import {
  DataTable,
  RowConrolMenu,
  DebounceSearch,
  AddAction,
} from '@/ui/data-table';
import { SimplePagination } from '@/ui/simple-pagintation';
import { categoryColumns } from './category-data-table.data';
import { ActionCell } from './category-data-table-actions';
import { CategoryCuForm } from './category-cu/category-cu-form';

export interface CategoryListProps {}

export function CategoryList(props: CategoryListProps) {
  const {
    fetchCategories,
    nextPage,
    previousPage,
    deleteCategory,
    categories,
    paginationMeta,
    loading,
  } = useCategoryState();

  const categoryCreateDialogInit =
    useCategoryCuState().categoryCreateDialogInit;
  const categoryUpdateDialogInit =
    useCategoryCuState().categoryUpdateDialogInit;

  useEffect(() => {
    fetchCategories({ page: 1 });
  }, []);

  return (
    <div>
      <SectionBuilderWrapper
        title="Категории"
        slots={{
          titleRightBlock: <Button variant="ghost" loading={loading} />,
        }}
      >
        <DataTable
          data={categories}
          columns={[
            ...categoryColumns,
            {
              id: 'actions',
              enableHiding: false,
              cell: ({ row }) => (
                <ActionCell
                  row={row}
                  onDelete={deleteCategory}
                  onEdit={(original) => categoryUpdateDialogInit(original)}
                />
              ),
            },
          ]}
          slots={{
            headerLeftBlock: (table) => (
              <DebounceSearch
                debounceDelay={500}
                onDebounceChange={(label) => fetchCategories({ label })}
              />
            ),
            headerRightBlock: (table) => (
              <>
                <AddAction onClick={categoryCreateDialogInit} />
                <RowConrolMenu table={table} />
              </>
            ),
          }}
        />
        <SimplePagination
          onNext={nextPage}
          onPrev={previousPage}
          props={{
            nextBtn: { disabled: paginationMeta.next == null },
            prevBtn: { disabled: paginationMeta.prev == null },
          }}
          slots={{
            leftTitle: (
              <div>
                {paginationMeta.currentPage} из {paginationMeta.total}
              </div>
            ),
          }}
        />

        <CategoryCuForm />
      </SectionBuilderWrapper>
    </div>
  );
}

export default CategoryList;
