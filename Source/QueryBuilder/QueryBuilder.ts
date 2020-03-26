import { IQueryBuilder, IQuery } from "@App/Types/IQuery"
import { Component, ComponentTypes } from "@App/Types/Component"

/**
 * QueryBuilder implementation for generating IQueries.
 */
export class QueryBuilder<
	All extends Component[] = [],
	Any extends Component[] = [],
	None extends Component[] = []>
implements IQueryBuilder<All, Any, None>
{
	query: IQuery = { }

	/**
	 * Specifies that all the types need to be included in the entity.
	 *
	 * @param types The types of components.
	 */
	all<T extends Component[] = []> (...types: ComponentTypes<T>): IQueryBuilder<T, Any, None>
	{
		this.query.All = types

		return this as unknown as IQueryBuilder<T, Any, None>
	}

	/**
	 * Specifies that atleast one of the types must be included.
	 *
	 * @param types The types of components.
	 */
	any<T extends Component[] = []> (...types: ComponentTypes<T>): IQueryBuilder<All, T, None>
	{
		this.query.Any = types

		return this as unknown as IQueryBuilder<All, T, None>
	}

	/**
	 * Specifies that none of the types much be included.
	 * @param types The types of components.
	 */
	none<T extends Component[] = []> (...types: ComponentTypes<T>): IQueryBuilder<All, Any, T>
	{
		this.query.None = types

		return this as unknown as IQueryBuilder<All, Any, T>
	}

	/**
	 * Builds the query.
	 */
	build (): IQuery<All, Any, None>
	{
		return this.query as unknown as IQuery<All, Any, None>
	}
}

export interface IQueryBuilderConstructor
{
	new(): IQueryBuilder
}
