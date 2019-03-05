import {Attrs} from './node';
import {parseAttrs, stringifyAttrs} from './utils';

describe('parseAttrs', () => {
  [{input: 'foo="1"', expected: {foo: '1'}},
   {input: 'foo="1" bar="2"', expected: {foo: '1', bar: '2'}},
   {input: 'foo="1" bar=2', expected: {foo: '1', bar: '2'}},
   {input: 'foo="1" bar', expected: {foo: '1', bar: 'true'}},
   {input: 'foo', expected: {foo: 'true'}}]
      .forEach(({input, expected}) => {
        it(input, () => {
          expect(parseAttrs(input)).toEqual(expected);
        });
      });
});

describe('stringifyAttrs', () => {
  [{input: {foo: '1'}, expected: 'foo="1"'},
   {input: {foo: '1', bar: '2'}, expected: 'foo="1" bar="2"'},
   {input: {foo: '1', bar: '2'}, expected: 'foo="1" bar="2"'},
   {input: {foo: '1', bar: 'true'}, expected: 'foo="1" bar="true"'},
   {input: {foo: 'true'}, expected: 'foo="true"'}]
      .forEach(({input, expected}) => {
        it(expected, () => {
          expect(stringifyAttrs(input as Attrs)).toEqual(expected);
        });
      });
});
