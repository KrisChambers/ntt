import { Assert } from "../Expect"
import { IfNotExtends } from "@App/Util/Types/Check/IfNotExtends"

const ZeroIsNotASubTypeOfString: Assert<IfNotExtends<0, string>> = true	// should return true
const ZeroIsASubTypeOfNumber: IfNotExtends<0, number> = false	// should return false
