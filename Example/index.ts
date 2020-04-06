import { Component } from "@App/Types"
import { Universe } from "@App/UniverseBuilder"

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


// This is the universe of entities and systems.
const universe = new Universe()


universe.systems
	/**
	 * System that writes out an entities text value.
	 */
	.create(builder =>
		builder
			.setName("Writing")
			.query(qb => qb.all(Text))
			.addUpdateOne(({ entity }) => console.log(entity.get(Text).value))
	)

	/**
	 * A system that increments an entity's numerical value.
	 */
	.create(builder =>
		builder
			.setName("Increment")
			.query(qb => qb.all(Num))
			.addUpdateOne(({ entity }) =>
			{
				const before = entity.get(Num).value

				entity.get(Num).value += 1
				console.log(`Before: ${before}; After: ${entity.get(Num).value}`)
			})
	)
	/**
	 * Prints the text and num of an entity.
	 */
	.create(builder =>
		builder
			.setName("PrintSystem")
			.query(qb => qb.all(Num, Text))
			.addUpdateOne(({entity}) => console.log(`Text: ${entity.get(Text).value}, Num: ${entity.get(Num).value}`))
	)

/*
	Using our manager we can create entities.

	The EntityBuilder is setup to create the components and store them on the entities.

	So you do not need to create a bunch of components then pass them to the manager

	Instead you:
		create (an entity)
		with (componentName) (component data defined in the constructor)

		Then call build() and the entity gets inserted into the store, and returned.

*/

universe.entity.create()
	.with(Text, "Hello")
	.with(Num, 1)
	.build()

universe.entity.create()
	.with(Text, ", ")
	.with(Num, 10)
	.build()

const e = universe.entity.create()
	.with(Text, "World!")
	.build()

// After using the universe.entity, you can add components to the entity.
e.add(Num, 100)

universe.entity.create()
	.with(Text, "Only Text")
	.build()

universe.entity.create()
	.with(Num, 9999)
	.build()

// initialize the universe with the above configuration.
universe.init()


// This runs all the systems we need to run.
// The first and second systems to run should run through 4 entities. (4 entities with Text, 4 with Num)
// The third to run will only print out 3 since it requires both Text and Num components.
universe.update(0)

