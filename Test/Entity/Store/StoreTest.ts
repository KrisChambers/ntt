import { IStore } from "@App/Entity/Types/IStore"

export function StoreTest (Store: new () => IStore)
{
	const name = Store.name

	describe(`Testing ${name}`, () =>
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

			test("New entity should have no components", () =>
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

		describe(`${name} read test`, () =>
		{
			const e1 = store.create()
			const e2 = store.create()

			test("Should return correct entity (not a copy)", () =>
			{
				const e = store.read(e1.id)
				const a = store.read(e2.id)

				expect(e.id).toBe(e1.id)
				expect(a.id).toBe(e2.id)
			})
		})
	})
}