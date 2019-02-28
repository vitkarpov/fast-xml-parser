export enum TYPES {
  UNKNOWN,
  OPENING_TAG = 'OPENING_TAG',
  CLOSING_TAG = 'CLOSING_TAG',
  TEXT = 'TEXT',
  DIRECTIVE = 'DIRECTIVE',
  FRAGMENT = 'FRAGMENT'
}

export const VOID_ELEMENTS = [
  'area', 'base', 'br', 'col', 'command', 'embeded', 'hr', 'img', 'input',
  'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'
];

interface NodeConfig {
  type: TYPES;
  name: string;
  children?: Node[];
  attrs?: Record<string, string>;
}

export class Node {
  type: TYPES;
  name: string;
  children: Node[];
  attrs: Record<string, string>;

  constructor(config: Partial<NodeConfig> = {}) {
    this.children = config.children || [];
    this.name = config.name || '';
    this.type = config.type || TYPES.UNKNOWN;
    this.attrs = config.attrs || {};
  }
}
