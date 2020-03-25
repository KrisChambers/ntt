import { IfEqual } from "./IfEqual"
import { GetItemType } from "../List/GetItemType"
import { IfExtends } from "."

/**
 * Checks if the provided type is an array.
 *
 * Tuple types have a literal length type.
 * Arrays' length is of type number
 * This should be enough, but in some cases a tuple like [1] looks like it is being upcasted to number[]
 * so IfArray is not picking the right path. This is most noticable in the Push type.
 *
 *
 * Basic example
 * ```ts
 * // This passes.
 * const x: IfArray<number[]> = true
 *
 * // this fails.
 * const y: IfArray<[1, 2]> = true
 * ```
 */
export type IfArray<Arr, True = true, False = false> = Arr extends unknown[] ?
	And<IfEqual<Arr["length"], number>, IfEqual<GetItemType<Arr>[], Arr[number]>> extends true ?
		True :
		False :
	False

type And<T, U> = T & U
