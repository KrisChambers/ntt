import { IQueryBuilder } from "@App/Types"
import { QueryBuilder } from "./QueryBuilder"

/**
 * Gets an instance of an IQueryBuilder
 */
export function getQueryBuilder (): IQueryBuilder<[],[],[]>
{
	return new QueryBuilder()
}