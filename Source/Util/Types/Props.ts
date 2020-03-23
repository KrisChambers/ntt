/**
 * Helper type for mapping a class to it's properties.
 *
 * This was necessary to maintain the class name when the type was inferenced.
 */
export type Props<T> = {
	[K in keyof T]: T[K];
};
