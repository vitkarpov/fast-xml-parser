const fs = require('fs');
const path = require('path');
const {parse} = require('../dst/index');

it('basic', () => {
  const input = fs.readFileSync(path.join(__dirname, 'inputs/basic.html'), 'utf-8');
  expect(parse(input)).toMatchSnapshot();
});
