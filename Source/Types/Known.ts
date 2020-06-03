import { IfEqual, IfNotExtends } from "@App/Util/Types/Check"
import { Tail, Cons, Head, Reverse } from "@App/Util/Types/List"

type Cast<T, U> = T extends U ? T : U
/**
 * A type that returns an initial segment of known types.
 */
type _Known<T extends unknown[], R extends unknown[] = []> = {
	0: Reverse<R> extends infer A ? Cast<A, any> : never
	1: _Known<Tail<T>, Cons<R, Head<T>>> extends infer A ? Cast<A, any> : never
}[unknown[] extends T ? 0 : 1]

export type Known<T extends unknown[]> = IfNotExtends<T["length"], number, T, _Known<T> extends infer A ? Cast<A, any[]> : never>

type A = [number, string, ... unknown[]]

type S = IfEqual<number, unknown[], 1, 0>

type u = [1, 2, 3, 4, 5, 6, 7]
type Y = Known<u> extends infer A ? Cast<A, any[]> : never