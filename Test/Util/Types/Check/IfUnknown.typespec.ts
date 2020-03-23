import { Assert } from "../Expect"
import { IfUnknown } from "@App/Util/Types/Check/IfUnknown"

const UnknownIsUnknown: Assert<IfUnknown<unknown>> = true
const NullIsNotUnknown: Assert<IfUnknown<null>> = false
const objectIsNotUnknown: Assert<IfUnknown<object>> = false