import { IUniverse } from "@App/Types/IUniverse"
import { ISystemBuilder } from "@App/Types/ISystemBuilder"
import { ISystemType, IEntityManager, ISystem, IQuery } from "@App/Types"
import { getSystemBuilder } from "@App/SystemBuilder"
import { getManager } from "@App/EntityManager"

/**
 * Manages a collection of systems.
 */
export interface ISystemManager
{
	/**
	 * Creates a new SystemType from a builder.
	 *
	 * @param fn
	 */
	create (fn: (builder: ISystemBuilder<IQuery<[], [], []>>) => ISystemBuilder): ISystemManager

	/**
	 * Adds prebuilt systems.
	 *
	 * @param systems The systems to be added.
	 */
	add (...systems: ISystemType[]): ISystemManager

	/**
	 * Initializes the systems.
	 */
	init(): void

	/**
	 * Runs the update loop of all systems.
	 *
	 * @param dt The time since last update.
	 */
	update(dt: number): void
}

/**
 * Implementation of ISystemManager
 */
export class SystemManager implements ISystemManager
{
	constructor (private manager: IEntityManager)
	{ }

	create (sysBuild: (b: ISystemBuilder<IQuery<[], [], []>>) => ISystemBuilder)
	{
		this.types.push(sysBuild(getSystemBuilder()).build())

		return this
	}

	add (... types: ISystemType[])
	{
		this.types.push(... types)

		return this
	}

	init ()
	{
		this.systems = this.types.map(type => new type(this.manager))
	}

	update (dt: number)
	{
		this.systems.forEach(system => system.update(dt))
	}

	private types: ISystemType[] = []

	private systems: ISystem[] = []
}

export function getSystemManager (entityManager: IEntityManager): ISystemManager
{
	return new SystemManager(entityManager)
}

export class Universe implements IUniverse
{
	constructor ()
	{
		this.entity = getManager()
		this.systems = getSystemManager(this.entity)
	}

	readonly systems: ISystemManager
	readonly entity: IEntityManager

	init ()
	{
		this.systems.init()
	}

	update (dt: number): void
	{
		this.systems.update(dt)
	}
}