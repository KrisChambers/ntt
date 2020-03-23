import { ComponentType, Component } from "@App/Types/Component"
import { Props } from "@App/Util/Types/Props"
import { Cons } from "@App/Util/Types/List/Cons"
import { IEntity } from "./IEntity"

/**
 * A type for building an entity.
 */
export interface IEntityBuilder<C extends Component[] = []>
{
	/**
	 * Creates a new Entity
	 */
	create(): IEntityBuilder

	/**
	 * Adds a component to the entity.
	 *
	 * @param comp The component type being added.
	 * @param data The component data.
	 */
	with<T>(comp: ComponentType<T>, data: Props<T>): IEntityBuilder<Cons<C, T>>

	/**
	 * Returns the newly created entity.
	 */
	build(): IEntity<C>
}

