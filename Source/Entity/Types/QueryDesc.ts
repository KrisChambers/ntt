import { ComponentType } from "@App/types"

/**
 * Describes a query to get entities.
 */
export interface IQueryDesc
{
	/**
	 * Returned entities must have all the components in this list.
	 */
	All?: ComponentType[]

	/**
	 * Returned entities must have atleast one of the components in this list.
	 */
	Any?: ComponentType[]

	/**
	 * Entities must have none of the components in this list.
	 */
	None?: ComponentType[]
}