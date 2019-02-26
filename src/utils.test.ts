import {parseAttrs} from './utils';

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
