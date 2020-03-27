import { SystemBuilder } from "./SystemBuilder"
import { ISystemBuilder } from "@App/Types/ISystemBuilder"

/**
 * Returns an ISystemBuilder
 */
export function getSystemBuilder (): ISystemBuilder
{
	return new SystemBuilder()
}