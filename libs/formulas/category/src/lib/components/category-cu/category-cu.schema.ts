import * as z from 'zod';

enum MinMax {
  labelMin = 0,
  labelMax = 100,
}

export const categoryCuSchema = z.object({
  label: z
    .string()
    .min(
      MinMax.labelMin,
      `Строка должна содержать не менее ${MinMax.labelMin} символов`
    )
    .max(
      MinMax.labelMax,
      `Строка должна содержать не более ${MinMax.labelMax} символов`
    ),
});

export type ICategoryCuSchema = z.infer<typeof categoryCuSchema>;
