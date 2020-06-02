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

### How it works.

Consider the chunk of code below, rewritten using our entity system.

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

const u = new Universe()

const e = u.entity.create()
    .with(Foo, "foo")
    .with(Bar, "bar")
    .build()

if (m.has("foo"))
{
    const foo = m.get("one")

    foo.name = "foo"
}
```

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


