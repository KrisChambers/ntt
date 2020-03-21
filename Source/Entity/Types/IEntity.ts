import { IfMemberOf, Component, ComponentType, ComponentTypes, Props, Cons, Remove } from "@App/types"

/**
 * The type of an entity with some helper functions.
 */
export interface IEntity<T extends Component[] = Component[]>
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
	 * Checks if the entity has the provided components.
	 */
	has<C extends Component[]>(...types: ComponentTypes<C>): this is IEntity<C>

	/**
	 * Gets the component of the provided type if it exists.
	 *
	 * @param type The component type we want to get.
	 */
	get<C extends Component>(type: ComponentType<C>): IfMemberOf<C, T, C, unknown>

	/**
	 * Updates the entities component of the provided type.
	 *
	 * @param type The type of component we want to update
	 * @param data The new, updated data.
	 */
	update<C extends Component>(type: ComponentType<C>, data: IfMemberOf<C, T, Partial<C>, never>): void

	/**
	 * Adds the component to the entity
	 *
	 * @param type The component type being added
	 * @param data The data of the component
	 */
	add<C extends Component>(component: C): IEntity<Cons<T, C>>

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
	new (id: number, ... components: Component[]): IEntity
}
