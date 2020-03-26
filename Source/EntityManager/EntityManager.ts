import { IEntityManager } from "@App/Types/IEntityManager"
import { IQuery } from "@App/Types/IQuery"
import { IStore } from "@App/Types/IStore"
import { IEntityBuilder } from "@App/Types/IEntityBuilder"
import { QueryToEntity } from "@App/Types/QueryToEntity"
import { EntityBuilder } from "@App/EntityBuilder"

/**
 *
 */
export class EntityManager implements IEntityManager
{
	constructor (private store: IStore)
	{ }

	/**
	 * Get an entity builder to create a new entity.
	 */
	create (): IEntityBuilder
	{
		return new EntityBuilder(this.store).create()
	}

	query<TQuery extends IQuery> (query: TQuery): QueryToEntity<TQuery>[]
	{
		return this.store.find(query) as unknown as QueryToEntity<TQuery>[]
	}
}

