/* eslint-disable @typescript-eslint/interface-name-prefix */
import { Component, ComponentTypes } from "@App/Types/Component"

/**
 * Describes a query to get entities.
 */
export interface IQuery<
	All extends Component[] = Component[],
	Any extends Component[] = Component[],
	None extends Component[] = Component[]
>
{
	/**
	 * Returned entities must have all the components in this list.
	 */
	All?: ComponentTypes<All>

	/**
	 * Returned entities must have atleast one of the components in this list.
	 */
	Any?: ComponentTypes<Any>

	/**
	 * Entities must have none of the components in this list.
	 */
	None?: ComponentTypes<None>
}

/**
 * Builds a query description.
 */
export interface IQueryBuilder<
	All extends Component[] = [],
	Any extends Component[] = [],
	None extends Component[] = []
>
{
	/**
	 * Specifies that all the types need to be included in the entity.
	 *
	 * @param types The types of components.
	 */
	all<T extends Component[] =[]>( ... types: ComponentTypes<T>): IQueryBuilder<T, Any, None>

	/**
	 * Specifies that atleast one of the types must be included.
	 *
	 * @param types The types of components.
	 */
	any<T extends Component[] = []>(... types: ComponentTypes<T>): IQueryBuilder<All, T, None>

	/**
	 * Specifies that none of the types much be included.
	 * @param types The types of components.
	 */
	none<T extends Component[] = []>(... types: ComponentTypes<T>): IQueryBuilder<All, Any, T>

	/**
	 * Builds the query.
	 */
	build(): IQuery<All, Any, None>
}
