import { Name, Pos, X } from "../TestComponents"
import { registerSystem } from "@App/Service"

describe("Creating a new system", () =>
{
	/*
		This requires a bit more.
		I think registerSystem needs to take some sort of context object, a name (for debug purposes mainly)
	*/
	const System = registerSystem({
		name: "Test",
		query: builder => builder.any(Name, X).all(Pos),
		update: dt => console.log(dt)
	})

	test("Should be defined", () =>
	{
		expect(System).toBeDefined()
	})
})