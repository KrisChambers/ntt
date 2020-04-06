import { IQuery } from "@App/Types/IQuery"
import { Component, ComponentTypes } from "@App/Types/Component"
import { IQueryBuilder } from "@App/Types/IQueryBuilder"

/**
 * QueryBuilder implementation for generating IQueries.
 */
export class QueryBuilder<
	All extends Component[] = [],
	Any extends Component[] = [],
	None extends Component[] = []>
implements IQueryBuilder<All, Any, None>
{
	/**
	 * Specifies that all the types need to be included in the entity.
	 *
	 * @param types The types of components.
	 */
	all<T extends Component[] = []> (...types: ComponentTypes<T>): IQueryBuilder<T, Any, None>
	{
		this.allQuery = types as unknown as ComponentTypes<All>

		return this as unknown as IQueryBuilder<T, Any, None>
	}

	/**
	 * Specifies that atleast one of the types must be included.
	 *
	 * @param types The types of components.
	 */
	any<T extends Component[] = []> (...types: ComponentTypes<T>): IQueryBuilder<All, T, None>
	{
		this.anyQuery = types as unknown as ComponentTypes<Any>

		return this as unknown as IQueryBuilder<All, T, None>
	}

	/**
	 * Specifies that none of the types much be included.
	 * @param types The types of components.
	 */
	none<T extends Component[] = []> (...types: ComponentTypes<T>): IQueryBuilder<All, Any, T>
	{
		this.noneQuery = types as unknown as ComponentTypes<None>

		return this as unknown as IQueryBuilder<All, Any, T>
	}

	/**
	 * Builds the query.
	 */
	build (): Required<IQuery<All, Any, None>>
	{
		return {
			all: [ ... this.allQuery ] as ComponentTypes<All>,
			any: [... this.anyQuery] as ComponentTypes<Any>,
			none: [ ... this.noneQuery ] as ComponentTypes<None>
		} // as IQuery<All, Any, None>
	}

	private allQuery = [] as unknown as ComponentTypes<All>
	private anyQuery= [] as unknown as ComponentTypes<Any>
	private noneQuery = [] as unknown as ComponentTypes<None>
}

export interface IQueryBuilderConstructor
{
	new(): IQueryBuilder
}
