<h1 align="center"><a href="http://gakimball.github.io/ocha/">
  <img width="400" src="https://raw.githubusercontent.com/gakimball/ocha/master/assets/logo.png" alt="Ocha">
</a></h1>

A BDD-style assertion library for Sass that works with the [True](https://github.com/oddbird/true) test runner.

## Installation

Install Ocha through npm or Bower.

```bash
npm install ocha
bower install ocha
```

## Usage

Use the `expect()` mixin to write an assertion. Pass a value to check, and then a series of language functions. Most assertions also require a final value to compare with.

```scss
@import 'true';
@import 'ocha';

@include test-module('Test Module') {
  @include test('Test') {
    $value: 5
    @include expect($value to equal 5);
  }
}
```

## API

[View the full API here.](http://gakimball.github.io/ocha/api.html)
