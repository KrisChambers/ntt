import { Head } from "./Head"
import { Tail } from "./Tail"
import { Push } from "./Push"

/**
 * Concats two lists.
 */
export type Concat<List1 extends unknown[], List2 extends unknown[]> = {
	0: List1
	1: Concat<Push<List1, Head<List2>>, Tail<List2>>
}[List2 extends [] ? 0 : 1];
