declare namespace dojo {
	namespace errors {

		/* dojo/errors/CancelError */

		interface CancelError extends Error {
			name: string;
			dojoType: string;
		}

		interface CancelErrorConstructor extends ErrorCtor<CancelError> { }

		/* dojo/errors/create */

		interface ErrorCtor<E> {
			new (message?: string): E;
			prototype: E;
		}

		interface Create {
			<E extends Error, P extends Object>(name: string, ctor: GenericConstructor<any>, base: E, props: P): ErrorCtor<E & P>;
			<E extends Error, P extends Object>(name: string, ctor: GenericConstructor<any>, base: E): ErrorCtor<E>;
			<E extends Error, P extends Object>(name: string, ctor: GenericConstructor<any>): ErrorCtor<E>;
			<E extends Error, P extends Object>(name: string): ErrorCtor<E>;
		}

		/* dojo/errors/RequestError */

		interface RequestError extends Error {
			response: request.Response<any>;
		}

		interface RequestErrorConstructor extends ErrorCtor<RequestError> { }

		/* dojo/errors/RequestTimeoutError */

		interface RequestTimeoutError extends RequestError {
			dojoType: string;
		}

		interface RequestTimeoutErrorConstructor extends ErrorCtor<RequestTimeoutError> { }

	}
}
