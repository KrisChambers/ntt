import { Assert } from "../Expect"
import { Cons } from "@App/Util/Types/List/Cons"
import { EmptyList } from "@App/Util/Types/List/EmptyList"

const ConsOnEmptyListGivesSingleton: Assert<Cons<EmptyList, 1>, [1]> = true
const ConsOnArrayMaintainsTypeAdded: Assert<Cons<number[], 1>, [1, ... number[]]> = true
