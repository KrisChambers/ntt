/**
 * Maps all items in T to type U.
 */
export type Map<T extends unknown[], U> = {
	[K in keyof T]: U;
};
