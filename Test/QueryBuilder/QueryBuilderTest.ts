import { IQueryBuilderConstructor } from "@App/Types"
import { Name, X, Y, Pos } from "../TestComponents"

/**
 * Basic tests for query builders.
 *
 * @param QueryBuilder The constructor for an IQueryBuilder
 */
export function Test (QueryBuilder: IQueryBuilderConstructor)
{
	describe(`${QueryBuilder.name} tests`, () =>
	{
		test("Should create a query with All: [Name, X]", () =>
		{
			const builder = new QueryBuilder()

			const query = builder.all(Name, X).build()

			expect(query.any).toBe([])
			expect(query.none).toBe([])
			expect(query.all).toBeDefined()
			expect(query.all).toHaveLength(2)
			expect(query.all).toEqual([Name, X])
		})

		test("Should create a query with Any: [Name, X]", () =>
		{
			const query = new QueryBuilder()
				.any(Name, X)
				.build()

			expect(query.all).toBe([])
			expect(query.none).toBe([])
			expect(query.any).toBeDefined()
			expect(query.any).toHaveLength(2)
			expect(query.any).toEqual([Name, X])
		})

		test("Should create a query with None: [Name, X]", () =>
		{
			const query = new QueryBuilder()
				.none(Name, X)
				.build()

			expect(query.all).toBe([])
			expect(query.any).toBe([])
			expect(query.none).toBeDefined()
			expect(query.none).toHaveLength(2)
			expect(query.none).toEqual([Name, X])
		})

		test("Should create a complex query with All, Any, None filled", () =>
		{
			const query = new QueryBuilder()
				.all(Name)
				.any(X, Y)
				.none(Pos)
				.build()

			expect(query.all).toBeDefined()
			expect(query.any).toBeDefined()
			expect(query.none).toBeDefined()

			expect(query.all).toEqual([Name])
			expect(query.any).toEqual([X, Y])
			expect(query.none).toEqual([Pos])
		})
	})
}