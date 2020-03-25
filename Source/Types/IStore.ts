import { IEntity } from "./IEntity"
import { IQueryDesc } from "./IQueryDesc"

/**
 * Basic store for entities.
 */
export interface IStore
{
	/**
	 * Creates a new entity.
	 */
	create(): IEntity<[]>

	/**
	 * Gets an entity with the provided id.
	 *
	 * @param id Unique identifier for the entity.
	 */
	read(id: number): IEntity


	/**
	 * Removes the entity from the store.
	 *
	 * @param id the id of the entity
	 */
	destroy(id: number): void

	/**
	 * Finds all entities matching the query
	 *
	 * @param query The query for the store.
	 */
	find(query: IQueryDesc): IEntity[]
}