//type IfNullTest_True = IfNull<null, true, false>
//type IfNullTest_False = IfNull<1, true, false>

import { Assert } from "../Expect"
import { IfNull } from "@App/Util/Types/Check/IfNull"

const NullIsNull: Assert<IfNull<null>> = true
const UnknownIsNotNull: Assert<IfNull<unknown>> = false
const UndefinedIsNotNull: Assert<IfNull<undefined>> = false
const ObjectIsNotNull: Assert<IfNull<object>> = false
