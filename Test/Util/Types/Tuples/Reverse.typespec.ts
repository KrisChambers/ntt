import { Reverse } from "@App/Util/Types/List/Reverse"
import { Assert } from "../Expect"
import { EmptyList } from "@App/Util/Types/List/EmptyList"

const ReverseOfEmptyListIsEmptyList: Assert<Reverse<EmptyList>, EmptyList> = true
const ReverseOfSingleTonIsIdentity: Assert<Reverse<[1]>, [1]> = true
const ReverseOfArrayIsArray: Assert<Reverse<number[]>, number[]> = true

// Need to be able to detect spread somehow..
const ReverseTupleWithArrayGivesUnionTypes: Assert<Reverse<[string, ... number[]]>, (string | number)[]> = true
const ReverseCheck1: Assert<Reverse<[1, 2, 3]>, [3, 2, 1]> = true
const ReverseCheck2: Assert<Reverse<[1, "a", 3]>, [3, "a", 1]> = true
const ReverseCheck3: Assert<Reverse<[{ name: string, }, "a", 3]>, [3, "a", {name: string, }]> = true

type x = Reverse<[string, ... number[]]>
type y = Reverse<number[]>
