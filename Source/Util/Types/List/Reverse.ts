import { Cons } from "./Cons"
import { IfArray } from "../Check/IfArray"

export type ReverseTuple<Tuple extends unknown[], R extends unknown[] = []> = {
	0: R
	1: ((...l: Tuple) => void) extends ((h: infer H, ...t: infer T) => void) ? ReverseTuple<T, Cons<R, H>> : never
}[Tuple extends [unknown, ...unknown[]] ? 1 : 0]

/**
 * Reverse a List
 */
export type Reverse<List extends unknown[]> = IfArray<List, List[number][], ReverseTuple<List>>
