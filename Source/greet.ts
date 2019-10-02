/**
 * Boop
 *
 * @param x Boop
 */
export function greet (x: string): string
{
	return `Hello ${x}!`
}

export enum Greeting {
	Hello,
	Hi
}

export class Thing
{ }

export interface T
{
	blah: string;
}
