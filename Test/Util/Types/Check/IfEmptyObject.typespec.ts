import { Assert } from "../Expect"
import { IfEmptyObject } from "@App/Util/Types/Check/IfEmptyObject"

const LiteralEmptyIsEmpty: Assert<IfEmptyObject<{}>> = true
const NumberIsNotAnEmptyObject: Assert<IfEmptyObject<number>> = false

const obj = new Object()
const TypeOfNewObjectIsEmpty: Assert<IfEmptyObject<typeof obj>> = true

class Bar
{
	id = 0
}

const UserDefinedClassIsNotObject: Assert<IfEmptyObject<Bar>> = false