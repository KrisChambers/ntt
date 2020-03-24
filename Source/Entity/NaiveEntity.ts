import { Component, ComponentType, ComponentTypes } from "@App/Types/Component"
import { Remove } from "@App/Util/Types/List/Remove"
import { IfMember } from "@App/Util/Types/List/IfMember"
import { Cons } from "@App/Util/Types/List/Cons"
import { IfExtends } from "@App/Util/Types/Check/IfExtends"
import { IEntity } from "../Types/IEntity"

/**
 * A Simple implementation of the IEntity interface
 */
export class NaiveEntity<T extends Component[] = []> implements IEntity<T>
{
	constructor (public readonly id: number)
	{
		// components.forEach(comp => this.comps.set(this.getKey(comp), comp))
	}

	add<X extends ComponentType, C = ReturnType<X>> (type: X, ...data: Parameters<X>): IEntity<Cons<T, C>>
	{

		this.comps.set(type, type(data))

		return this as unknown as IEntity<Cons<T, C>>
	}

	get count ()
	{
		return this.comps.size
	}

	has<C extends Component[]> (...types: ComponentTypes<C>): this is IEntity<C>
	{
		return types.every(type => this.comps.has(type))
	}

	get<C extends Component> (type: ComponentType<C>): IfMember<C, T, C, unknown>
	{
		if (this.has(type))
		{
			return this.comps.get(type)
		}

		return null as unknown
	}

	update<C extends Component> (_type: ComponentType<C>, _data: IfExtends<C, T[number], Partial<C>, never>): void
	{
		throw new Error("Method not implemented.")
	}

	remove<C extends Component> (type: ComponentType<C>): IEntity<Remove<C, T>>
	{
		this.comps.delete(type)

		return this as unknown as IEntity<Remove<C, T>>
	}

	private comps: Map<ComponentType, T[number]> = new Map()
}