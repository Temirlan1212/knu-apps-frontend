export const primitiveArrToObjBooleanValueAsKey = (
  arr: string[],
  value: boolean
): Record<string, boolean> => {
  let obj: Record<string, boolean> = {}; // Define obj with string keys
  arr.map((primitive, index) => (obj[primitive] = value));
  return obj;
};
