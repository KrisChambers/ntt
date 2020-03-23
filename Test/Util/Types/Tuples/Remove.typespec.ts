import { Assert } from "../Expect"
import { Remove } from "@App/Util/Types/List/Remove"

const ShouldRemoveAllInstancesOf1: Assert<Remove<1, [1, 2, 1, 3]>, [2, 3]> = true
const ShouldRemoveAllOccurancesOfNever: Assert<Remove<never, [1, never, 2, never, 3]>, [1, 2, 3]> = true
