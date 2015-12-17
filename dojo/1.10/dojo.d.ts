/// <reference path="index.d.ts" />

declare namespace dojo {

	/* general implied types */

	interface GenericConstructor<T> {
		new (...args: any[]): T;
	}

	interface GenericObject {
		[id: string]: any;
	}

	interface Handle {
		remove(): void;
	}

	interface EventListener {
		(evt: any): void;
	}

	/* dojo/Deferred */

	/**
	 * Creates a new deferred. This API is preferred over
	 * `dojo/_base/Deferred`.
	 */
	interface Deferred<T> {
		new <U>(canceler?: (reason: any) => void): Deferred<U>;
		<U>(canceler?: (reason: any) => void): Deferred<U>;

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

	/* dojo/Evented */

	interface Evented {
		on(type: string | ExtensionEvent, listener: EventListener): Handle;
		emit(type: string | ExtensionEvent, event: any): boolean;
	}

	/* dojo/on */

	interface ExtensionEvent {
		(target: Element | GenericObject, litener: EventListener): Handle;
	}

	interface PauseHandle extends Handle {
		pause(): void;
		resume(): void;
	}

	interface MatchesTarget {
		matches(node: Element, selector: string, context?: any): any[];
		[id: string]: any;
	}

	interface On {
		/**
		 * A function that provides core event listening functionality. With this function
		 * you can provide a target, event type, and listener to be notified of
		 * future matching events that are fired.
		 */
		(target: Element | GenericObject, type: string | ExtensionEvent, listener: EventListener, dontFix?: boolean): Handle;

		/**
		 * This function acts the same as on(), but with pausable functionality. The
		 * returned signal object has pause() and resume() functions. Calling the
		 * pause() method will cause the listener to not be called for future events.
		 */
		pausable(target: Element | GenericObject, type: string | ExtensionEvent, listener: EventListener, dontFix?: boolean): Handle;

		/**
		 * This function acts the same as on(), but will only call the listener once. The
		 * listener will be called for the first
		 * event that takes place and then listener will automatically be removed.
		 */
		once(target: Element | GenericObject, type: string | ExtensionEvent, listener: EventListener, dontFix?: boolean): Handle;

		parse(target: Element | GenericObject, type: string | ExtensionEvent, listener: EventListener, dontFix: boolean, matchesTarget: Element | GenericObject): Handle;

		/**
		 * Check if a node match the current selector within the constraint of a context
		 */
		matches(node: Element, selector: string, context: Element, children: boolean, matchesTarget?: MatchesTarget): Element | boolean;

		/**
		 * Creates a new extension event with event delegation. This is based on
		 * the provided event type (can be extension event) that
		 * only calls the listener when the CSS selector matches the target of the event.
		 *
		 * The application must require() an appropriate level of dojo/query to handle the selector.
		 */
		selector(selector: string, type: string | ExtensionEvent, children?: boolean): ExtensionEvent;

		/**
		 * Fires an event on the target object.
		 */
		emit(target: Element | GenericObject, type: string | ExtensionEvent, event: any): boolean;

		/**
		 * normalizes properties on the event object including event
		 * bubbling methods, keystroke normalization, and x/y positions
		 */
		_fixEvent(evt: any, sender: any): any;
	}

	/* dojo/Stateful */
	interface WatchHandle extends Handle {
		unwatch(): void;
	}

	interface Stateful {
		postscript(params?: any): void;
		get(name: string): any;
		set(name: string, value: any): Stateful;
		watch(name: string, callback: (prop: string, oldValue: any, newValue: any) => void): WatchHandle;
	}

	/* dojo/topic */

	interface Topic {
		/**
		 * Publishes a message to a topic on the pub/sub hub. All arguments after
		 * the first will be passed to the subscribers, so any number of arguments
		 * can be provided (not just event).
		 */
		publish(topic: string | ExtensionEvent, event: any): boolean;

		/**
		 * Subscribes to a topic on the pub/sub hub
		 */
		subscribe(topic: string | ExtensionEvent, listener: EventListener): Handle;
	}

	/** dojo/touch */
	interface Touch {
		press: ExtensionEvent;
		move: ExtensionEvent;
		release: ExtensionEvent;
		cancel: ExtensionEvent;
		over: ExtensionEvent;
		out: ExtensionEvent;
		enter: ExtensionEvent;
		leave: ExtensionEvent;
	}
}
