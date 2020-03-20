import { IStore } from "@App/Entity/Types/IStore"

export function StoreTest (name: string, Store: new () => IStore)
{
	describe("Testing Store " + name, () =>
	{
		const store = new Store()

		describe(`${name} create test`, () =>
		{
			test("It should return an Entity with an Id", () =>
			{
				const entity = store.create()

				expect(entity).toBeDefined()
				expect(entity.id).toBeDefined()
			})

			test("It should have no components", () =>
			{
				const entity = store.create()

				expect(entity).toBeDefined()
				expect(entity.count).toBe(0)
			})

			test("Generated ids should be unique", () =>
			{
				const
					e1 = store.create(),
					e2 = store.create()

				expect(e1.id).not.toBe(e2.id)
			})
		})

	})
}