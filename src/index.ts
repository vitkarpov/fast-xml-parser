import {ok} from 'assert';

import {Node, TYPES} from './node';
import {Tokenizer} from './tokenizer';

export function parse(input: string): Node {
  const tokenizer = new Tokenizer(input);
  const root = tokenizer.next();
  const stack = [root];
  let next = root;

  while (next.type !== TYPES.UNKNOWN) {
    next = tokenizer.next();

    if (next.type === TYPES.OPENING_TAG) {
      stack[stack.length - 1].children.push(next);
      stack.push(next);
    } else if (next.type === TYPES.TEXT) {
      stack[stack.length - 1].children.push(next);
    } else if (next.type === TYPES.CLOSING_TAG) {
      stack.pop();
    }
  }

  ok(stack.length === 0, 'The tree is malformed');

  return root;
}
