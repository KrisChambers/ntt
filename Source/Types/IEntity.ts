import { Component, ComponentType, ComponentTypes, ConstructorReturnType } from "@App/Types/Component"
import { Remove } from "@App/Util/Types/List/Remove"
import { IfMember } from "@App/Util/Types/List/IfMember"
import { Cons } from "@App/Util/Types/List/Cons"
import { Push } from "@App/Util/Types/List"


/**
 * The type of an entity with some helper functions.
 */
export interface IEntity<T extends Component[] = []>
{
	/**
	 * A Unique identifier for the entity.
	 */
	id: number

	/**
	 * The number of components attached to the entity.
	 */
	count: number

	/**
	 * Checks if the entity has the provided component.
	 */
	has<C extends Component>(type: ComponentType<C>): this is IEntity<Cons<T, C>>

	/**
	 * Gets the component of the provided type if it exists.
	 *
	 * @param type The component type we want to get.
	 */
	get<C extends Component>(type: ComponentType<C>): IfMember<C, T, C, never>

	/**
	 * Updates the entities component of the provided type.
	 *
	 * @param type The type of component we want to update
	 * @param data The new, updated data.
	 */
	update<C extends Component>(type: ComponentType<C>, data: IfMember<C, T, Partial<C>, never>): void

	/**
	 * Adds the component to the entity
	 *
	 * @param type The component type being added
	 * @param data The data of the component
	 */
	//create<T extends ComponentType>(Class: T, ...params: ConstructorParameters<T>): ConstructorReturnType<T>
	add<C extends ComponentType>(type: C, ...data: ConstructorParameters<C>): IEntity<Cons<T, ConstructorReturnType<C>>>

	/**
	 * Removes the component type from the entity.
	 *
	 * @param type The type of component to remove.
	 */
	remove<C extends Component>(type: ComponentType<C>): IEntity<Remove<C, T>>
}

/**
 * Constructor for an IEntity
 */
export interface IEntityConstructor
{
	new <T extends Component[] = []>(id: number): IEntity<T>
}