import { IStore } from "@App/Types/IStore"
import { IEntity } from "@App/Types/IEntity"
import { NaiveEntity } from "@App/Entity/NaiveEntity"
import { IdGenerator } from "./IdGenerator"
import { IQuery } from "@App/Types/IQuery"
import { Default } from "./Matcher"

/**
 * A Naive implementation of the store interface.
 */
export class NaiveStore implements IStore
{
	constructor (
		private readonly all = Default.All,
		private readonly any = Default.Any,
		private readonly none = Default.None
	)
	{ }

	find (desc: IQuery): IEntity[]
	{
		const query = this.getQuery(desc)
		const result: IEntity[] = []

		for(const e of this.entities.values())
			if(this.isMatch(e, query))
				result.push(e)

		return result
	}

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
		const entity = this.entities.get(id)

		if (entity != null)
		{
			return entity
		}

		throw this.InvalidIdError(id)
	}

	private isMatch (entity: IEntity, query: Required<IQuery>)
	{
		return this.all(entity, ... (query.all ?? [])) &&
			this.any(entity, ... query.any ?? []) &&
			this.none(entity, ... query.none ?? [])
	}

	private getQuery (query: IQuery): Required<IQuery>
	{
		return {
			all: query.all ?? [],
			any: query.any ?? [],
			none: query.none ?? []
		}
	}

	private getId ()
	{
		return this.idGen.getId()
	}

	private entities: Map<number, IEntity> = new Map()
	private idGen = new IdGenerator(0)

	private InvalidIdError = (id: number) => Error(`Invalid id ${id}`)
}