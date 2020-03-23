import { Cons } from "./Cons"
import { Reverse } from "./Reverse"
import { IfArray } from "../Check/IfArray"
import { GetItemType } from "./GetItemType"

/**
 * Pushes an item onto the end of a list.
 */
export type Push<List extends unknown[], Item> = IfArray<List, (GetItemType<List> | Item)[],
Reverse<Cons<Reverse<List>, Item>>>