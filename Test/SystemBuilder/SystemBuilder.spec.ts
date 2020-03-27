import { SystemBuilder } from "@App/SystemBuilder/SystemBuilder"
import { getQueryBuilder, getManager } from "@App/index"
import { queryEquals } from "@App/Equals/query"
import { Name } from "../TestComponents"

describe("SystemBuilder tests", () =>
{
	describe("Creating a system", () =>
	{
		const system = new SystemBuilder()

		test("Should throw an error if no name is provided" , () =>
		{
			expect(() => system.build()).toThrow()

			system.setName("System")
		})

		test("Should throw an error if no query is provided", () =>
		{
			expect(() => system.build()).toThrow()

			system.query(builder => builder)
		})

		test("should throw an error if no update function is provided", () =>
		{
			expect(() => system.build()).toThrow()

			system.addUpdateOne(({ }) =>
			{
				return true
			})
		})

		test("should throw an error if both updateOne and updateAll is provided", () =>
		{
			system.addUpdateAll(({ }) =>
			{
				return true
			})

			expect(() => system.build()).toThrow()
		})
	})

	describe("Creating a Writing sytem test", () =>
	{
		const systemBd = new SystemBuilder()

		const updateOne = jest.fn()
		const WritingBuilder = systemBd
			.setName("Writing")
			.query(qb => qb.all(Name))
			.addUpdateOne(updateOne)

		test("Should not throw when creating the system type", () =>
		{
			expect(() => WritingBuilder.build()).not.toThrow()
		})

		const Writing = WritingBuilder.build()

		test("Should build a 'Writing' system", () =>
		{
			expect(Writing.Name).toBe("Writing")
		})

		test("Should be getting all entities with the Name component", () =>
		{
			const allName = getQueryBuilder().all(Name).build()
			expect(queryEquals(allName, Writing.Query)).toBe(true)
		})

		test("Should use the provided updateOne function", () =>
		{
			const write = new Writing(getManager())

			write.updateOne({} as never, 0)

			expect(updateOne.mock.calls).toHaveLength(1)
		})
	})


	describe("Creating a System that uses a custom updateAll function", () =>
	{
		const systemBd = new SystemBuilder()

		const updateAll = jest.fn()
		const updateOne = jest.fn()
		const CollisionBuilder = systemBd
			.setName("Collision")
			.query(qb => qb.all(Name))
			.addUpdateAll(updateAll)

		test("Should not throw when creating the system type", () =>
		{
			expect(() => CollisionBuilder.build()).not.toThrow()
		})

		const Collision = CollisionBuilder.build()


		test("Should build a 'Collision' system", () =>
		{
			expect(Collision.Name).toBe("Collision")
		})

		test("Should be getting all entities with the Name component", () =>
		{
			const allName = getQueryBuilder().all(Name).build()
			expect(queryEquals(allName, Collision.Query)).toBe(true)
		})

		test("Should use the provided updateAll function", () =>
		{
			const collision = new Collision(getManager())
			collision.updateOne = updateOne

			collision.updateAll({} as never, 0)

			expect(updateAll.mock.calls).toHaveLength(1)
			expect(updateOne.mock.calls).toHaveLength(0)
		})
	})

})