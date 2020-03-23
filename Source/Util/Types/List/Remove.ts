import { IfEqual } from "../Check/IfEqual"
import { Head } from "./Head"
import { Tail } from "./Tail"
import { Push } from "./Push"

/**
 * Removes all instances of `Item` from `List`
 */
export type Remove<Item, List extends unknown[], NewList extends unknown[] = []> = {
	0: NewList
	1: IfEqual<Item, Head<List>, Remove<Item, Tail<List>, NewList>, Remove<Item, Tail<List>, Push<NewList, Head<List>>>>
}[List extends [unknown, ...unknown[]] ? 1 : 0];
