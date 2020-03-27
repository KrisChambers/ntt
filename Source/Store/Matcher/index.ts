import { IMatcher } from "@App/Types/IMatcher"

/**
 * The default matchers for the store.
 */
export const Default: {
	All: IMatcher
	Any: IMatcher
	None: IMatcher
} = {
	All: (entity, ... types) => types.length > 0 ? entity.has(... types) : true,
	Any: (entity, ... types) => types.length > 0 ? types.some(type => entity.has(type)) : true,
	None: (entity, ... types) => types.every(type => !entity.has(type))
}