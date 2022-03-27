export type ObjHashMap = { [key: string]: boolean };

export const arrToHashMap = (arr: string[]): ObjHashMap =>
  arr.reduce((obj, id) => {
    obj[id] = true;
    return obj;
  }, {});
