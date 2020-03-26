import { IEntityManager } from "@App/Types/IEntityManager"
import { EntityManager } from "./EntityManager"
import { NaiveStore } from "@App/Store/NaiveStore"

/**
 * Returns a new EntityManager
 */
export function getManager (): IEntityManager
{
	return new EntityManager(new NaiveStore())
}