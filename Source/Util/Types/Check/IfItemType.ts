import { IfExtends } from "./IfExtends"
import { GetItemType } from "../List/GetItemType"

/**
 * Performs a check on the type of items in an array.
 */
export type IfItemType<Arr extends unknown[], ItemType, True = true, False = false> = IfExtends<ItemType, GetItemType<Arr>, True, False>;
