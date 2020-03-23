import { IfEqual } from "./IfEqual"
/**
 * Checks if a type is null
 */
export type IfNull<T, True = true, False = false> = IfEqual<null, T, True, False>;
