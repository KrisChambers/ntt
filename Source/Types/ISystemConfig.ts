import { IQuery, QueryToEntity } from "."
import { IUpdateAllParams, IUpdateOneParams } from "./ISystem"

/**
 * Configuration for a system instance.
 */
export interface ISystemConfig<T extends IQuery>
{
	name: string

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
