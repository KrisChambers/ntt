import { IfEqual } from "../Check/IfEqual"
import { EmptyList } from "./EmptyList"

/**
 * Gets the item type of the array.
 */
export type GetItemType<Arr extends unknown[]> = IfEqual<Arr, EmptyList,
unknown,
Arr extends Array<infer U> ?U : never
>