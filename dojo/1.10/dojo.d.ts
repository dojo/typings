/// <reference path="index.d.ts" />

declare namespace dojo {

	/* general implied types */

	export interface GenericConstructor<T> {
		new (...args: any[]): T;
	}

	export interface Handle {
		remove(): void;
	}

	/* dojo/Deferred */

	/**
	 * Creates a new deferred. This API is preferred over
	 * `dojo/_base/Deferred`.
	 */
	export interface Deferred<T> {
		new <U>(canceler?: Function): Deferred<U>;
		<U>(canceler?: Function): Deferred<U>;

		/**
		 * The public promise object that clients can add callbacks to.
		 */
		promise: promise.Promise<T>;

		/**
		 * Checks whether the deferred has been resolved.
		 */
		isResolved(): boolean;

		/**
		 * Checks whether the deferred has been rejected.
		 */
		isRejected(): boolean;

		/**
		 * Checks whether the deferred has been resolved or rejected.
		 */
		isFulfilled(): boolean;

		/**
		 * Checks whether the deferred has been canceled.
		 */
		isCanceled(): boolean;

		/**
		 * Emit a progress update on the deferred.
		 */
		progress(update: any, strict?: boolean): promise.Promise<T>;

		/**
		 * Resolve the deferred.
		 */
		resolve(value: any, strict?: boolean): promise.Promise<T>;

		/**
		 * Reject the deferred.
		 */
		reject(error: any, strict?: boolean): promise.Promise<T>;

		/**
		 * Add new callbacks to the deferred.
		 */
		then<U>(callback?: promise.PromiseCallback<T>, errback?: promise.PromiseErrback, progback?: promise.PromiseProgback): promise.Promise<U>;

		/**
		 * Inform the deferred it may cancel its asynchronous operation.
		 */
		cancel(reason: any, strict?: boolean): any;
	}

	/* dojo/Stateful */
	export interface WatchHandle extends Handle {
		unwatch(): void;
	}

	export interface Stateful {
		postscript(params?: any): void;
		get(name: string): any;
		set(name: string, value: any): Stateful;
		watch(name: string, callback: (prop: string, oldValue: any, newValue: any) => void): WatchHandle;
	}

	export interface SyntheticEvent {
		(node: HTMLElement, listener: Function): Handle;
	}

	export interface Touch {
		press: SyntheticEvent;
		move: SyntheticEvent;
		release: SyntheticEvent;
		cancel: SyntheticEvent;
		over: SyntheticEvent;
		out: SyntheticEvent;
		enter: SyntheticEvent;
		leave: SyntheticEvent;
	}
}