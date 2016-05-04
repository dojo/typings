import * as Deferred from 'dojo/Deferred';

/* Deferred's work a lot like ES6 Promises except that they expose then
 * resolution at the instance level, instead of the promise handler */

/* Here we specify a new deferred along with the resolution type.  If
 * none is supplied then it gets inferred as any type */
const dfd = new Deferred<string>();

const next = dfd.then(function(value) {
	/* in here, value is inferred to be of type string */
	return value.indexOf('foo'); /* the return type gets inferred to the next
									promise in the chain */
}).then(function(value) {
	/* so in here, the value is now inferred to be type number */
	return value;
});

/* here, resolve will only take type string, as supplied when we created the
 * new deferred */
dfd.resolve('foobar');

/* Here, returning a promise will properly infer the resolved type */

const deferred1 = new Deferred();
const deferred2 = new Deferred<number>();

deferred1.then((value) => {
	return deferred2.promise;
}).then((value) => {
	console.log(value.toFixed());
});

deferred1.resolve();
deferred2.resolve(123.456);
