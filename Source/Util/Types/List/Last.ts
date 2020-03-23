import { Head } from "./Head"
import { Reverse } from "./Reverse"

/**
 * Gets the last item in the list.
 */
export type Last<List extends unknown[]> = Head<Reverse<List>>;
