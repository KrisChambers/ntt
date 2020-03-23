import { IEntity } from "./IEntity"
import { ComponentType } from "@App/Types/Component"

export interface IMatcher
{
	/**
	 * Validates if the entity is a match.
	 */
	(entity: IEntity, ... types: ComponentType[]): boolean
}
