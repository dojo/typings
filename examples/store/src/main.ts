import * as Memory from 'dojo/store/Memory';

/* An example of working with dojo/store */

/* When we specify data during the store creation, but don't specify a specific
  type, TypeScript will infer the types from the objects we pass to it. */
const store = new Memory({
    data: [
        { id: 1, foo: 'bar' },
        { id: 2, bar: 'bar' }
    ]
});

/* so we have inferred that entries to this store must be one of the following:
    { id: number; foo: string; }
    { id: number; bar: string; } */

/* so we are guarded when we add */
store.add({ id: 3, foo: 'foo' });

/* the following will throw errors */
// store.add({ id: 4 });
// store.add({ id: 5, foo: 3 });
// store.add({ id: 6, foo: 'bar', baz: 'baz' });

/* Although, you can have something that is the union */
store.add({ id: 7, foo: 'bar', bar: 'test' });

/* There are problems that arise though with this on retrevial */
const seven = store.get(7);

/* We only get the shared properties so while the following is valid */
console.log(seven.id);

/* the following will error */
// console.log(seven.foo);
// console.log(seven.bar);

/* We can avoid all this by asserting the type on creation */
type FooBar = { id: number; foo?: string, bar?: string };

const store2 = new Memory<FooBar>({
    data: [
        { id: 1, foo: 'bar' },
        { id: 2, bar: 'bar' }
    ]
});

store.add({ id: 7, foo: 'bar', bar: 'test' });

const obj = store2.get(7);
console.log(obj.foo);
console.log(obj.bar);
