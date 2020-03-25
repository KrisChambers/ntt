import { Tail, Head, Push } from "."
import { Succ, ToNumber, Zero } from "../Numbers"
import { IfEqual } from "../Check"

/**
 * Takes the first n elements of a list.
 *
 * Returns never if the list if empty.
 */
export type Take<n extends number, List extends unknown[], R extends unknown[] = [], i extends unknown[] = Zero> = {
	0: R
	1: List extends [unknown, ... unknown[]] ? Take<n, Tail<List>, Push<R, Head<List>>, Succ<i>> : never
}[IfEqual<n, ToNumber<i>, 0, 1>]