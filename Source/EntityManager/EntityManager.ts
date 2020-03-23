import { IEntityManager } from "@App/Types/IEntityManager"
import { IQueryDesc } from "@App/Types/QueryDesc"
import { IEntity } from "@App/Types/IEntity"
import { IStore } from "@App/Types/IStore"
import { IEntityBuilder } from "@App/Types/IEntityBuilder"

export class EntityManager implements IEntityManager
{
	constructor (private store: IStore)
	{ }

	/**
	 * Get an entity builder to create a new entity.
	 */
	create (): IEntityBuilder
	{
		throw new Error("Not Implemented")
	}

	query (desc: IQueryDesc): IEntity[]
	{
		return this.store.find(desc)
	}
}