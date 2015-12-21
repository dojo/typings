/// <reference path="dojo.d.ts" />
/// <reference path="promise.d.ts" />

declare namespace dojo {
	namespace request {

		/* dojo/request */

		interface Promise<T> extends dojo.promise.Promise<T> {
			response: dojo.promise.Promise<T>;
		}

		interface BaseOptions {
			/**
			 * Query parameters to append to the URL.
			 */
			query?: string | { [name: string]: any };

			/**
			 * Data to transfer.  This is ignored for GET and DELETE
			 * requests.
			 */
			data?: string | { [name: string]: any };

			/**
			 * Whether to append a cache-busting parameter to the URL.
			 */
			preventCache?: boolean;

			/**
			 * Milliseconds to wait for the response.  If this time
			 * passes, the then the promise is rejected.
			 */
			timeout?: number;

			/**
			 * How to handle the response from the server.  Default is
			 * 'text'.  Other values are 'json', 'javascript', and 'xml'.
			 */
			handleAs?: string;
		}

		interface MethodOptions {
			/**
			 * The HTTP method to use to make the request.  Must be
			 * uppercase.
			 */
			method?: string;
		}

		interface RequestOptions extends BaseOptions, MethodOptions {}

		interface Request {
			/**
			 * Send a request using the default transport for the current platform.
			 */
			<T>(url: string, options?: RequestOptions): Promise<T>;

			/**
			 * Send an HTTP GET request using the default transport for the current platform.
			 */
			get<T>(url: string, options?: BaseOptions): Promise<T>;

			/**
			 * Send an HTTP POST request using the default transport for the current platform.
			 */
			post<T>(url: string, options?: BaseOptions): Promise<T>;

			/**
			 * Send an HTTP PUT request using the default transport for the current platform.
			 */
			put<T>(url: string, options?: BaseOptions): Promise<T>;

			/**
			 * Send an HTTP DELETE request using the default transport for the current platform.
			 */
			del<T>(url: string, options?: BaseOptions): Promise<T>;
		}

		/* dojo/request/watch */

		interface Watch {
			/**
			 * Watches the io request represented by dfd to see if it completes.
			 */
			<T>(dfd: Promise<T>): void;

			/**
			 * Cancels all pending IO requests, regardless of IO type
			 */
			cancelAll(): void;
		}

		/* dojo/request/xhr */

		interface XhrBaseOptions extends BaseOptions {
			/**
			 * Whether to make a synchronous request or not. Default
			 * is `false` (asynchronous).
			 */
			sync?: boolean;

			/**
			 * Data to transfer. This is ignored for GET and DELETE
			 * requests.
			 */
			data?: string | GenericObject | FormData;

			/**
			 * Headers to use for the request.
			 */
			headers?: { [header: string]: string };

			/**
			 * Username to use during the request.
			 */
			user?: string;

			/**
			 * Password to use during the request.
			 */
			password?: string;

			/**
			 * For cross-site requests, whether to send credentials
			 * or not.
			 */
			withCredentials?: boolean;
		}

		interface XhrOptions extends XhrBaseOptions, MethodOptions { }

		interface Xhr {
			/**
			 * Sends a request using XMLHttpRequest with the given URL and options.
			 */
			<T>(url: string, options?: XhrOptions): Promise<T>;

			/**
			 * Send an HTTP GET request using XMLHttpRequest with the given URL and options.
			 */
			get<T>(url: string, options?: XhrBaseOptions): Promise<T>;

			/**
			 * Send an HTTP POST request using XMLHttpRequest with the given URL and options.
			 */
			post<T>(url: string, options?: XhrBaseOptions): Promise<T>;

			/**
			 * Send an HTTP PUT request using XMLHttpRequest with the given URL and options.
			 */
			put<T>(url: string, options?: XhrBaseOptions): Promise<T>;

			/**
			 * Send an HTTP DELETE request using XMLHttpRequest with the given URL and options.
			 */
			del<T>(url: string, options?: XhrBaseOptions): Promise<T>;

			/**
			 * does the work of portably generating a new XMLHTTPRequest object.
			 */
			_create(): XMLHttpRequest | ActiveXObject;
		}
	}
}
