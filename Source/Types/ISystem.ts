import { IQuery } from "./IQuery"
import { IEntityManager } from "./IEntityManager"
import { QueryToEntity } from "."

/**
 * Parameters for updating one entity.
 */
export interface IUpdateOneParams<T extends IQuery>
{
	entity: QueryToEntity<T>
	dt: number
}

/**
 * Parameters for updating all entities.
 */
export interface IUpdateAllParams<T extends IQuery>
{
	entities: QueryToEntity<T>[]
	dt: number
}
/**
 * Basic type for a System.
 */
export interface ISystem<T extends IQuery>
{
	/**
	 * Updates many entities.
	 *
	 * @param dt The time step.
	 */
	updateAll (entities: QueryToEntity<T>[], dt: number): void

	/**
	 * Updates one entity.
	 *
	 * @param params paramaters for the update
	 */
	updateOne (entity: QueryToEntity<T>, dt: number): void

	/**
	 * updates the entities.
	 *
	 * @param dt
	 */
	update (dt: number): void
}

/**
 * Properties on the type of a system.
 */
export interface ISystemType<T extends IQuery = IQuery>
{
	/**
	 * The name of the System.
	 */
	readonly Name: string

	/**
	* The query that defines the main type of components that the system operates on.
	*/
	readonly Query: T

	/**
	 * Constructs a new instances of the system.
	 * @param manager An IEntityManager instance for the system to use.
	 */
	new (manager: IEntityManager): ISystem<T>
}