import { IfExtends } from "./IfExtends"

/**
 * Checks if two types are equal
 */
export type IfEqual<A, B, True = true, False = false> = IfExtends<A, B, IfExtends<B, A, True, False>, False>;
