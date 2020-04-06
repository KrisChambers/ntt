import { IQuery, QueryToEntity } from "."
import { IUpdateAllParams, IUpdateOneParams } from "./ISystem"

/**
 * Configuration for a system instance.
 */
export interface ISystemConfig<T extends IQuery>
{
	/**
	 * The name of the system.
	 */
	name: string

	/**
	 * The IQuery used to retrieve entities.
	 */
	query: T

	/**
	 * An update function that will be run on a single entity.
	 */
	updateOne?: (args: IUpdateOneParams<T>) => void

	/**
	 * An update function that will be run on all entities.
	 */
	updateAll?: (args: IUpdateAllParams<T>) => void
}
