import { IfEqual } from "./IfEqual"

/**
 * Checks if a type is assignable to `unknown`
 */
export type IfUnknown<T, True = true, False = false> = IfEqual<unknown, T, True, False>;
