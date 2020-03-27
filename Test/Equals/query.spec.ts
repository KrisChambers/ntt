import { getQueryBuilder } from "@App/index"
import { queryEquals } from "@App/Equals/query"
import { IQuery, IQueryBuilder, Component } from "@App/Types"
import { Name, Y, X, Pos, Shape } from "../TestComponents"

const selfEqual = (query: IQuery) =>
{

	test("Should be equal to it's self", () =>
	{
		expect(queryEquals(query, query)).toBe(true)
	})
}

const producedTheSame = (query: IQuery, buildFn: (qb: IQueryBuilder) => IQueryBuilder) =>
{
	test("Should be equal to a query built in the same way", () =>
	{
		const q2 = buildFn(getQueryBuilder()).build()

		expect(queryEquals(query, q2)).toBe(true)
	})
}

const notEqualWhenAddingComponent = (buildFn: (qb: IQueryBuilder) => IQueryBuilder) =>
{
	class UnEqualizer implements Component
	{}

	test("Should be unequal when there is an additional component in All", () =>
	{
		const baseBuilder = buildFn(getQueryBuilder())
		const baseQuery = baseBuilder.build()
		const q1 = baseBuilder.all(... [UnEqualizer, ... baseQuery.All ?? []]).build()

		expect(queryEquals(baseQuery, q1)).toBe(false)
	})

	test("Should be unequal when there is an additional component in Any", () =>
	{
		const baseBuilder = buildFn(getQueryBuilder())
		const baseQuery = baseBuilder.build()
		const q1 = baseBuilder.any(...[UnEqualizer, ...baseQuery.Any ?? []]).build()

		expect(queryEquals(baseQuery, q1)).toBe(false)
	})

	test("Should be unequal when there is an additional component in None", () =>
	{
		const baseBuilder = buildFn(getQueryBuilder())
		const baseQuery = baseBuilder.build()
		const q1 = baseBuilder.none(...[UnEqualizer, ...baseQuery.None ?? []]).build()

		expect(queryEquals(baseQuery, q1)).toBe(false)
	})
}

const notEqualWhenRemovingAComponent = (buildFn: (builder: IQueryBuilder) => IQueryBuilder) =>
{
	const baseBuilder = buildFn(getQueryBuilder())
	const baseQuery = baseBuilder.build()
	const { All, Any, None} = baseQuery

	if (All != null && All.length > 0)
	{
		test("Should be unequal when there is a component removed from All", () =>
		{
			const q1 = baseBuilder.all(... All.slice(1)).build()

			expect(queryEquals(baseQuery, q1)).toBe(false)
		})
	}

	if (Any != null && Any.length > 0)
	{
		test("Should be unequal when there is a component removed from Any", () =>
		{
			const q1 = baseBuilder.any(... Any.slice(1)).build()

			expect(queryEquals(baseQuery, q1)).toBe(false)
		})
	}

	if (None != null && None.length > 0)
	{
		test("Should be unequal when there is a component removed from None", () =>
		{
			const q1 = baseBuilder.none(... None.slice(1)).build()

			expect(queryEquals(baseQuery, q1)).toBe(false)
		})
	}
}

describe("Testing IQuery equality check", () =>
{
	describe("Empty queries", () =>
	{
		const buildFn = (builder: IQueryBuilder = getQueryBuilder()) => builder.all().any().none()
		const empty = buildFn().build()

		selfEqual(empty)

		producedTheSame(empty, buildFn)

		notEqualWhenAddingComponent(buildFn)
	})

	describe("Only All", () =>
	{
		const buildFn = (builder: IQueryBuilder = getQueryBuilder()) => builder.all(Name)
		const q1 = buildFn().build()

		selfEqual(q1)

		producedTheSame(q1, buildFn)

		notEqualWhenAddingComponent(buildFn)

		notEqualWhenRemovingAComponent(buildFn)
	})

	describe("Only Any", () =>
	{
		const buildFn = (builder: IQueryBuilder = getQueryBuilder()) => builder.any(Name)
		const q1 = buildFn().build()

		selfEqual(q1)

		producedTheSame(q1, buildFn)

		notEqualWhenAddingComponent(buildFn)

		notEqualWhenRemovingAComponent(buildFn)
	})

	describe("Only None", () =>
	{
		const buildFn = (builder: IQueryBuilder = getQueryBuilder()) => builder.none(Name)
		const q1 = buildFn().build()

		selfEqual(q1)

		producedTheSame(q1, buildFn)

		notEqualWhenAddingComponent(buildFn)

		notEqualWhenRemovingAComponent(buildFn)
	})

	describe("Complex query", () =>
	{
		const buildFn = (builder: IQueryBuilder = getQueryBuilder()) => builder.all(X, Y).any(Pos, Name).none(Shape)
		const q1 = buildFn().build()

		selfEqual(q1)

		producedTheSame(q1, buildFn)

		notEqualWhenAddingComponent(buildFn)

		notEqualWhenRemovingAComponent(buildFn)
	})
})