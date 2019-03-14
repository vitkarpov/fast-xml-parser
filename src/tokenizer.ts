import {Attrs, Node, TYPES, VOID_ELEMENTS} from './node';
import {parseAttrs} from './utils';

enum BRACKETS {
  OPENING = '<',
  CLOSING = '>'
}

interface ParsingState {
  result: Node;
}

export class Tokenizer {
  input: string;
  openingTagPos: number;
  closingTagPos: number;

  constructor(input: string) {
    this.input = input;
    this.openingTagPos = 0;
    this.closingTagPos = -1;
  }

  private parseBetweenBrackets(input: string) {
    const whitespacePos = input.indexOf(' ');
    const name = whitespacePos > -1 ? input.substring(0, whitespacePos) : input;
    const attrs = whitespacePos > -1 ?
        parseAttrs(input.substring(whitespacePos + 1)) :
        {};

    return {name, attrs};
  }

  private parseText(state: ParsingState) {
    // text is what we have between > and <
    const text =
        this.input.substring(this.closingTagPos + 1, this.openingTagPos).trim();

    if (text.length === 0) {
      return false;
    }
    state.result = new Node({type: TYPES.TEXT, name: text});
    return true;
  }

  private parseSelfClosingTag(state: ParsingState, name: string, attrs: Attrs) {
    if (!VOID_ELEMENTS.includes(name)) {
      return false;
    }
    state.result = new Node({type: TYPES.SELF_CLOSING, name, attrs});
    return true;
  }

  private parseDocType(
      state: ParsingState, name: string, betweenBrackets: string) {
    if (name.toLocaleLowerCase() !== '!doctype') {
      return false;
    }
    state.result = new Node({type: TYPES.DIRECTIVE, name: betweenBrackets});
    return true;
  }

  private parseClosingTag(state: ParsingState) {
    if (this.input[this.openingTagPos + 1] !== '/') {
      return false;
    }
    state.result = new Node({
      type: TYPES.CLOSING_TAG,
      // pass </ (2 chars) to end up at the name start
      name: this.input.substring(this.openingTagPos + 2, this.closingTagPos)
    });
    return true;
  }

  next(): Node {
    this.openingTagPos =
        this.input.indexOf(BRACKETS.OPENING, this.closingTagPos);

    // if there's no more opening tags
    // we have parsed everything
    if (this.openingTagPos < 0) {
      return new Node();
    }

    const state = {} as ParsingState;

    if (this.parseText(state)) {
      this.closingTagPos = this.openingTagPos - 1;
      return state.result;
    }

    this.closingTagPos =
        this.input.indexOf(BRACKETS.CLOSING, this.openingTagPos);

    if (this.parseClosingTag(state)) {
      return state.result;
    }

    const betweenBrackets =
        this.input.substring(this.openingTagPos + 1, this.closingTagPos);
    const {name, attrs} = this.parseBetweenBrackets(betweenBrackets);

    if (this.parseSelfClosingTag(state, name, attrs)) {
      return state.result;
    }
    if (this.parseDocType(state, name, betweenBrackets)) {
      return state.result;
    }
    return new Node({type: TYPES.OPENING_TAG, name, attrs});
  }
}
