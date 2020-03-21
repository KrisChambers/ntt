import { IEntityConstructor, IEntity } from "@App/Types/IEntity"
import { RegisterComponent } from "@App/RegisterComponent"

/**
 * Base tests for implementations of IEntity
 *
 * @param Entity The entity class constructor
 */
export function EntityTest (Entity: IEntityConstructor)
{
	const _Name = RegisterComponent("Name", { text: String })
	interface Name extends ReturnType<typeof _Name>
	{ }
	const Name = (...args: Parameters<typeof _Name>) => _Name(...args) as Name

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

		describe(`${Entity.name} creation with component`, () =>
		{
			const e = new Entity(1, Name("Boop"))

			test("Entity should have 1 components", () =>
				expect(e.count).toBe(1)
			)

			test("Entity should return the component when it is defined", () =>
				expect(e.get(Name)).toBeDefined()	// Note: This is unknown
			)

			test("Entity.has should return true", () =>
			{
				expect(e.has(Name)).toBe(true)
			})
		})

		describe(`${Entity.name} removing a component`, () =>
		{
			const e: IEntity<[Name]> = new Entity(1, Name("Boop"))

			test("Should remove the name component", () =>
			{
				const c = e.remove(Name)

				expect(c.has(Name)).toBe(false)
				expect(c.get(Name)).toBeNull()
			})
		})
	})
}