import { Assert } from "../Expect"
import { Last } from "@App/Util/Types/List/Last"
import { EmptyList } from "@App/Util/Types/List/EmptyList"
import { Head } from "@App/Util/Types/List/Head"

const LastOfEmptyListIsNever: Assert<Last<EmptyList>, never> = true
const LastOfSingletonIsHead: Assert<Last<[1]>, Head<[1]>> = true

const a: Assert<Last<[1, 2, 3]>, 3> = true