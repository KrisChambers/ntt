import { RegisterComponent } from "@App/RegisterComponent"

describe("Registering and creating components", () =>
{

	describe("Registering and creating a Position component", () =>
	{
		const Position = RegisterComponent("Position",
			{ x: Number },
			{ y: Number }
		)

		test("The name should be 'Position'", () =>
		{
			const pos = Position(0, 0)
			expect(Position.name).toBe("Position")
			expect(pos.constructor.name).toBe("Position")
		})

		test("Should be able to create a new Position with x and y coordinates", () =>
		{
			const pos = Position(0, 0)

			expect(pos.x).toBe(0)
			expect(pos.y).toBe(0)
		})
	})
})