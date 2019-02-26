import {Node, TYPES} from './node';

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

    return new Node({
      type: TYPES.OPENING_TAG,
      name: this.input.substr(next + 1, this.curr - next - 2)
    });
  }
}
