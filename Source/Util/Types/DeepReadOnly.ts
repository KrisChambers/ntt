import { IfExtends } from "./Check"

type DeepReadonlyArray<T> = T extends Array<infer U> ? ReadonlyArray<U> : never
type DeepReadonlyObject<T> = T extends {} ? {
	readonly [K in keyof T]: T[K]
} : never

/**
 * Defines a deeply readonly object or array.
 */
export type DeepReadonly<T extends {} | Array<unknown>> =
IfExtends<T, Array<unknown>,
/**/DeepReadonlyArray<T>,
/*	*/IfExtends<T, {},
/*		*/DeepReadonlyObject<T>, never>
>