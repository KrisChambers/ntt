import { Component, ComponentTypes } from "./Component"
import { IQuery } from "./IQuery"

/**
 * Builds a query description.
 */
export interface IQueryBuilder<
	All extends Component[] = Component[],
	Any extends Component[] = Component[],
	None extends Component[] = Component[]
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
	 *
	 * @param types The types of components.
	 */
	none<T extends Component[] = []>(... types: ComponentTypes<T>): IQueryBuilder<All, Any, T>

	/**
	 * Builds the query.
	 */
	build(): IQuery<All, Any, None>
}