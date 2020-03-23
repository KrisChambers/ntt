import { Assert } from "../Expect"
import { IfEqual } from "@App/Util/Types/Check/IfEqual"

const OneIsEqualToOne: Assert<IfEqual<1, 1>> = true
const OneNotEqualTwo: Assert<IfEqual<1, 2>> = false
const StringNotEqualNumber: Assert<IfEqual<string, number>> = false
const NeverIsEqualNever: Assert<IfEqual<never, never>> = true
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnyIsNotNever: Assert<IfEqual<never, any>> = false


