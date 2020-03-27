import { ISystemBuilder } from "@App/Types/ISystemBuilder"
import { IQuery, Component, IQueryBuilder, ISystem, ISystemType, QueryToEntity, IUpdateOneParams, IUpdateAllParams, IEntityManager } from "@App/Types"
import { ISystemConfig } from "@App/Types/ISystemConfig"
import { getQueryBuilder } from "@App/QueryBuilder"

/**
 * Simple ISystemBuilder implementation
 */
export class SystemBuilder<T extends IQuery> implements ISystemBuilder<T>
{
	private config: Partial<ISystemConfig<T>> = {
		name: undefined,
		query: undefined,
		updateOne: undefined,
		updateAll: undefined
	}

	setName (name: string): ISystemBuilder<T>
	{
		this.config.name = name

		return this
	}

	query<X extends Component[], Y extends Component[], Z extends Component[]> (buildFn: (builder: IQueryBuilder<[], [], []>) => IQueryBuilder<X, Y, Z>): ISystemBuilder<IQuery<X, Y, Z>>
	{
		this.config.query = buildFn(getQueryBuilder()).build() as T

		return this as unknown as ISystemBuilder<IQuery<X, Y, Z>>
	}

	addUpdateOne (updateOne: (args: IUpdateOneParams<T>) => void): ISystemBuilder<T>
	{
		this.config.updateOne = updateOne

		return this
	}

	addUpdateAll (updateAll: (args: IUpdateAllParams<T>) => void): ISystemBuilder<T>
	{
		this.config.updateAll = updateAll

		return this
	}

	build (): ISystemType<T>
	{
		const config = this.config

		if (!this.isValid(config))
		{
			throw new Error("Invalid configuration")
		}
		const {name, query, updateOne, updateAll } = config

		return class implements ISystem<T>
		{
			public static Name = name

			public static readonly Query = query

			private query = query

			constructor (private manager: IEntityManager)
			{ }

			updateOne (entity: QueryToEntity<T>, dt: number)
			{
				if (updateOne != null)
				{
					updateOne({ entity, dt })
				}
			}

			updateAll (entities: QueryToEntity<T>[], dt: number)
			{
				if (updateAll != null)
				{
					updateAll({ entities, dt })
				}
				else
				{
					entities.forEach(entity => this.updateOne(entity, dt))
				}
			}

			update (dt: number)
			{
				this.updateAll(this.manager.query(this.query), dt)
			}
		}
	}

	private isValid (config: Partial<ISystemConfig<T>>): config is ISystemConfig<T>
	{
		const name = config.name ?? ""

		if (name == "") return false

		const query = config.query ?? null

		if (query === null) return false

		const { updateAll, updateOne } = config

		if (updateAll == null && updateOne == null) return false

		if (updateAll != null && updateOne != null) return false

		return true
	}

}