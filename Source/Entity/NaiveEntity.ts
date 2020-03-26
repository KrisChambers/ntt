import { Component, ComponentType, ComponentTypes, ConstructorReturnType } from "@App/Types/Component"
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
	{ }

	add<C extends ComponentType> (type: C, ...data: ConstructorParameters<ComponentType<C>>): IEntity<Cons<T, ConstructorReturnType<C>>>
	{
		this.comps.set(type, new type(... data))

		return this as unknown as IEntity<Cons<T, ConstructorReturnType<C>>>
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
