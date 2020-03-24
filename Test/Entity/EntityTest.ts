import { IEntityConstructor } from "@App/Types/IEntity"
import { Name, X } from "../TestComponents"

/**
 * Base tests for implementations of IEntity
 *
 * @param Entity The entity class constructor
 */
export function EntityTest (Entity: IEntityConstructor)
{
	describe(`${Entity.name} tests`, () =>
	{
		describe(`${Entity.name} simple creation`, () =>
		{
			const e = new Entity(1)

			test("Entity should be defined", () =>
				expect(e).toBeDefined()
			)

			test("id should be equal to 1", () =>
				expect(e.id).toBe(1)
			)

			test("Entity should have no components", () =>
				expect(e.count).toBe(0)
			)

			test("Entity should return null if getting a component it doesn't have", () =>
				expect(e.get(Name)).toBeNull()
			)
		})

		describe(`${Entity.name} removing a component`, () =>
		{
			const e = new Entity(1).add(Name, "Boop")

			test("Should remove the name component", () =>
			{
				const c = e.remove(Name)

				expect(c.has(Name)).toBe(false)
				expect(c.get(Name)).toBeNull()
			})
		})

		describe(`${Entity.name} adding a component`, () =>
		{
			const e = new Entity(1)
				.add(Name, "boop")
				.add(X, 2)

			expect(e.has(Name)).toBe(true)
		})
	})
}