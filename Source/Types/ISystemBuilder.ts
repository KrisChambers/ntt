import { IQuery, IQueryBuilder, Component } from "."
import { ISystemType, IUpdateOneParams, IUpdateAllParams } from "./ISystem"

/**
 * A type defining the contract for a builder of an ISystem
 */
export interface ISystemBuilder<T extends IQuery = IQuery>
{
	/**
	 * Sets the name of the system.
	 *
	 * @param name The name
	 */
	setName(name: string): ISystemBuilder<T>

	/**
	 * Builds the query for the system.
	 *
	 * @param buildFn The function to build the query
	 */
	query<X extends Component[], Y extends Component[], Z extends Component[]>(buildFn: (builder: IQueryBuilder) => IQueryBuilder<X, Y, Z>): ISystemBuilder<IQuery<X, Y, Z>>

	/**
	 * Adds a update function to operate on a single entity.
	 *
	 * @param updateOne The function to update a single entity.
	 */
	addUpdateOne(updateOne: (args: IUpdateOneParams<T>) => void): ISystemBuilder<T>

	/**
	 * Adds an update function to operate on the group of entities.
	 *
	 * @param updateAll The function to update multiple entities
	 */
	addUpdateAll(updateAll: (args: IUpdateAllParams<T>) => void): ISystemBuilder<T>

	/**
	 * Gets the built system
	 */
	build(): ISystemType<T>
}