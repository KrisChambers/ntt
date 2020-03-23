import { EmptyList } from "./EmptyList"

/**
 * Checks if the List is empty.
 */
export type IfEmpty<List extends unknown[], True = true, False = false> = List extends EmptyList ? True : False;
