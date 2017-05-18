import { expect } from 'chai';

import {
  combineResolvers,
  composeResolvers,
} from '../../src/helper';

import {
  createResolver,
} from '../../src/resolver';

describe('(unit) src/helper.js', () => {
  describe('composeResolvers', () => {
    it('returns a composed list of resolvers', () => {
      // const order = [];
      // const firstBaseResolver = createResolver(() => {
      //   order.push('first');
      // });
      //
      // const myResolver = () => {
      //   order.push('myResolver');
      // };
      // const composed = composeResolvers([
      //   myResolver,
      // ], firstBaseResolver, secondBaseResolver);

      const firstBaseResolver = createResolver(() => {});

      const secondBaseResolver = firstBaseResolver.createResolver(
        () => { throw new Error('second!'); }
      );
      const myComposedResolver = secondBaseResolver.createResolver(()=>null);
      myComposedResolver();

    });
  });
  describe('combineResolvers', () => {
    it('returns a combined hash of resolvers', () => {
      const hash1 = {
        Foo: {
          bar: d => d
        },
        Query: {
          getFoo: d => d
        },
        Mutation: {
          updateFoo: d => d
        }
      };
      const hash2 = {
        Bar: {
          foo: d => d
        },
        Query: {
          getBar: d => d
        },
        Mutation: {
          updateBar: d => d
        }
      };

      expect(combineResolvers([
        hash1,
        hash2
      ])).to.eql({
        Foo: {
          bar: hash1.Foo.bar
        },
        Bar: {
          foo: hash2.Bar.foo
        },
        Query: {
          getFoo: hash1.Query.getFoo,
          getBar: hash2.Query.getBar
        },
        Mutation: {
          updateFoo: hash1.Mutation.updateFoo,
          updateBar: hash2.Mutation.updateBar
        }
      });
    })
  });
});
