const fs = require('fs');
const path = require('path');
const {parse} = require('../dst/index');

it('attributes', () => {
  const input = fs.readFileSync(path.join(__dirname, 'inputs/attributes.html'), 'utf-8');
  expect(parse(input)).toMatchSnapshot();
});
