import { Num } from "./Num"

/**
 * Converts a Num into a javascript number.
 */
export type ToNumber<T extends Num> = T["length"]