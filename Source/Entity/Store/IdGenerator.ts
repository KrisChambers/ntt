/**
 * Generates unique ids.
 */
export class IdGenerator
{
	constructor (initial: number)
	{
		this.next = initial - 1
	}

	/**
	 * Gets the next Id.
	 */
	getId ()
	{
		return this.next ++
	}

	private next: number
}