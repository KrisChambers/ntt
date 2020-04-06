import { SystemBuilder } from "./SystemBuilder"
import { ISystemBuilder } from "@App/Types/ISystemBuilder"
import { IQuery } from "@App/Types"

/**
 * Returns an ISystemBuilder
 */
export function getSystemBuilder (): ISystemBuilder<IQuery<[], [], []>>
{
	return new SystemBuilder()
}