import { IfEqual } from "./IfEqual"
/**
 * Checks if a type is an empty object
 */
export type IfEmptyObject<T extends {}, True = true, False = false> = IfEqual<{}, T, True, False>;
