import { IEntity } from "./IEntity"
import { Component } from "@App/types"

/**
 * Basic store for entities.
 */
export interface IStore
{
	/**
	 * Creates a new entity.
	 */
	create(): IEntity

	/**
	 * Gets an entity with the provided id.
	 * @param id Unique identifier for the entity.
	 */
	read(id: number): IEntity

	/**
	 * Adds a component to the entity
	 * @param id
	 * @param component
	 */
	add(id: number, component: Component): void

	delete(entity: IEntity): IEntity
}