import {Node, TYPES} from './node';
import {Tokenizer} from './tokenizer';
import {stringifyAttrs} from './utils';

export function parse(input: string): Node {
  const tokenizer = new Tokenizer(input);
  let root = tokenizer.next();

  if (root.type === TYPES.DIRECTIVE) {
    root = new Node({type: TYPES.FRAGMENT, name: 'root', children: [root]});
  }

  const stack = [root];
  let next = root;

  while (next.type !== TYPES.UNKNOWN) {
    next = tokenizer.next();

    if (next.type === TYPES.SELF_CLOSING || next.type === TYPES.TEXT) {
      stack[stack.length - 1].children.push(next);
    } else if (next.type === TYPES.OPENING_TAG) {
      stack[stack.length - 1].children.push(next);
      stack.push(next);
    } else if (next.type === TYPES.CLOSING_TAG) {
      stack.pop();
    }
  }

  return root;
}

export function stringify(root: Node): string {
  if (root.type === TYPES.FRAGMENT) {
    return root.children.reduce((acc, node) => acc + stringify(node), '');
  }
  if (root.type === TYPES.TEXT) {
    return root.name;
  }

  const attrs = stringifyAttrs(root.attrs);
  let s = '<' + root.name + (attrs ? ' ' : '') + attrs + '>';

  if (root.type === TYPES.OPENING_TAG) {
    s += root.children.reduce((acc, node) => acc + stringify(node), '');
    s += `</${root.name}>`;
  }
  return s;
}
