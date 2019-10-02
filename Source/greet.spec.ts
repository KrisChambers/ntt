import { greet } from "@App/greet"

describe("Are we greeting?", () =>
{
	test("Should greet properly", () =>
	{
		expect(greet("Kris")).toBe("Hello Kris!")
	})
})
