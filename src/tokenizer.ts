import {Node, TYPES, VOID_ELEMENTS} from './node';
import {parseAttrs} from './utils';

enum BRACKETS {
  OPENING = '<',
  CLOSING = '>'
}

export class Tokenizer {
  input: string;
  curr: number;

  constructor(input: string) {
    this.input = input;
    this.curr = 0;
  }

  next(): Node {
    const next = this.input.indexOf(BRACKETS.OPENING, this.curr);

    if (next === -1) {
      return new Node();
    }

    const text = this.input.substr(this.curr, next - this.curr).trim();

    if (text.length > 0) {
      this.curr = next;

      return new Node({type: TYPES.TEXT, name: text});
    }

    this.curr = this.input.indexOf(BRACKETS.CLOSING, next) + 1;

    if (this.input[next + 1] === '/') {
      return new Node({
        type: TYPES.CLOSING_TAG,
        name: this.input.substr(next + 2, this.curr - next - 3)
      });
    }

    const betweenBrackets = this.input.substring(next + 1, this.curr - 1);
    const whitespacePos = betweenBrackets.indexOf(' ');
    let name, attrs;

    if (whitespacePos > -1) {
      name = betweenBrackets.substring(0, whitespacePos);

      if (name.toLocaleLowerCase() === '!doctype') {
        return new Node({type: TYPES.DIRECTIVE, name: betweenBrackets});
      }

      attrs = parseAttrs(betweenBrackets.substring(whitespacePos + 1));
    } else {
      name = betweenBrackets;
      attrs = {};
    }

    if (VOID_ELEMENTS.includes(name)) {
      return new Node({type: TYPES.SELF_CLOSING, name, attrs});
    }

    return new Node({type: TYPES.OPENING_TAG, name, attrs});
  }
}
