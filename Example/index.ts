import { ISystem, ISystemType } from "../Source/Types/ISystem"
import { IQuery } from "../Source/Types/IQueryDesc"
import { Component } from "../Source/Types/Component"
import { DeepReadonly } from "../Source/Util/Types/DeepReadOnly"
import { IEntityManager } from "../Source/Types/IEntityManager"
export const x = { }

class Text implements Component
{
	constructor (public value: string)
	{ }
}

/**
 * A System for writing entities with text components to the console.
 */
const WritingSystem: ISystemType = class implements ISystem
{
	constructor (private manager: IEntityManager)
	{ }

	public static readonly query: IQuery = {
		All: [ Text ]
	}

	get query ()
	{
		return WritingSystem.query
	}

	update ()
	{
		const entities = this.manager.query(this.query)
	}
}