/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * If `Sub` extends `Super` then evaluate to `True` else evaluate to `False`
 */
export type IfExtends<Sub, Super, True, False> = [Sub] extends [Super] ? True : False
// type IfExtendsTest_True = IfExtends<0, number, true, false> // should return `true`
//type IfExtendsTest_False = IfExtends<0, string, true, false> // should return `false`

/**
 * If `Sub` does not extend `Super` evaluate to `True` else evaluate to `False`
 */
export type IfNotExtends<Sub, Super, True, False> = [Sub] extends [Super] ? False : True
// type IfNotExtendsTest_True = IfNotExtends<0, string, true, false>	// should return true
// type IfNotExtendsTest_False = IfNotExtends<0, number, true, false>	// should return false

/**
 * Checks if two types are equal
 */
export type IfEqual<A, B, True, False> = IfExtends<A, B, IfExtends<B, A, True, False>, False>
// type IfEqualTest_True = IfEqual<1, 1, true, false>
// type IfEqualTest_False = IfEqual<1, 2, true, false>

/**
 * Checks if a type is an empty object
 */
export type IfEmptyObject<T extends {}, True, False> = IfEqual<{}, T, True, False>
// type IfEmptyTest_True = IfEmptyObject<{}, true, false>
// type IfEmptyTest_False = IfEmptyObject<number, true, false>

/**
 * Checks if a type is null
 */
export type IfNull<T, True, False> = IfEqual<null, T, True, False>
//type IfNullTest_True = IfNull<null, true, false>
//type IfNullTest_False = IfNull<1, true, false>

export type IfUnknown<T, True, False> = IfEqual<unknown, T, True, False>
// type IfUnknownTest_True = IfUnknown<unknown, true, false>
// type IfUnknownTest_False = IfUnknown<1, true, false>

type EmptyList = []
/**
 * Checks if the List is empty.
 */
export type IfEmpty<List extends unknown[], True, False> = List extends EmptyList ? True : False

/**
 * Gets the first item of a list
 */
export type Head<List extends unknown[]> = List[0]
// type HeadTest = Head<[1, 2 ,3]>	// should return 1

/**
 * Gets all the list after the first element.
 */
export type Tail<List extends unknown[]> =((...args: List) => void) extends ((a: never, ...args: infer U) => void) ? U : never
// type X = Tail<[1, 2, 3]> // Should return [2, 3]

/**
 * Creates a new list wit the head U
 */
export type Cons<List extends unknown[], H> = ((arg: H, ...args: List) => void) extends ((...args: infer X) => void) ? X : never
//type ConsText = Cons<[1, 2, 3], 0>	// Should be [0, 1, 2, 3]

/**
 * If `Item` is a member of `List` then evaluates to `True` otherwise `False`
 */
export type IfMemberOf<Item, List extends unknown[], True = true, False = false> = {
	0: False
	1: IfEqual<Item, Head<List>, True, IfMemberOf<Item, Tail<List>, True, False>>
}[List extends [any, ... any[]] ? 1 : 0]
//type IfMemberOfTest1 = IfMemberOf<1, [1, 2, 3]> // Should evaluate to true
//type IfMemberOfTest2 = IfMemberOf<1, [2, 3, 4]> // Should evaluate to false
//type IfMemberOfTest2 = IfMemberOf<1, [number, string]> // Should be false

/**
 * Reverse a List
 */
export type Reverse<List extends any[], R extends any[] = []> = {
	0: R
	1: ((...l: List) => any) extends ((h: infer H, ...t: infer T) => any) ?
		Reverse<T, Cons<R, H>> :
		never
}[List extends [any, ...any[]] ? 1 : 0];
//type ReverseTest = Reverse<[1, 2, 3]> // Should be [3, 2, 1]

/**
 * Pushes an item onto the end of a list.
 */
export type Push<List extends any[], Item> = Reverse<Cons<Reverse<List>, Item>>
// type PushTest = Push<[1, 2, 3], 0>


type InstanceProp<T> = T extends Record <infer S, infer U> ? Record<S, Instance<U>> : never

export type ToObject<Records extends Record<string, any>[], R extends {} = {}> = {
	0: R
	1: Records extends [any, ... any[]] ?
		ToObject<Tail<Records>, R & InstanceProp<Records[0]>> :
		never
}[Records extends [any, ... any[]] ? 1 : 0]

// type ToObjectTest = ToObject<[Record<"name", string>, Record<"age", number>]>
type PropertyType<T> = T extends Record<any, infer U> ? U : never

/**
 * Takes an object and returns property types as a tuple.
 *
 * This is generally used in conjunction with ToObject to make sure we are using the right types.
 */
export type ToTypeTuple<obj extends Record<string, any>[], R extends any[] = []> = {
	0: R
	1: obj extends [any, ... any[]] ?
		ToTypeTuple<Tail<obj>, Push<R, Instance<PropertyType<Head<obj>>>>> :
		never
}[obj extends [any, ... any[]] ? 1 : 0]

export type Instance<T> = T extends (new (... args: any[]) => infer U) ? U : never

//type ToTypeTupleTest = ToTypeTuple<[Record<"name", string>, Record<"age", number>]> // should get [string, number]
//type ToTypeTupleTest2 = ToTypeTuple<[{ "name": string, }, {"age": number,}]>

/**
 * Maps all items in T to type U.
 */
export type Map<T extends any[], U> = {
	[K in keyof T]: U
}
// type AsTest = Map<[1, 2, 3], string>	// Should be [string, string, string]

/**
 * Helper type for mapping a class to it's properties
 */
export type Props<T> = {
	[K in keyof T]: T[K]
}

/**
 * A Component is an object represented by a list of properties.
 */
// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface Component
{
	[key: string]: any
}
// export type Component = ToObject<ComponentProperty<string, any>[]>

/**
 * A ComponentType is a function that can construct a Component.
 */
export type ComponentType<T extends Component> = (...args: any[]) => T

/**
 *
 */
export type ComponentTypes<T extends Component[] = Component[]> = {
	[K in keyof T]: ComponentType<T[K]>
}

