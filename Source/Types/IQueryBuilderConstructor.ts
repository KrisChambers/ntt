import { IQueryBuilder } from "./IQueryBuilder"

/**
 * Constructor for an IQueryBuilder
 */
export interface IQueryBuilderConstructor
{
	new (): IQueryBuilder<[], [], []>
}