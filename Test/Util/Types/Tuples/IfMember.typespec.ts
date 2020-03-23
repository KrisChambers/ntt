import { Assert } from "../Expect"
import { IfMember } from "@App/Util/Types/List/IfMember"

type Tuple = [1, "boop", { name: string, }]

const OneIsAMember: Assert<IfMember<1, Tuple>> = true
const BoopIsAMember: Assert<IfMember<"boop", Tuple>> = true
const ObjIsAMember: Assert<IfMember<{ name: string,}, Tuple>> = true
const TwoIsNotAMember: Assert<IfMember<2, Tuple>> = false
const NumberIsNotAMember: Assert<IfMember<number, Tuple>> = false
const StringIsNotAMember: Assert<IfMember<string, Tuple>> = false