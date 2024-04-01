import { PrimitiveJsTypes } from './types';

export const primitiveArrToObjValueAsKey = (
  arr: Omit<PrimitiveJsTypes, 'boolean'>[],
  value?: PrimitiveJsTypes
) => {
  let obj = {};
  arr.map((primitive, index) => (obj[String(primitive)] = value || index));
  return obj;
};
