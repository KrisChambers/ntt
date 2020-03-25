import { IQuery } from "./IQuery"
import { IEntityManager } from "./IEntityManager"
import { DeepReadonly } from "@App/Util/Types/DeepReadOnly"

/**
 * Basic type for a System.
 */
export interface ISystem
{
	/**
	 * The main operation that the system performs.
	 *
	 * @param dt The time step.
	 */
	update (dt?: number): void
}

/**
 * Properties on the type of a system.
 */
export interface ISystemType
{
	/**
	* The query that defines the main type of components that the system operates on.
	*/
	readonly query: DeepReadonly<IQuery>

	/**
	 * Constructs a new instances of the system.
	 * @param manager An IEntityManager instance for the system to use.
	 */
	new (manager: IEntityManager): ISystem
}