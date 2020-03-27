import { IQuery } from "."

/**
 * Gets the type of All, Any, and None from a Query type.
 */
export type QueryTypes<T extends IQuery> = T extends IQuery<infer X, infer Y, infer Z> ? [X, Y, Z] : never