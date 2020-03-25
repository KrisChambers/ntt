import { Assert } from "../Expect"
import { Take } from "@App/Util/Types/List/Take"

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Test1
{
	type Actual = Take<2, [1, 2, 3]>
	type Expected = [1, 2]

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const x: Assert<Actual, Expected> = true
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Test2
{
	type Actual = Take<2, []>
	type Expected = never

	const x: Assert<Actual, Expected> = true
}