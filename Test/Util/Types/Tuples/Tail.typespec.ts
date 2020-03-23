import { Assert } from "../Expect"
import { Tail } from "@App/Util/Types/List/Tail"
import { EmptyList } from "@App/Util/Types/List/EmptyList"

const TailOfArrayIsAnArray: Assert<Tail<number[]>, number[]> = true
const TailOfSingletonIsEmpty: Assert<Tail<[1]>, EmptyList> = true
const TailOfEmptyListIsEmptYList: Assert<Tail<EmptyList>, EmptyList> = true