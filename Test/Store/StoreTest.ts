import { IStore } from "@App/Types/IStore"
import { Name, TestPosition, Shape, X, Y } from "../TestComponents"

export function StoreTest (Store: new () => IStore)
{
	const name = Store.name

	describe(`Testing ${name}`, () =>
	{
		describe(`${name} create test`, () =>
		{
			const store = new Store()
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
			const store = new Store()
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

		describe(`${name} query test`, () =>
		{
			const store = new Store()
			store.create()
				.add(Name, "A")
				.add(TestPosition, 2, 2)
				.add(Shape, 2, 2)
				.add(X, 2)

			store.create()
				.add(Name, "B")
				.add(Shape, 2, 2)
				.add(Y, 2)

			store.create()
				.add(Name, "C")
				.add(X, 2)
				.add(TestPosition, 2, 2)

			store.create()
				.add(X, 2)
				.add(Y, 2)

			test("Grab all entities", () =>
			{
				const result = store.find({ })

				expect(result).toHaveLength(4)
			})

			test("Grab all entities that have a Name", () =>
			{
				const result = store.find({ all: [ Name ]})

				expect(result).toHaveLength(3)
			})
		})
	})
}