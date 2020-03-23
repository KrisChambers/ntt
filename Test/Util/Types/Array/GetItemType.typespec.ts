import { Assert } from "../Expect"
import { EmptyList } from "@App/Util/Types/List/EmptyList"
import { GetItemType } from "@App/Util/Types/List/GetItemType"

const TupleWithMultipleItemTypesIsUnion: Assert<GetItemType<[number, string]>, number | string> = true
const NumberArrayReturnsNumber: Assert<GetItemType<number[]>, number> = true
const EmptyListReturnsUnknown: Assert<GetItemType<EmptyList>, unknown> = true