import { IStore } from "@App/Types/IStore"
import { IEntity } from "@App/Types/IEntity"
import { Component } from "@App/types"
import { NaiveEntity } from "@App/Entity/NaiveEntity"
import { IdGenerator } from "./IdGenerator"

/**
 * A Naive implementation of the store interface.
 */
export class NaiveStore implements IStore
{
	private InvalidIdError = (id: number) => Error(`Invalid id ${id}`)

	destroy (id: number): void
	{
		this.entities.delete(id)
	}

	create (): IEntity
	{
		const entity = new NaiveEntity(this.getId())

		this.entities.set(entity.id, entity)

		return entity
	}

	read (id: number): IEntity
	{
		if (this.entities.has(id))
		{
			return new NaiveEntity(id, this.entities.get(id) ?? [])
		}

		throw this.InvalidIdError(id)
	}

	add (id: number, component: Component): void
	{
		if (this.entities.has(id))
		{
			this.entities.get(id)?.add(component)
		}

		throw this.InvalidIdError(id)
	}

	private getId ()
	{
		return this.idGen.getId()
	}

	private entities: Map<number, IEntity> = new Map()
	private idGen = new IdGenerator(0)
}