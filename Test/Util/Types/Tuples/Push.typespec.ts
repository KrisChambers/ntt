import { Assert } from "../Expect"
import { Push } from "@App/Util/Types/List/Push"
import { EmptyList } from "@App/Util/Types/List/EmptyList"

const PushingToEmptyCreatesSingleton: Assert<Push<EmptyList, 1>, [1]> = true
const PushingToArrayIsAnArray: Assert<Push<number[], 1>, number[]> = true
const PushingToArrayWithDifferentItemTypeCreatesUnions: Assert<Push<number[], "foo">, (number | "foo")[]> = true

type X = Push<[2], 1>
