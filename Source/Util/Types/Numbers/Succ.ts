import { Cons } from "../List"
import { Num } from "./Num"

/**
 * Gets the successor of a Num
 */
export type Succ<T extends Num> = Cons<T, []>