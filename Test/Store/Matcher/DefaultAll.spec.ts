import { Default } from "@App/Store/Matcher"
import { NaiveEntity } from "@App/Entity/NaiveEntity"
import { Name, Pos, X } from "../../TestComponents"
import { IEntity } from "@App/Types/IEntity"

describe("Default All matcher test", () =>
{
	const entity: IEntity = new NaiveEntity(1)

	entity.add(Name, "boop")
	entity.add(Pos, 10, 10)

	test("Should pass for All = [Name] and All = [Pos]", () =>
	{
		expect(Default.All(entity, Name)).toBe(true)
		expect(Default.All(entity, Pos)).toBe(true)
	})

	test("Should pass for All = [Name, Pos]", () =>
		expect(Default.All(entity, Name, Pos)).toBe(true)
	)

	test("Should fail for All = [Name, X]", () =>
		expect(Default.All(entity, Name, X)).toBe(false)
	)
})