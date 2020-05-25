# Recursive types.

This is the meat of what we are trying out. At some point this should be put into it's own repo.

The main idea here is to utilize tuples to be able to tell us exactly what is in a collection.

### Check

Check contains a lot of types which primarily deal with checking equality / containment / subtyping / unknown / null / etc.

### List

List contains types for dealing with tuples.

### Numbers

The Numbers module contains an implementation of Num. A type level Natural Number type.

This is essentially a wrapper around the literal types which we construct by building tuples of various sizes and using their length property.

So for instance: `[]` is Zero `[[]]` is One, `[[], []]` is Two and so on. ToNumber generates a literal type by takign the type of the `length` property. And ToNum constructs a Num from a literal Number by recursively adding `[]` to the empty list.

### Testing

There is no predetermined way of testing how type inferencing is working.

The aim would be to have something that provides some sort of feedback on what is failing.

Unfortunately I have not come accross any error messages. For VSCode the problems tab gives us a bit of information. But the main piece is what file it is in. So for the time being trying to keep the number of tests in a file makes it pretty easy to see what is going on.

The easiest way to write a test is using the following syntax.

```ts
const <VariableName>: Assert<ActualType, ExpectedType> = (true | false)
```

Generally the variable name would give some sort of description of what the test should be expecting.

I have found that `VariableName` can get pretty long in some instances. So for better readability we could try something like.

```ts
namespace Test.Description
{
    type Actual = TypeToTest<T, ...>
    type Expected = ExpectedType

    const x: Assert<Actual, Expected> = true
}
```

Since namespaces allow the `.` delimiter it should be a bit more readable.

For example:

```ts
namespace Intersection.Only.Contains.One.And.Two
{
    type Actual = Intersection<[1, 2, 3], [1, 2, 4]>
    type Expect = [1, 2]

    const x: Assert<Actual, Expected> = true
}
```

This could easily be automated with a snippet, feels a bit more self contained since you can have many namespaces.

We could also try to find a way to use ambient modules to write a better description. But due to importing the types we cannot right now. But it would be something worth looking into.