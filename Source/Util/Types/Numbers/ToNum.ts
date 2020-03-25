import { Num } from "./Num"
import { Zero } from "./Zero"
import { Succ } from "./Succ"
import { IfEqual } from "../Check"

/**
 * Converts a javascript `number` into a Num
 */
export type ToNum<n extends number, i extends Num = Zero> = {
	0: i
	1: ToNum<n, Succ<i>>
}[IfEqual<n, i["length"], 0, 1>]