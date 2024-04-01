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
  IDataTableProps,
} from '@/ui/data-table';
import { SimplePagination } from '@/ui/simple-pagintation';
import { categoryColumns } from './category-data-table.data';
import { ActionCell } from './category-data-table-actions';
import { CategoryCuForm } from './category-cu/category-cu-form';

export interface CategoryListProps {
  props?: {
    dataTable?: Partial<IDataTableProps>;
  };
}

export function CategoryList({ props }: CategoryListProps) {
  const {
    set,
    fetchCategories,
    nextPage,
    previousPage,
    deleteCategory,
    categories,
    paginationMeta,
    loading,
    selectedCategoriesInIds,
  } = useCategoryState();

  const categoryCreateDialogInit =
    useCategoryCuState().categoryCreateDialogInit;
  const categoryUpdateDialogInit =
    useCategoryCuState().categoryUpdateDialogInit;

  const onMount = async () => {
    await fetchCategories({ page: 1 });
  };

  useEffect(() => {
    onMount();
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
          onRowSelectionChange={(selectedRows) => {
            set({ selectedCategoriesInIds: selectedRows });
          }}
          rowSelection={selectedCategoriesInIds}
          {...(props?.dataTable || {})}
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
              <div className="flex gap-2">
                <p>
                  {paginationMeta.currentPage} из {paginationMeta.total}
                </p>
                <p>Выбрано: {Object.values(selectedCategoriesInIds).length}</p>
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
