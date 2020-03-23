import { IfArray } from "@App/Util/Types/Check/IfArray"
import { Assert } from "../Expect"
import { EmptyList } from "@App/Util/Types/List/EmptyList"

const NumberArrayIsAnArray: Assert<IfArray<number[]>> = true
const NumberTupleIsNotAnArray: Assert<IfArray<[1, 2, 3]>> = false
const SpreadTupleIsArray: Assert<IfArray<[string, ... number[]]>> = true
const EmptyListIsNotArray: Assert<IfArray<EmptyList>> = false
const SingletonIsNotArray: Assert<IfArray<[1]>> = false
