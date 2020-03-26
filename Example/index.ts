import { getQueryBuilder, getManager } from "../Source"
import { ISystemType, ISystem, IEntityManager, Component } from "../Source/Types"

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const WritingSystem: ISystemType = class WritingSystem implements ISystem
{
	// An Entitymanager gets injected via the constructor.
	constructor (private manager: IEntityManager)
	{ }

	// Since we are defining WritingSystem as a const of type ISystem, the static properties are type checked.
	// So you need to define the query upfront
	public static readonly query = getQueryBuilder()
		.all(Text)
		.build()

	// A local system will have a way of getting the query
	get query ()
	{
		// We need to name the class twice (WritingSystem: ISystemType = class WritingSystem ...) so we can access the
		// typed version of the property.
		return WritingSystem.query
	}

	update ()
	{
		// This is the main piece of non-boilerplate code.
		const entities = this.manager.query(this.query)

		entities.forEach(entity => console.log(entity.get(Text).value))
	}
}

const IncrementSystem: ISystemType = class IncrementSystem implements ISystem
{
	public static readonly query = getQueryBuilder()
		.all(Num)
		.build()

	constructor (private manager: IEntityManager)
	{ }

	get query ()
	{
		return IncrementSystem.query
	}

	update ()
	{
		const entities = this.manager.query(this.query)

		entities.forEach(entity =>
		{
			const before = entity.get(Num).value

			entity.get(Num).value += 1

			console.log(`Before: ${before}; After: ${entity.get(Num).value}`)
		})
	}
}

const PrintSystem: ISystemType = class PrintSystem implements ISystem
{
	public static readonly query = getQueryBuilder()
		.all(Num, Text)
		.build()

	constructor (private manager: IEntityManager)
	{ }

	get query ()
	{
		return PrintSystem.query
	}

	update ()
	{
		const entities = this.manager.query(this.query)

		entities.forEach(entity => console.log(`Text: ${entity.get(Text).value}, Num: ${entity.get(Num).value}`))
	}
}

const manager = getManager()

// We can define what are systems are like
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
	s.update()
})

