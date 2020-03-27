import { ISystemType, IQueryBuilder, ISystem, IEntityManager, Component, IQuery } from "@App/Types"
import { getQueryBuilder } from "@App/QueryBuilder"
import { ISystemConfig } from "@App/Types/ISystemConfig"

/**
 * Basic idea for creating new service types.
 *
 * @param config The configuration for the service.
 */
export function register<X extends Component[], Y extends Component[], Z extends Component[]> (config: ISystemConfig<IQueryBuilder<X, Y, Z>>): ISystemType<IQuery<X, Y, Z>>
{
	return class implements ISystem
	{
		public static readonly query = config.query(getQueryBuilder()).build()

		constructor (private manager: IEntityManager)
		{ }

		update (dt: number)
		{
			config.update(dt)
		}
	}
}
