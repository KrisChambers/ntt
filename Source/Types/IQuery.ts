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

