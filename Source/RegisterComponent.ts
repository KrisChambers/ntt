import { ToObject, ToTypeTuple, Component } from "./types"

/**
 * Registers a new component type.
 *
 * @param componentName The name of the component. This must be unique.
 * @param props An array of key, value pairs of property names and their types.
 */
export function RegisterComponent<Props extends Record<string, unknown>[]> (componentName: string, ...props: Props): (...args: ToTypeTuple<Props>) => (ToObject<Props> & Component)
{
	const cstr = (...args: ToTypeTuple<Props>) =>
	{
		const obj = {} as { [name: string]: ToTypeTuple<Props>[number], }

		for (let i = 0; i < args.length; i++)
		{
			/* Note:
				The type system trips up here a bit.
				It can not derive the type for the values so it is setting it to never.
				But since obj[prop] is also of type never this isn't a problem.
			*/
			const value = args[i]
			const prop = Object.getOwnPropertyNames(props[i])[0]

			obj[prop] = value
		}

		obj.constructor = cstr

		return obj
	}

	// Note: fn.name is readonly.
	Object.defineProperty(cstr, "name", { value: componentName })

	return cstr
}