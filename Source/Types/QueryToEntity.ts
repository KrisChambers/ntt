import { IEntity } from "./IEntity"
import { IQuery } from "./IQuery"

/**
 * Generates the type of an IEntity from a IQuery
 */
export type QueryToEntity<TQuery> = TQuery extends IQuery<infer All> ? IEntity<All> : never
