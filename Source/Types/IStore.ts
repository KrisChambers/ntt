import { IEntity } from "./IEntity"
import { Component, ComponentType } from "@App/types"

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
	 * Removes the entity from the store.
	 *
	 * @param id the id of the entity
	 */
	destroy(id: number): void
}