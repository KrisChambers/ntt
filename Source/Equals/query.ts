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

export function queryEquals (a: IQuery, b: IQuery)
{
	return arrayEqual(a.All, b.All) && arrayEqual(a.Any, b.Any) && arrayEqual(a.None, b.None)
}
