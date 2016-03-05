var eyeglass = require('eyeglass');
var expect = require('chai').expect;
var sass = require('node-sass');
var True = require('sass-true');

var trueParse = require('sass-true/lib/main').parse;

describe('Assertions', () => {
  testFile('test/functions/equal.scss');
  testFile('test/functions/above.scss');
  testFile('test/functions/least.scss');
  testFile('test/functions/below.scss');
  testFile('test/functions/most.scss');
  testFile('test/functions/within.scss');
  testFile('test/functions/length.scss');
  testFile('test/functions/lengthOf.scss');
  testFile('test/functions/empty.scss');
  testFile('test/functions/string.scss');
  testFile('test/functions/contain.scss');
  testFile('test/functions/oneOf.scss');
  testFile('test/functions/members.scss');
  testFile('test/functions/a.scss');
  testFile('test/functions/ok.scss');
  testFile('test/functions/true.scss');
  testFile('test/functions/false.scss');
  testFile('test/functions/null.scss');
  testFile('test/functions/keys.scss');
  testFile('test/functions/property.scss');
  testFile('test/functions/eql.scss');
  testFile('test/functions/deep-equal.scss');
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
  // If a Sass file has a compile error, drop the error into a Mocha test so the whole script doesn't crash
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
