import { Default } from "@App/Store/Matcher"
import { NaiveEntity } from "@App/Entity/NaiveEntity"
import { Name, Pos, X } from "../../TestComponents"

describe("Default None matcher test", () =>
{
	const entity = new NaiveEntity(1)

	entity.add(Name, "boop")
	entity.add(Pos, 10, 10)

	test("Should fail for None = [Name] and None = [Pos]", () =>
	{
		expect(Default.None(entity, Name)).toBe(false)
		expect(Default.None(entity, Pos)).toBe(false)
	})

	test("Should faile for None = [Name, Pos]", () =>
		expect(Default.None(entity, Name, Pos)).toBe(false)
	)

	test("Should fail for None = [Name, X]", () =>
		expect(Default.None(entity, Name, X)).toBe(false)
	)

	test("Should pass for None = []", () =>
	{
		expect(Default.None(entity)).toBe(true)
	})

	test("Should pass for None = [X]", () =>
	{
		expect(Default.None(entity, X)).toBe(true)
	})

	test("Should pass for None = [X]", () =>
	{
		expect(Default.None(entity, X)).toBe(true)
	})
})