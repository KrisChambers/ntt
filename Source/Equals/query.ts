import { IQuery, ComponentType } from "@App/Types"

export function arrayEqual (arr1?: Array<ComponentType>, arr2?: Array<ComponentType>)
{
	const
		a = arr1 ?? [],
		b = arr2 ?? []

	if (a.length != b.length) return false

	if (a.some(aitem => !b.some(bitem => bitem.name === aitem.name))) return false

	if (b.some(bitem => !a.some(aitem => bitem.name === aitem.name))) return false

	return true
}

/**
 * Checks if two IQuery are equal.
 *
 * @param a The first IQuery
 * @param b The second IQuery
 */
export function queryEquals (a: IQuery, b: IQuery)
{
	return arrayEqual(a.all, b.all) && arrayEqual(a.any, b.any) && arrayEqual(a.none, b.none)
}
