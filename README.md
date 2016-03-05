<h1 align="center">
  <img width="400" src="https://raw.githubusercontent.com/gakimball/ocha/master/assets/logo.svg" alt="Ocha">
</h1>

A BDD-style assertion library for Sass. Eventually it will maybe work with [True](https://github.com/oddbird/true).

## Installation

It's not on npm yet!

## Usage

Use the `expect()` mixin to write an assertion. Pass a value to check, and then a series of language functions. Most assertions also require a final value to compare with.

```scss
@import 'ocha';

$value: 5
@require expect($value to equal 5);
```

## API

### Language Chains

These functions don't do anything&mdash;they just make your assertion more readable.

- `to`
- `be`
- `been`
- `is`
- `which`
- `and`
- `has`
- `have`
- `with`
- `at`
- `of`
- `same`

### Flags

#### not

Throw the word `not` in an assertion to check for the opposite result.

Note that, since `not` is a special keyword in Sass, you have to put it in quotes.

```scss
@include expect(5 to 'not' equal 6);
```

#### deep

Pair with `equal` or `property` to fully check the contents of a map.

```scss
$map: (
  cats: ( dogs: true ),
  kittens: false,
);

@include expect($map to have deep property 'cats.dogs');

@include expect($map to deep equal $map);
```

### Comparison

#### equal($value)

Check if a value equals `$value`.

```scss
@include expect(5 to equal 5);
@include expect('string' to equal 'string');
```

Add the `deep` flag to check if the contents of an entire map are identical.

```scss
$map: (
  cats: ( dogs: true ),
  kittens: false,
);

@include expect($map to deep equal $map);
```

#### eql($map)

Check if two maps are identical in structure. This is the same as `deep equal`.

```scss
$map: (
  cats: ( dogs: true ),
  kittens: false,
);

@include expect($map to eql $map);
```

#### above($floor)

Check if a value is *greater than* `$floor`.

```scss
@include expect(5 to be above 3);
```

#### least($floor)

Check if a value is *greater than or equal to* `$floor`.

```scss
@include expect(5 to be at least 5);
@include expect(10 to be at least 5);
```

#### below($floor)

Check if a value is *less than* `$floor`.

```scss
@include expect(5 to be below 3);
```

#### most($floor)

Check if a value is *less than or equal to* `$floor`.

```scss
@include expect(5 to be at most 5);
@include expect(10 to be at most 5);
```

#### within($floor, $ceiling)

Check if a value is within the range of `$floor` and `$ceiling` (including those values).

```scss
@include expect(5 to be within (0, 10));
```

#### closeTo($base, $range)

Check if a value is equal to `$base`, plus or minus `$range`.

```scss
// Can be between 2 and 8
@include expect(7 to be closeTo (5, 3));
```

#### oneOf($list)

Check if a value is one of the items in `$list`.

```scss
@include expect(1 to be oneOf (1, 2, 3));
@include expect(5 to be oneOf (1, 2, 3));
```

### Type Comparison

#### a($type)

Check if a value has the type of `$type`.

```scss
@include expect(5 to be a number);
@include expect('string' to be a string);
@include expect(#fff to be a color);
@include expect((0, 1, 2) to be a list);
```

#### ok

Check if a value is truthy:

- `true`
- A list or map that isn't empty
- A number greater than 0

```scss
@include expect(true to be ok);
```

#### true

Check if a value is `true`. Note that this function has to be used with quotes around it, because it's a special keyword in Sass.

```scss
@include expect(true to be 'true');
```

#### false

Check if a value is `false`. Note that this function has to be used with quotes around it, because it's a special keyword in Sass.

```scss
@include expect(false to be 'false');
```

#### null

Check if a value is `null`. Note that this function has to be used with quotes around it, because it's a special keyword in Sass.

```scss
@include expect(null to be 'null');
```

### Inspection

#### lengthOf($length)

Check if a list has a length equal to `$length`.

```scss
$list: (0, 1, 2);
@include expect($list to have lengthOf 3);
```

#### length

Check if a list has a length that satisfies a certain criteria. Pair it with `above`, `least`, `below`, `most`, or `within`.

```scss
$list: (0, 1, 2);
@include expect($list to have length above 1);
@include expect($list to have length below 4);
@include expect($list to have length within (0, 5));
```

#### empty

Check if a list has a length of 0.

```scss
$list: ();
@include expect($list to be empty);
```

#### string($substring)

Check if a string contains `$substring`.

```scss
@include expect('string' to have string 'str');
```

#### contain($needle)

Check if a string contains `$needle`, or check if a list contains `$needle`.

```scss
@include expect('string' to contain 'str');
@include expect((one, two) to contain 'one');
```

#### include($needle)

Check if a string contains `$needle`, or check if a list contains `$needle`.

```scss
@include expect('string' to include 'str');
@include expect((one, two) to include 'one');
```

#### property($property, $value)

Check if a map contains property `$property`, or if a list has an item at the index of `$property`. Optionally, you can check if that property also contains `$value`.

```scss
$map: (
  'kittens': 10,
  'puppies': 6,
  'otters': 4,
);

@include expect($map to have property 'kittens');
@include expect($map to have property ('puppies', 6));
```

Add the `deep` flag to check for a deep property within a map or list. Each map key or list index is separated by a dot.

```scss
$map: (
  'kittens': 10,
  'puppies': 6,
  'otters': 4,
  'other': (
    'bunnies': 1,
    'ocelots': 2,
    'evenMore': ('birds', 'penguins', 'turkeys'),
  ),
);

@include expect($map to have property 'other.bunnies');
@include expect($map to have property ('other.bunnies', 2));
@include expect($map to have property ('other.evenMore.2', 'penguins'));
```

#### keys($keys)

If you call `keys` by itself, check if a map contains *every key* within `$keys` and *no other keys*.

```scss
$map: (
  one: 'one',
  two: 'two',
);

@include expect($map to have keys (one, two));
```

If you call `contain keys`, check if a map contains *every key* within `$keys`. If the map has other keys, that's fine.

```scss
$map: (
  one: 'one',
  two: 'two',
);

@include expect($map to have keys (one));
```

If you call `any keys`, check if a map contains *any key* within `$keys`.

```scss
$map: (
  one: 'one',
  two: 'two',
);

@include expect($map to have keys (one, two, three, four));
```

#### members($list)

Check if the input list is a superset of `$list`, or that the input list is identical to `$list`;

```scss
$list: (0, 1, 2,);

@include expect($list to have members (0, 1,)); // => true
@include expect($list to have members (0, 1, 2,)); // => true
@include expect($list to have members (0, 3, 5,)); // => false
```
