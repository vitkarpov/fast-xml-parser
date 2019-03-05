const {parse, stringify, Node} = require('../dst/index');

describe('serialize', () => {
  it('readme example', () => {
    const root = parse('<!DOCTYPE html><html>hello</html>');

    // change text node
    root.children[1].children[0].name = 'hello, world!'

    expect(stringify(root)).toEqual('<!DOCTYPE html><html>hello, world!</html>');
  });
});
