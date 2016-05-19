/* Re-export of Rx in logical AMD location */
declare module 'rxjs/Rx' {
	export * from '@reactivex/RxJS';
}

declare module 'immutable/immutable' {
	export * from 'immutable';
}

declare module 'maquette/maquette' {
	export * from 'maquette';
}

declare module 'rxjs/Observable' {
	import * as Observable from '@reactivex/RxJS/dist/cjs/Observable';
	export = Observable;
}

declare module 'rxjs/Observer' {
	import * as Observer from '@reactivex/RxJS/dist/cjs/Observer';
	export = Observer;
}

/* For some reasons @reactivex/RxJS is missing these */
interface Iterator<T> {
	next(value?: any): IteratorResult<T>;
	return?(value?: any): IteratorResult<T>;
	throw?(e?: any): IteratorResult<T>;
}

interface Iterable<T> {
	[Symbol.iterator](): Iterator<T>;
}
