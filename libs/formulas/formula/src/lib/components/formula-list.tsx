'use client';
import { useEffect } from 'react';
import { useFormulaCuState, useFormulaState } from '../data-access';
import { SectionBuilderWrapper } from '@/libs/formulas/ui/src/section-builder-wrapper';
import { Button } from '@/ui/button';
import {
  DataTable,
  RowConrolMenu,
  DebounceSearch,
  AddAction,
} from '@/ui/data-table';
import { SimplePagination } from '@/ui/simple-pagintation';
import { categoryColumns } from './formula-data-table.data';
import { ActionCell } from './formula-data-table-actions';
import { FormulaCuForm } from './formula-cu/formula-cu-form';
import { IRoles } from '@/libs/formulas/utils/types';

export interface FormulaListProps {
  variant: IRoles;
}

export function FormulaList({ variant }: FormulaListProps) {
  const {
    fetchFormula,
    nextPage,
    previousPage,
    deleteFormula,
    formula,
    query,
    paginationMeta,
    loading,
  } = useFormulaState();

  const createDialogInit = useFormulaCuState().formulaCreateDialogInit;
  const updateDialogInit = useFormulaCuState().formulaUpdateDialogInit;

  useEffect(() => {
    fetchFormula({ page: 1 });
  }, []);

  return (
    <div>
      <SectionBuilderWrapper
        title="Формулы"
        slots={{
          titleRightBlock: <Button variant="ghost" loading={loading} />,
        }}
      >
        <DataTable
          data={formula}
          columns={[
            ...categoryColumns,
            {
              id: 'actions',
              enableHiding: true,
              cell: ({ row }) =>
                variant === 'ADMIN' && (
                  <ActionCell
                    row={row}
                    onDelete={deleteFormula}
                    onEdit={(original) => updateDialogInit(original)}
                  />
                ),
            },
          ]}
          slots={{
            headerLeftBlock: (table) => (
              <div className="flex gap-3 flex-wrap">
                <div className="flex flex-col gap-2 grow">
                  <p>Поиск по названию</p>
                  <DebounceSearch
                    debounceDelay={500}
                    onDebounceChange={(title) =>
                      fetchFormula({ ...query, title })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2 grow">
                  <p>Поиск по описанию</p>
                  <DebounceSearch
                    debounceDelay={500}
                    onDebounceChange={(description) =>
                      fetchFormula({ ...query, description })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2 grow">
                  <p>Поиск по формуле</p>
                  <DebounceSearch
                    debounceDelay={500}
                    onDebounceChange={(latex) =>
                      fetchFormula({ ...query, latex })
                    }
                  />
                </div>
              </div>
            ),
            headerRightBlock: (table) => (
              <>
                {variant === 'ADMIN' && (
                  <AddAction onClick={createDialogInit} />
                )}
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

        <FormulaCuForm />
      </SectionBuilderWrapper>
    </div>
  );
}

export default FormulaList;
