/**
 * Creates a new list wit the head U
 */
export type Cons<List extends unknown[], H> = ((arg: H, ...args: List) => void) extends ((...args: infer X) => void) ? X : never