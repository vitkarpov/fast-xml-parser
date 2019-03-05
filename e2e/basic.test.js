const fs = require('fs');
const path = require('path');
const {parse, stringify} = require('../dst/index');

describe('basic', () => {
  const input = fs.readFileSync(path.join(__dirname, 'inputs/basic.html'), 'utf-8');

  it('parse', () => {
    expect(parse(input)).toMatchSnapshot();
  });

  it('stringify', () => {
    expect(stringify(parse(input))).toMatchSnapshot();
  });
});
