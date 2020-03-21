import { IdGenerator } from "@App/Store/IdGenerator"

describe("IdGenerator tests", () =>
{
	const gen = new IdGenerator(0)

	const getIds = (x: number) =>
	{
		const ids: number[] = []

		for (let i = 0; i < x; i++)
		{
			ids.push(gen.getId())
		}

		return ids
	}

	const testNUnique = (n: number) =>
	{
		test(`Generates ${n} unique numbers`, () =>
		{
			const ids = new Set(getIds(n))

			expect(ids.size).toBe(n)
		})
	}

	testNUnique(10)
	testNUnique(100)
	testNUnique(1000)
	testNUnique(10000)
})