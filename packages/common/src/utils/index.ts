export function arrEquals<T>(arr1: T[], arr2: T[]) {
  return arr1.length === arr2.length && !arr1.some((v, i) => v !== arr2[i]);
}

export function arrAdd<T>(arr: T[], toAdd: T) {
  return [...arr, toAdd];
}

export function arrHas<T>(arr: T[], toCheck: T) {
  return Boolean(~arr.indexOf(toCheck));
}

export function arrRemove<T>(arr: T[], toRemove: T) {
  const index = arr.indexOf(toRemove);
  if (~index) {
    return [
      ...arr.slice(0, index),
      ...arr.slice(index + 1, arr.length),
    ];
  }
  return arr;
}

export function memo<T = any>(val: T = {} as T) {
  return {val}
}