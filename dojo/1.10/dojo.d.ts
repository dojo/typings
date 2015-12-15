/// <reference path="index.d.ts" />

declare namespace dojo {
	export interface Deferred<T> {
		new <U>(canceler?: Function): Deferred<U>;
		<U>(canceler?: Function): Deferred<U>;
		promse: promise.Promise<T>;
		isResolved(): boolean;
		isRejected(): boolean;
		isFulfilled(): boolean;
		isCanceled(): boolean;
		progress(update: any, strict?: boolean): promise.Promise<T>;
		resolve(value: any, strict?: boolean): promise.Promise<T>;
		reject(error: any, strict?: boolean): promise.Promise<T>;
		then<U>(callback?: promise.PromiseCallback<T>, errback?: promise.PromiseErrback, progback?: promise.PromiseProgback): promise.Promise<U>;
		cancel(reason: any, strict?: boolean): any;
	}

	export interface GenericConstructor<T> {
		new (...args: any[]): T;
	}

	export interface Handle {
		remove(): void;
	}

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