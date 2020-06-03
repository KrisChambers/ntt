import { ComponentType, Component, ConstructorReturnType } from "@App/Types/Component"
import { Cons } from "@App/Util/Types/List/Cons"
import { IEntity } from "./IEntity"

/**
 * A type for building an entity.
 */
export interface IEntityBuilder<Components extends Component[] = Component[]>
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
	with<T extends ComponentType>(comp: T, ... params: ConstructorParameters<T>): IEntityBuilder<Cons<Components, ConstructorReturnType<T>>>

	/**
	 * Returns the newly created entity.
	 */
	build(): IEntity<Components>
}

