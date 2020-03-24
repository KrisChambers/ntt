import { IEntityBuilder } from "@App/Types/IEntityBuilder"
import { IStore } from "@App/Types/IStore"
import { NaiveStore } from "@App/Store/NaiveStore"
import { Name, Pos } from "../TestComponents"
import { IEntity } from "@App/Types/IEntity"

/**
 * Standard tests for all entity builders.
 * @param Builder The constructor of the entity builder
 */
export function Test (Builder: new (stores: IStore) => IEntityBuilder)
{
	describe(`Testing ${Builder.name}`, () =>
	{
		// Todo: Should have a mock store of some sort.
		const builder = new Builder(new NaiveStore())

		describe("Builder.create Tests", () =>
		{
			test("Should return the same instance of the builder", () =>
			{
				expect(builder.create()).toBe(builder)
			})
		})

		describe("Builder.with Tests", () =>
		{
			test("Should return the same instance of the builder", () =>
			{
				const b: IEntityBuilder<[Name]> = builder.with(Name, "boop")
				expect(b).toBe(builder)
			})
		})

		describe("Builder.build Tests", () =>
		{
			test("Should return an IEntity with the components set", () =>
			{
				const entity: IEntity<[Pos, Name]> = builder.create()
					.with(Name, "Foo")
					.with(Pos, 10, 10)
					.build()

				expect(entity.has(Name)).toBe(true)
				expect(entity.has(Pos)).toBe(true)
				expect(entity.id).toBeDefined()
			})
		})
	})
}