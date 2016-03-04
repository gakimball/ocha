var eyeglass = require('eyeglass');
var sass = require('node-sass');
var True = require('sass-true');

True.runSass({ file: 'test/test.scss' }, describe, it);

// describe('Ocha', () => {
//   it('works', done => {
//     sass.render(eyeglass({ file: 'test/test.scss' }), function(err, data) {
//       if (err) console.log(err.message);
//       console.log(data.css.toString());
//       done();
//     });
//   });
// });
