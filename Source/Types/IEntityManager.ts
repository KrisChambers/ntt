import { IEntityBuilder } from "./IEntityBuilder"
import { IEntity } from "./IEntity"
import { IQueryDesc } from "./QueryDesc"

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
	query(desc: IQueryDesc): IEntity[]
}