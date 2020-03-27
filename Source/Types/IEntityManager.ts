import { IEntityBuilder } from "./IEntityBuilder"
import { IQuery } from "./IQuery"
import { QueryToEntity } from "./QueryToEntity"

/**
 * Manages the collection of entities.
 */
export interface IEntityManager
{
	/**
	 * Get an entity builder to create a new entity.
	 */
	create(): IEntityBuilder

	/**
	 * Query for a collection of Entities.
	 *
	 * @param desc The query description to be used.
	 */
	query<TQuery extends IQuery>(desc: TQuery): QueryToEntity<TQuery>[]
}