import { IStore } from "../Types/IStore"
import { IEntity } from "../Types/IEntity"
import { Component } from "@App/types"
import { NaiveEntity } from "./NaiveEntity"
import { IdGenerator } from "./IdGenerator"

/**
 * A Naive implementation of the store interface.
 */
export class NaiveStore implements IStore
{
	create (): IEntity
	{
		const id = this.getId()

		this.entities.set(id, [])

		return new NaiveEntity(id)
	}
	read (_id: number): IEntity
	{
		throw new Error("Method not implemented.")
	}
	add (_id: number, _component: {}): void
	{
		throw new Error("Method not implemented.")
	}
	delete (_entity: IEntity): IEntity
	{
		throw new Error("Method not implemented.")
	}

	private getId ()
	{
		return this.idGen.getId()
	}

	private entities: Map<number, Component[]> = new Map()
	private idGen = new IdGenerator(0)
}