import { IfEqual } from "../Check/IfEqual"
import { Head } from "./Head"
import { Tail } from "./Tail"
/**
 * If `Item` is a member of `List` then evaluates to `True` otherwise `False`
 */
export type IfMember<Item, List extends unknown[], True = true, False = false> = {
	0: False
	1: IfEqual<Item, Head<List>, True, IfMember<Item, Tail<List>, True, False>>
}[List extends [unknown, ...unknown[]] ? 1 : 0];
