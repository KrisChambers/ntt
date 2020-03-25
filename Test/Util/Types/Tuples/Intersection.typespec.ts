import { Intersection } from "@App/Util/Types/List/Intersect"
import { Assert } from "../Expect"

/* eslint-disable @typescript-eslint/no-namespace */
namespace BaseTest
{
	type Actual = Intersection<[1, 2, 3], [1, 2, 4]>
	type Expected = [1, 2]

	const x: Assert<Actual, Expected> = true
}