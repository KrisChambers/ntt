## Ntt - Entity Component System

This is an entity component system to test some typing ideas and learn more about the ECS pattern.

## Basics

An entity is simply an id corresponding to a collection of data objects called components. Each type of component has a unique key. We don't always want to iterate over the entire collection of components, but we want it to be fast. So we can think of Entity as a subtype of `Map<Key, Object>`.

Generally we want to be able to ask the entity a couple things.

1. Do you have a particular component?
1. Give me the component corresponding to it's key.

## Assumptions

1. An Entity can have only 1 type of component. Ex: Position, Color, etc.

## Observation

Consider the following code:

```ts
class Foo { name: string }
class Bar { age: number }
const m = new Map<string, object>();

m.add("foo", new Foo())
m.add("bar", new Bar())

if (m.has("foo"))
{
    const foo = m.get("one")

    foo.name = "foo"
}
```

If you put the above code into a ts file it should give you a type error for the statement `foo.name = "foo"`. Namely, "it is possible that foo might be undefined".

Assuming this function is running in complete isolation and nothing is going to change between the `has` and `get` calls, the variable `foo` should be able to be typed since we know the key "foo" exists in m, and the possible types that can be associated with the key does not include unknown.

## Components

In this implementation, instances of Components are still dumb objects (POJO). This is desirable in ECS for serializability purposes. In addition we are also using the component type as a key.

So instead of having to write something like:

```ts
entity.get(Text.key)
```

We can just write

```ts
entity.get(Text)
```

Under the hood, this is simply using the name property of the constructor for the key. Ideally, this would be a default, not required. But that wasn't a concern right now.

### What we are aiming for.

Consider the chunk of code below. It is similar to above, but written to utilize the ideas in Ntt.

```ts
import { Component, Universe } from "ntt"

class Foo implements Component
{
    constructor(public name: string) {}
}
class Bar implements Component
{
    constructor(public age: number) {}
}
class Position implements Component
{
    constructor (public x: number, public y: number) { }
}

const u = new Universe()

const e = u.entity.create()
    .with(Foo, "foo")
    .with(Bar, "bar")
    .build()
```
In the above code `e` contains an entity with two components `Foo` and `Bar`.

Now we define some system:

```ts
universe.systems
    /**
     * A System for inspecting an entity
     */
    .create(builder =>
    builder
        .setName("Inspect")
        .query(qb => qb.all(Foo))
        .addUpdateOne(({ entity }) =>
        {
            const foo = entity.get(Foo)

            console.log(`Foo thing: ${foo.name}`)

            if (foo.has(Pos))
            {
                const pos = entity.get(Pos)
                console.log(`Foo is at pos: (${pos.x}, ${pos.y})`)
            }
        })
    )
```

The main goal of this project is to look at a way to use conditional types and recursive types so this types appropriately.

We expect the check for the `Pos` component to allow us to disregard checks for undefined / null if it returns true.

## Future work and notes.

### Recursive type depth problem.

Currently the above goals are not met for a few reasons.

1. There is no support for arbitrary generic parameters similar to how functions have a `... params: any[]` format (this could make the whole list / tuple stuff unnecessary).
2. The type `[Foo]` and `[Foo, Bar]` do not have an "is assignable to" relation.
3. To fix 2 we can include the rest type parameter `... Component[]` in the tuple. This is the next avenue to explore a bit more. The issue comes from the covariance of the `IEntity<T>` generic parameter and how type guards work. Instead of a simple casting of `this` it is narrowing the type. Ex: If the type of `this` is `IEntity<[Foo]>` then `this is IEntity<Cons<Bar, T>>` gives us the type `IEntity<[Bar, Foo]> & IEntity<[Foo]>`. Hence we need to be careful to make sure that we are creating a subtype.
4. Our attempt at fixing 3 was to try and create a new recursive type called `Has` which would insert the new type into the type list. The type on it's own worked but using it in conjunction with `IEntity` was causing the typical "type instantiation is excessively deep" problems.
5. We will look at refactoring the IEntity stuff so we can better see where exactly these problems are popping up. In particular I am thinking the problem comes from all the recursive types being created when we are using `IEntity<Has<...>>`. So disconnecting these operations (specifically the `has` and `get`) will allow us to try and create a more manageable test case.


### **Queries**

There are some issues regarding the types for queries. If you do not use a query builder and just put a plain object into the EntityManager.query function the typing does not work out. So this should ideally provide a QueryBuilder instance to use.

A query has 3 possible parts to it. All, Any, or None.

1. All: All of the components must be present.
2. Any: At least one of the components must be present.
3. None: None of the components should be present.

So for instance if we have a query that looks like `{ all: [A], any: [B, C], none: [D]}` this will return all entities that have component A and not D, and B or C.

This could be turned into some sort of predicate A & ~D & (B | C). So perhaps there is a way to specify this in the type parameters of IEntity. So we would end up with a type of the form `IEntity<[A, B] | [A, C]>`, make it so the query `{ all: [A], none: [A]}` produces `never`, etc.

We should be able to do this.

### **Naming**

Not entirely satisfied with some of the naming of the types. So this should be rethought a little.


