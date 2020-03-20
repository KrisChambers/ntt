import { getManager } from "Entity"
import { RegisterComponent } from "./RegisterComponent"

const Name = RegisterComponent("Name", { text: String })
const Age = RegisterComponent("Age", { value: Number })

const x = getManager()

const kris = x.create()
	.with(Name, { text: "Kris" })
	.with(Age, { value: 33 })
	.build()

const obj = x.create()
	.with(Name, { text: "Box" })

