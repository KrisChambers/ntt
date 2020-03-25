import { IfMember } from "./IfMember"
import { Head, Push, Tail, EmptyList } from "."
import { IfEmpty } from "./IfEmpty"

/**
 * Gets the intersection of two finite lists.
 */
export type Intersection<L1 extends unknown[], L2 extends unknown[], R extends unknown[] = EmptyList> = {
	0: R
	1: IfMember<Head<L1>, L2,
	/*Then*/Intersection<Tail<L1>, L2, Push<R, Head<L1>>>,
	/*Else*/Intersection<Tail<L1>, L2, R>
	>
}[IfEmpty<L1, 0 , 1>]