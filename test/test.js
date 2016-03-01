var sass = require('node-sass');

describe('Ocha', () => {
  it('works', done => {
    sass.render({ file: 'test/test.scss' }, function(err, data) {
      console.log(err);
      console.log(data);
      done();
    });
  });
});
