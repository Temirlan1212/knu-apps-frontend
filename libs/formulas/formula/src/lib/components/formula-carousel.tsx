'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/ui/carousel';
import { useFormulaState } from '../data-access';
import { useEffect } from 'react';
import MathKeyboard from '@/libs/formulas/ui/src/math-keyboard';
import { Skeleton } from '@/ui/skeleton';

export function FormulaCarousel() {
  const fetchFormula = useFormulaState((state) => state.fetchFormula);
  const formula = useFormulaState((state) => state.formula);
  const loading = useFormulaState((state) => state.loading);

  useEffect(() => {
    fetchFormula({ page: 1, perPage: 10 });
  }, []);

  return (
    <div className="px-[40px]">
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent>
          {loading &&
            Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Skeleton className="h-[200px]" />
              </CarouselItem>
            ))}
          {!loading &&
            formula.map(({ title, latex }, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="h-[200px] p-5 flex flex-col gap-2 justify-between">
                    <CardHeader className="p-[0]">
                      <CardTitle>{title} 📜</CardTitle>
                    </CardHeader>
                    <CardContent className="max-h-[115px] rounded-[10px] overflow-auto border">
                      <MathKeyboard
                        editable={false}
                        initialLatex={latex}
                        className="border-none"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
