import { getManager } from "../Source"
import { ISystemType, Component } from "../Source/Types"
import { getSystemBuilder } from "@App/SystemBuilder"

// Components implement the IComponent interface
// it is important that the properties of the componenets are set in the constructor.

class Text implements Component
{
	constructor (public value: string)
	{ }
}

class Num implements Component
{
	constructor (public value: number)
	{ }
}


// We create a system that wants to get all components that have text and print it to the screen.

/**
 * Writes text to the screen
 */
const WritingSystem = getSystemBuilder()
	.setName("Writing")
	.query(builder => builder.all(Text))
	.addUpdateOne(({ entity }) =>
	{
		//console.log(entity.has(Text))
		console.log(entity.get(Text).value)
	})
	.build()

/**
 * Increments a number and prints the before and after values.
 */
const IncrementSystem = getSystemBuilder()
	.setName("Increment")
	.query(builder => builder.all(Num))
	.addUpdateOne(({ entity }) =>
	{
		const before = entity.get(Num).value

		entity.get(Num).value += 1
		console.log(`Before: ${before}; After: ${entity.get(Num).value}`)
	})
	.build()

/**
 * Prints the text and num of an entity.
 */
const PrintSystem = getSystemBuilder()
	.setName("PrintSystem")
	.query(builder => builder.all(Num, Text))
	.addUpdateOne(({entity}) => console.log(`Text: ${entity.get(Text).value}, Num: ${entity.get(Num).value}`))
	.build()


const manager = getManager()

const systemTypes: ISystemType[] = [
	WritingSystem,
	IncrementSystem,
	PrintSystem
]


// Create a collection of instantiated systems that all share the same entity manager.
const systems = systemTypes.map(S => new S(manager))


/*
	Using our manager we can create entities.

	The EntityBuilder is setup to create the components and store them on the entities.

	So you do not need to create a bunch of components then pass them to the manager

	Instead you:
		create (an entity)
		with (componentName) (component data defined in the constructor)

		Then call build() and the entity gets inserted into the store, and returned.

*/

manager.create()
	.with(Text, "Hello")
	.with(Num, 1)
	.build()

manager.create()
	.with(Text, ", ")
	.with(Num, 10)
	.build()

const e = manager.create()
	.with(Text, "World!")
	.build()

// After using the manager, you can add components to the entity.
e.add(Num, 100)

manager.create()
	.with(Text, "Only Text")
	.build()

manager.create()
	.with(Num, 9999)
	.build()


// This runs all the systems we need to run.
// The first and second systems to run should run through 4 entities. (4 entities with Text, 4 with Num)
// The third to run will only print out 3 since it requires both Text and Num components.
systems.forEach(s =>
{
	console.log()
	s.update(0)
})

