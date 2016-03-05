var eyeglass = require('eyeglass');
var expect = require('chai').expect;
var sass = require('node-sass');
var True = require('sass-true');

var trueParse = require('sass-true/lib/main').parse;

describe('Assertions', () => {
  testFile('test/equal.scss');
  testFile('test/above.scss');
  testFile('test/least.scss');
  testFile('test/below.scss');
  testFile('test/most.scss');
  testFile('test/within.scss');
  testFile('test/length.scss');
  testFile('test/lengthOf.scss');
});

/**
 * Tests a Sass file, converting True's test-module() and test() mixins into Mocha describe and it blocks.
 * Each Sass test has one assertion which should either pass or fail. The JavaScript tests created here are verifying that an assertion properly passed or failed based on what's expected.
 * @param {string} file - Path to a test file.
 */
function testFile(file) {
  var res;

  try {
    res = sass.renderSync({ file: file });
  }
  catch (e) {
    describe(file, () => {
      it('compiles without errors', () => {
        throw e;
      });
    });

    return;
  }

  var modules = trueParse(res.css.toString());

  for (var i in modules) {
    var module = modules[i];

    // Create a describe block for each use of @include test-module
    describe(module.module, () => {
      for (var j in module.tests) {
        var test = module.tests[j];

        // Create an it block for each use of @include test
        it(test.test, () => {
          var passing = test.test.indexOf('Pass') === 0 ? true : false;
          // Assume one assertion per test
          expect(test.assertions[0].passed).to.equal(passing);
        });
      }
    });
  }
}
