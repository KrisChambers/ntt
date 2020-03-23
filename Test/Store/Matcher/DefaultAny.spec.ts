import { Default } from "@App/Store/Matcher"
import { NaiveEntity } from "@App/Entity/NaiveEntity"
import { Name, Pos, X } from "../../TestComponents"

describe("Default Any matcher test", () =>
{
	const entity = new NaiveEntity(1)

	entity.add(Name, "boop")
	entity.add(Pos, 10, 10)

	test("Should pass for Any = [Name] and Any = [Pos]", () =>
	{
		expect(Default.Any(entity, Name)).toBe(true)
		expect(Default.Any(entity, Pos)).toBe(true)
	})

	test("Should pass for Any = [Name, Pos]", () =>
		expect(Default.Any(entity, Name, Pos)).toBe(true)
	)

	test("Should pass for Any = [Name, X]", () =>
		expect(Default.Any(entity, Name, X)).toBe(true)
	)

	test("Should pass for Any = []", () =>
	{
		expect(Default.Any(entity)).toBe(true)
	})

	test("Should fail for Any = [X]", () =>
	{
		expect(Default.Any(entity, X)).toBe(false)
	})
})