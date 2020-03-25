import { Component, ComponentType, ConstructorReturnType } from "@App/Types/Component"
import { IEntityBuilder } from "@App/Types/IEntityBuilder"
import { Cons } from "@App/Util/Types/List"
import { IEntity } from "@App/Types/IEntity"
import { IStore } from "@App/Types/IStore"

/**
 * IEntityBuilder Implementation
 */
export class EntityBuilder<Components extends Component[] = []> implements IEntityBuilder<Components>
{
	private entity: IEntity<Components> | null = null

	constructor (private store: IStore)
	{ }

	create (): IEntityBuilder
	{
		this.entity = this.store.create() as unknown as IEntity<Components>
		return this as unknown as IEntityBuilder
	}

	with<T extends ComponentType> (comp: T, ...params: ConstructorParameters<T>): IEntityBuilder<Cons<Components, ConstructorReturnType<T>>>
	{
		this.entity?.add(comp, ... params)

		return this as never
	}

	build (): IEntity<Components>
	{
		if (this.entity == null)
			return this.store.create() as unknown as IEntity<Components>

		else return this.entity
	}
}
