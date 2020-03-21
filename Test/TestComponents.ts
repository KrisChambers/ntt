import { RegisterComponent } from "@App/RegisterComponent"

/*
	Some components to test with
*/

const PositionComp = RegisterComponent("Position", { x: Number }, { y: Number })

export interface TestPosition extends ReturnType<typeof PositionComp>
{ }

export const TestPosition = (... args: Parameters<typeof PositionComp>) => PositionComp(...args) as TestPosition