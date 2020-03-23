/**
 * Basic type for doing a check for the type.
 *
 * Expect is `true` i the two types are the same, `false` otherwise
 *
 * So setting a variable to true will throw an error if the two types are not equal.
 *
 * Example
 * ```typescript
 * const test: Expect<1, 1> = true
 *
 * // this will have a type error since we are trying to assign true to a variable of type `false`
 * const test2: Expect<1, 2> = true
 * ```
 */
export type Assert<Value, Expected = true> = [Value] extends [Expected] ?
	([Expected] extends [Value] ?
		true :
		false
	) :
	false