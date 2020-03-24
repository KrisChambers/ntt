import { ComponentType, Component } from "@App/Types/Component"
import { Props } from "@App/Util/Types/Props"
import { Cons } from "@App/Util/Types/List/Cons"
import { IEntity } from "./IEntity"

/**
 * A type for building an entity.
 */
export interface IEntityBuilder<Components extends Component[] = []>
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
	with<T extends ComponentType, C = ReturnType<T>>(comp: T, ... data: Parameters<T>): IEntityBuilder<Cons<Components, C>>

	/**
	 * Returns the newly created entity.
	 */
	build(): IEntity<Components>
}

