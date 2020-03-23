/**
 * A Component is an object represented by a list of properties.
 */
// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface Component
{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any
}

/**
 * A ComponentType is a function that can construct a Component.
 */
export type ComponentType<T extends Component = Component> = (...args: any[]) => T

/**
 * Maps a tuple of Component to a tuple of their Types.
 */
export type ComponentTypes<T extends Component[] = Component[]> = {
	[K in keyof T]: ComponentType<T[K]>
}

