/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * A Component is an object represented by a list of properties.
 */
// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface Component
{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface ComponentType<T extends Component = Component>
{
	new (... args: any[]): T
}

/**
 * Get the return type of the constructor function.
 */
export type ConstructorReturnType<T> = T extends (new (...args: any[]) => infer U) ? U : never

/**
 * Maps a tuple of Component to a tuple of their Types.
 */
export type ComponentTypes<T extends Component[] = Component[]> = {
	[K in keyof T]: ComponentType<T[K]>
}

