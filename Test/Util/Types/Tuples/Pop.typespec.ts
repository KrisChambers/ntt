import { Assert } from "../Expect"
import { Pop } from "@App/Util/Types/List/Pop"
import { EmptyList } from "@App/Util/Types/List/EmptyList"

const PoppingEmptyListReturnsNever: Assert<Pop<EmptyList>, [[], never]> = true
const PoppingSingleton: Assert<Pop<[1]>, [[], 1]> = true