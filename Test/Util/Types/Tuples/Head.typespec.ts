import { EmptyList } from "@App/Util/Types/List/EmptyList"
import { Head } from "@App/Util/Types/List/Head"
import { Assert } from "../Expect"

const HeadOfArrayTypeIsTheTypeOfElement: Assert<Head<number[]>, number> = true
const HeadOfSingleton: Assert<Head<[1]>, 1> = true
const HeadOfEmptyListIsNever: Assert<Head<EmptyList>, never> = true