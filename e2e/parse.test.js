const fs = require('fs');
const path = require('path');
const {parse} = require('../dst/index');

describe('parse', () => {
  fs.readdirSync('./e2e/inputs/').map((file) => {
    return [path.basename(file, '.js'), require(`./inputs/${file}`)]
  }).forEach(([file, input]) => {
    it(file, () => {
      const root = parse(input);

      expect(root).toMatchSnapshot();
    });
  });
});
