import { Assert } from "../Expect"
import { Concat } from "@App/Util/Types/List/Concat"
import { EmptyList } from "@App/Util/Types/List/EmptyList"

const ConcatWithEmptyListIdentity: Assert<Concat<EmptyList, [1]>, [1]> = true
const ConcatTwoEmptyListsIsEmptyList: Assert<Concat<EmptyList, EmptyList>, EmptyList> = true

const a: Assert<Concat<[1], [2]>, [1, 2]> = true
const b: Assert<Concat<[number, string], [1]>, [number, string, 1]> = true