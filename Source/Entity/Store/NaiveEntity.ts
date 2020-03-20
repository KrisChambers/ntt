import { Component, ComponentType, IfExtends, ComponentTypes, Props, IfMemberOf } from "@App/types"
import { IEntity } from "../Types/IEntity"

/**
 * A Simple implementation of the IEntity interface
 */
export class NaiveEntity<T extends Component[] = Component[]> implements IEntity<T>
{
	constructor (
		public readonly id: number,
		... components: Component[]
	)
	{
		components.forEach(comp => this.comps.set(this.getKey(comp), comp))
	}

	add<C extends {}> (type: ComponentType<C>, data: Props<C>): void
	{
		this.comps.set(this.getKey(type), data)
	}

	get count ()
	{
		return this.comps.size
	}

	has<C extends Component[]> (...types: ComponentTypes<C>): this is IEntity<C>
	{
		return types.map(type => this.comps.has(this.getKey(type))).reduce((p, c) => p && c, true)
	}

	get<C extends Component> (type: ComponentType<C>): IfMemberOf<C, T, C, unknown>
	{
		if (this.has(type))
		{
			return this.comps.get(this.getKey(type))
		}

		return null as unknown
	}

	update<C extends Component> (_type: ComponentType<C>, _data: IfExtends<C, T[number], Partial<C>, never>): void
	{
		throw new Error("Method not implemented.")
	}

	private getKey (type: ComponentType<Component> | Component)
	{
		if (typeof type === "function")
		{
			return type.name
		}

		return type.constructor.name
	}

	private comps: Map<string, T[number]> = new Map()
}