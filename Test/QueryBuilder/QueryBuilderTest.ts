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

			expect(query.Any).toBeUndefined()
			expect(query.None).toBeUndefined()
			expect(query.All).toBeDefined()
			expect(query.All).toHaveLength(2)
			expect(query.All).toEqual([Name, X])
		})

		test("Should create a query with Any: [Name, X]", () =>
		{
			const query = new QueryBuilder()
				.any(Name, X)
				.build()

			expect(query.All).toBeUndefined()
			expect(query.None).toBeUndefined()
			expect(query.Any).toBeDefined()
			expect(query.Any).toHaveLength(2)
			expect(query.Any).toEqual([Name, X])
		})

		test("Should create a query with None: [Name, X]", () =>
		{
			const query = new QueryBuilder()
				.none(Name, X)
				.build()

			expect(query.All).toBeUndefined()
			expect(query.Any).toBeUndefined()
			expect(query.None).toBeDefined()
			expect(query.None).toHaveLength(2)
			expect(query.None).toEqual([Name, X])
		})

		test("Should create a complex query with All, Any, None filled", () =>
		{
			const query = new QueryBuilder()
				.all(Name)
				.any(X, Y)
				.none(Pos)
				.build()

			expect(query.All).toBeDefined()
			expect(query.Any).toBeDefined()
			expect(query.None).toBeDefined()

			expect(query.All).toEqual([Name])
			expect(query.Any).toEqual([X, Y])
			expect(query.None).toEqual([Pos])
		})
	})
}