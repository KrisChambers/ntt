import { IfEmpty } from "./IfEmpty"

/**
 * Gets the first item of a list
 */
export type Head<List extends unknown[]> = IfEmpty<List, never, List[0]>
