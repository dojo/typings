import * as lang from 'dojo/_base/lang';

/* An example of using partial, where we still want to type guard after using
  partial.  TypeScript cannot infer the resulting type automatically, if the
  type is not specified, you get a generic function. */

/**
 * A basic function, where we will partially bind
 */
function foo(a: string, b: string): string {
	return a + b;
}

/**
 * Here we specify the resulting function signature and TypeScript will then
 * allow us to guard against that signature, instead of just being a "generic"
 * function.
 */
const partFoo = lang.partial<(b: string) => string>(foo, 'foo');

/* We have to specify one string argument now in TypeScript */
let result = partFoo('bar');

console.log(result); // outputs 'foobar'

/* An example of using hitch, where if no arugments are pass, the function is
  inferred to have the same signature of the original */

const hitchFoo = lang.hitch({}, foo);

result = hitchFoo('foo', 'bar');

console.log(result); // outputs 'foobar'

/* But, if we pass in arguments, again TypeScript cannot infer the signature, but
  we can specify it if we wish. */

const hitchPartialFoo = lang.hitch<(b: string) => string>({}, foo, 'foo');

result = hitchPartialFoo('bar');

console.log(result);
