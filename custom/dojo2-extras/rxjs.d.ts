/**
 * These provide re-exports of various modules that align to the typical
 * configuration of a Dojo 2 application
 */

declare module 'rxjs/Rx' {
	export * from '@reactivex/RxJS';
}

declare module 'rxjs/Observable' {
	import * as Observable from '@reactivex/RxJS/dist/cjs/Observable';
	export = Observable;
}

declare module 'rxjs/Observer' {
	import * as Observer from '@reactivex/RxJS/dist/cjs/Observer';
	export = Observer;
}
