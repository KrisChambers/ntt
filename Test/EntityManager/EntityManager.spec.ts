import { EntityManager } from "@App/EntityManager/EntityManager"
import { NaiveStore } from "@App/Store/NaiveStore"

describe("EntityManager tests", () =>
{
	const mgr = new EntityManager(new NaiveStore())

	test("Should be defined", () =>
	{
		expect(mgr).toBeDefined()
	})
})