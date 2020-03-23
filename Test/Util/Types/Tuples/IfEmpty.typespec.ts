import { Assert } from "../Expect"
import { EmptyList } from "@App/Util/Types/List/EmptyList"
import { IfEmpty } from "@App/Util/Types/List/IfEmpty"

const EmptyListIsEmpty: Assert<IfEmpty<EmptyList>> = true
const SingletonIsNotEmpty: Assert<IfEmpty<[number]>> = false