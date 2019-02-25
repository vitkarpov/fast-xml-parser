const fs = require('fs');
const {parse} = require('../dst/index');

describe('parse', () => {
  fs.readdirSync('./e2e/inputs/').map((file) => {
    return require(`./inputs/${file}`)
  }).forEach((input) => {
    it(input, () => {
      const root = parse(input);

      expect(root).toMatchSnapshot();
    });
  });
});
