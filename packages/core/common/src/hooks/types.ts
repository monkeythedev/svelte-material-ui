export type DestroyerFunc = () => {};
export type Hook = () => DestroyerFunc | void;