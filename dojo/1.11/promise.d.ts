declare namespace dojo {
	namespace promise {

		/* dojo/promise/all */

		type PromiseObjectOrArray = { [name: string]: Promise<any> } | Promise<any>[];
		type PromiseTypedObjectOrArray<T> = { [name: string]: Promise<T> } | Promise<T>[];

		interface All {
			/**
			 * Takes multiple promises and returns a new promise that is fulfilled
			 * when all promises have been resolved or one has been rejected.
			 * @param objectOrArray The promise will be fulfilled with a list of results if invoked with an
			 * 						array, or an object of results when passed an object (using the same
			 * 						keys). If passed neither an object or array it is resolved with an
			 * 						undefined value.
			 */
			<T>(array: Thenable<T>[]): Promise<T[]>;
			<T>(object: { [name: string]: Thenable<T> }): Promise<{ [name: string]: T }>;
			(array: Thenable<any>[]): Promise<any[]>;
			(object: { [name: string]: Thenable<any> }): Promise<{ [name: string]: any }>;
		}

		/* dojo/promise/first */

		interface First {
			/**
			 * Takes multiple promises and returns a new promise that is fulfilled
			 * when the first of these promises is fulfilled.
			 * @param objectOrArray The promises are taken from the array or object values. If no value
			 * 						is passed, the returned promise is resolved with an undefined value.
			 */
			<T>(objectOrArray?: PromiseTypedObjectOrArray<T>): Promise<T>;
			(objectOrArray?: PromiseObjectOrArray): Promise<any>;
		}

		/* dojo/promise/instrumentation */

		interface Instrumentation {
			/**
			 * Initialize instrumentation for the Deferred class.
			 */
			(Deferred: DeferredConstructor): void;
		}

		/* dojo/promise/Promise */

		interface Thenable<T> {
			/**
			 * Add new callbacks to the promise.
			 */
			then<U>(callback?: PromiseCallback<T, U>, errback?: PromiseErrback<U>, progback?: PromiseProgback): Promise<U>;
		}

		interface PromiseCallback<T, U> {
			(result: T): U | Thenable<U>;
		}

		interface PromiseErrback<U> {
			(error: any): U | Thenable<U> | void;
		}

		interface PromiseProgback {
			(progress: any): void;
		}

		interface Promise<T> extends Thenable<T> {
			/**
			 * Inform the deferred it may cancel its asynchronous operation.
			 */
			cancel(reason?: any, strict?: boolean): any;

			/**
			 * Checks whether the promise has been resolved.
			 */
			isResolved(): boolean;

			/**
			 * Checks whether the promise has been rejected.
			 */
			isRejected(): boolean;

			/**
			 * Checks whether the promise has been resolved or rejected.
			 */
			isFulfilled(): boolean;

			/**
			 * Checks whether the promise has been canceled.
			 */
			isCanceled(): boolean;

			/**
			 * Add a callback to be invoked when the promise is resolved
			 * or rejected.
			 */
			always<U>(callbackOrErrback: PromiseCallback<T, U> | PromiseErrback<U>): Promise<U>;

			/**
			 * Add new errbacks to the promise. Follows ECMA specification naming.
			 */
			catch<U>(errback: PromiseErrback<U>): Promise<U>;

			/**
			 * Add new errbacks to the promise.
			 */
			otherwise<U>(errback: PromiseErrback<U>): Promise<U>;

			trace(): this;
			traceRejected(): this;
			toString(): string;
		}

		interface PromiseConstructor {
			/**
			 * The public interface to a deferred.
			 */
			new <T>(): Promise<T>;
		}

		/* dojo/promise/tracer */

		/* TODO: Uncomment for TS 1.8 */
		/* type TracerEvent = 'resolved' | 'rejected' | 'progress'; */

		interface Tracer {
			/**
			 * Subscribe to traces.
			 */
			on(type: string /* TracerEvent */, listener: EventListener): Handle;
		}
	}
}
