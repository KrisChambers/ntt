# NTT

NTT is a simple entity component system. The original objective was to use an ECS to explore some typing ideas in typescript.


## Typing

The typing in this project is built to try and reflect as much information known at that time as we can.

To that end, there is a library developed under Util/Types to build complex types from tuples.

It is important to note that while this works. It is not recommended by the typescript team. We are forcing the typechecker
to perform some recursive computations which can stress it out.

So why would I do this? Well the core idea for an entity component system is to separate logic out into small chunks. So there should be many systems using a small number of component types. So any recurssion the type system has to do should be
decently restrained if this basic principle is followed.

But it is important to keep in mind that you can certainly cause some problems.

## What benefit?

If there is benefits to this is entirely up to the user. This started out as an interesting way to play with the power of typescript's type system, which is pretty fun and interesting.

One thing I wanted to play with some sort of locality within code. Instead of being handed a general collection `List<Object>` and then having to check the existence of a bunch of things. I wanted to work the opposite way.

We are given a `MyList<[]>` where the typing information represents more specific information about what we know of the items.

To give an example we will look at Map.

Suppose we have a Set of components:

```ts
const set = new Set<Component>()
```

So we know that Set has components in it, but the type tells us nothing about what components are contained within.

Instead we can represent the possible options using tuples.

For instance consider our own implementation

```ts
class FinSet<T extends Foo[] = []> { ... }

const set = new FinSet()
```

The type parameter in FinSet defaults to the empty list, [].

The idea is that for some item of FinSet it is of some type in T.

Now if we do something like:

```ts
const x = set.insert(bar)
```

Where bar is of type `Bar`, a subtype of `Foo`, then x will be typed as `FinSet<[Bar]>`

So while working with collection within some unit of code (class, block, function) we can maintain some information about what we have done to the type.

This kind of idea is what is being used here to type almost everything.

## Working with Entities

The typing of the system is progressive and currently represents the "worst case"

An IEntity<\T> is similar to a Map except we are coercing the type of `this`.

For example:

```typescript
const ntt = universe.entities.create()
    .with(Position, 10, 10)
    .with(Velocity, 10, 10)
    .build()
```

`ntt` in this example is of type `IEntity<[Position, Velocity]>`. But suppose for a moment we do not know it is only created
with a Position and Velocity component.

We can further do a check:

```typescript
if (ntt.has(Color))
{

}
```
If we look at the implementation of has we see that if it is a type gate that tells us ntt is of type `IEntity<[Position, Velocity, Color]>` if it has a Color component.

So we can do something like:

```ts
const color = ntt.get(Color).value
```

without checking for null / undefined values or using null coalecing.

This allows us to always ensure that doing any check then ensures that the element will be returned by get (if the check passes).
