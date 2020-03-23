/* eslint-disable @typescript-eslint/no-unused-vars */
import { Assert } from "../Expect"
import { IfExtends } from "@App/Util/Types/Check/IfExtends"

const TrueExtendsTrue: Assert<IfExtends<true, true>> = true

class Foo
{ }
class Bar extends Foo
{ }

const BarExtendsFoo: Assert<IfExtends<Bar, Foo>> = true
const FooNotExtendsBar: Assert<IfExtends<Bar, Foo>, false> = false
