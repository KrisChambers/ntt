import { ISystemType } from "./ISystem"
import { IQuery } from "."
import { IEntityManager } from "./IEntityManager"
import { ISystemManager } from "@App/UniverseBuilder"

/**
 * A universe represents a grouping of entities and systems.
 */
export interface IUniverse
{
	/**
	 * The systems that will operate.
	 *
	 * The order in which they appear here is the order of their execution.
	 */
	readonly systems: ISystemManager

	/**
	 * The manager of the universe's entities.
	 */
	readonly entity: IEntityManager

	/**
	 * Runs all systems update cycles.
	 *
	 * @param dt The time lapsed since the last run.
	 */
	update(dt: number): void
}