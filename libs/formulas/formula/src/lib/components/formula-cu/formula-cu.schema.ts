import * as z from 'zod';

enum MinMax {
  titlelMin = 1,
  titlelMax = 100,
  latexMin = 1,
  latexMax = 100,
  descriptionMin = 0,
  descriptionMax = 100,
}

export const formulaCuSchema = z.object({
  title: z
    .string()
    .min(
      MinMax.titlelMin,
      `Строка должна содержать не менее ${MinMax.titlelMin} символов`
    )
    .max(
      MinMax.titlelMax,
      `Строка должна содержать не более ${MinMax.titlelMax} символов`
    ),
  latex: z
    .string()
    .min(
      MinMax.latexMin,
      `Строка должна содержать не менее ${MinMax.latexMin} символов`
    )
    .max(
      MinMax.latexMax,
      `Строка должна содержать не более ${MinMax.latexMax} символов`
    ),
  description: z
    .string()
    .min(
      MinMax.descriptionMin,
      `Строка должна содержать не менее ${MinMax.descriptionMin} символов`
    )
    .max(
      MinMax.descriptionMax,
      `Строка должна содержать не более ${MinMax.descriptionMax} символов`
    )
    .optional(),
  categories: z.record(z.string(), z.boolean()).optional(),
});

export type IFormulaCuSchema = z.infer<typeof formulaCuSchema>;
