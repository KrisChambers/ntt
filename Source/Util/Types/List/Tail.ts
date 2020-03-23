// type HeadTest = Head<[1, 2 ,3]>	// should return 1
/**
 * Gets all the list after the first element.
 */
export type Tail<List extends unknown[]> = ((...args: List) => void) extends ((a: never, ...args: infer U) => void) ? U : never;
