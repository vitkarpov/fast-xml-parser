import {Node, TYPES} from './node';
import {Tokenizer} from './tokenizer';

describe('Tokenizer', () => {
  [{
    input: '<html></html>',
    expected: [
      new Node({type: TYPES.OPENING_TAG, name: 'html'}),
      new Node({type: TYPES.CLOSING_TAG, name: 'html'}), new Node()
    ]
  },
   {
     input: '<html>text</html>',
     expected: [
       new Node({type: TYPES.OPENING_TAG, name: 'html'}),
       new Node({type: TYPES.TEXT, name: 'text'}),
       new Node({type: TYPES.CLOSING_TAG, name: 'html'}), new Node()
     ]
   },
   {
     input: '<html><head></head></html>',
     expected: [
       new Node({type: TYPES.OPENING_TAG, name: 'html'}),
       new Node({type: TYPES.OPENING_TAG, name: 'head'}),
       new Node({type: TYPES.CLOSING_TAG, name: 'head'}),
       new Node({type: TYPES.CLOSING_TAG, name: 'html'}), new Node()
     ]
   },
   {
     input: '<h1 id="test0"title="value5" class=value2 disabled></h1>',
     expected: [
       new Node({
         type: TYPES.OPENING_TAG,
         name: 'h1',
         attrs: {
           id: 'test0',
           title: 'value5',
           class: 'value2',
           disabled: 'true'
         }
       }),
       new Node({type: TYPES.CLOSING_TAG, name: 'h1'}), new Node()
     ]
   },
   {
     input: '<!DOCTYPE html><html></html>',
     expected: [
       new Node({type: TYPES.DIRECTIVE, name: '!DOCTYPE html'}),
       new Node({type: TYPES.OPENING_TAG, name: 'html'}),
       new Node({type: TYPES.CLOSING_TAG, name: 'html'}), new Node()
     ]
   },
   {
     input: '<head><link href="https://google.com"></head>',
     expected: [
       new Node({type: TYPES.OPENING_TAG, name: 'head'}), new Node({
         type: TYPES.SELF_CLOSING,
         name: 'link',
         attrs: {href: 'https://google.com'}
       }),
       new Node({type: TYPES.CLOSING_TAG, name: 'head'}), new Node()
     ]
   },
   {
     input: '<html><![CDATA[<sender>John Smith</sender>]]></html>',
     expected: [
       new Node({type: TYPES.OPENING_TAG, name: 'html'}), new Node({
         type: TYPES.CDATA_TAG,
         name: '&lt;sender&gt;John Smith&lt;/sender&gt;'
       }),
       new Node({type: TYPES.CLOSING_TAG, name: 'html'})
     ]
   }].forEach(({input, expected}) => {
    it(input, () => {
      const tokenizer = new Tokenizer(input);

      expected.forEach((node) => {
        expect(tokenizer.next()).toEqual(node);
      });
    });
  });
});
