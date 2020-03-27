import { IQueryBuilder } from "."

/**
 * Configuration for creating a new IService
 */
export interface ISystemConfig<T extends IQueryBuilder>
{
	/**
	 * A Unique name for the service
	 */
	name: string

	/**
	 * A function for generating the query builder
	 */
	query: (builder: IQueryBuilder<[], [], []>) => T

	/**
	 * The update function the service will run.
	 */
	update: (dt: number) => void
}
