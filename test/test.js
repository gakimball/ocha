var eyeglass = require('eyeglass');
var expect = require('chai').expect;
var sass = require('node-sass');
var True = require('sass-true');

var trueParse = require('sass-true/lib/main').parse;

describe('Ocha', () => {
  it('works', done => {
    test('test/test.scss', true, done);
  });
});

function test(file, passed, cb) {
  sass.render(eyeglass({ file: file }), (err, res) => {
    if (err) throw err;
    var tests = trueParse(res.css.toString());
    expect(tests[0].tests[0].assertions[0].passed).to.equal(passed);
    cb();
  });
}
