import { Head } from "./Head"
import { Tail } from "./Tail"
import { Reverse } from "./Reverse"

/**
 * Pops an element of the end of a list.
 *
 * Returns a tuple where the first element is the remaining list, the second is the element that was popped.
 */
export type Pop<List extends unknown[]> = List extends [] ? [[], never] : [Reverse<Tail<Reverse<List>>>, Head<Reverse<List>>];
