/// <reference path="dojo.d.ts" />
/// <reference path="promise.d.ts" />

declare namespace dojo {
	namespace request {

		/* dojo/request */

		interface Promise<T> extends dojo.promise.Promise<T> {
			response: dojo.promise.Promise<Response<T>>;
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

		interface RequestOptions extends BaseOptions, MethodOptions { }

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

		/* dojo/request/default */

		interface Default {

			getPlatformId(): string; /* './xhr' | './node' */ /* TODO: Uncomment for TS 1.8 */

			load(id: string, parentRequire: Function, loaded: Function): void; /* TODO: Align with loader api */
		}

		/* dojo/request/handlers */

		interface Handlers {
			<T>(response: Response<any>): Response<T>;
			register(name: string, handler: (response: Response<any>) => Response<any>): void;
		}

		/* dojo/request/iframe */

		interface IFrameBaseOptions extends BaseOptions {
			form?: HTMLFormElement;
			data?: string | Object;
		}

		interface IFrameOptions extends IFrameBaseOptions, MethodOptions { }

		interface IFrame {
			<T>(url: string, options: IFrameOptions, returnDeferred: boolean): RequestDeferred<T>;
			<T>(url: string, options?: IFrameOptions): Promise<T>;

			create(name: string, onloadstr?: string, uri?: string): HTMLIFrameElement;
			doc(iframenode: HTMLIFrameElement): Document;
			setSrc(_iframe: HTMLIFrameElement, src: string, replace?: boolean): void;

			_iframeName: string;
			_notifyStart: Function;
			_dfdQueue: RequestDeferred<any>[];
			_currentDfd: RequestDeferred<any>;
			_fireNextRequest(): void;

			/**
			 * Send an HTTP GET request using the default transport for the current platform.
			 */
			get<T>(url: string, options?: IFrameBaseOptions): Promise<T>;

			/**
			 * Send an HTTP POST request using the default transport for the current platform.
			 */
			post<T>(url: string, options?: IFrameBaseOptions): Promise<T>;
		}

		/* dojo/request/node */

		interface NodeRequestBaseOptions extends BaseOptions {
			socketPath?: string;
			headers?: { [header: string]: string };
			agent?: string;
			pfx?: any;
			key?: string;
			passphrase?: string;
			cert?: any;
			ca?: any;
			ciphers?: string;
			rejectUnauthorized?: boolean;
			path?: string;
			auth?: string;
			username?: string;
			password?: string;
			socketOptions?: { timeout: number, noDelay: number, keepAlive: number };
		}

		interface NodeRequestOptions extends NodeRequestBaseOptions, MethodOptions {}

		interface Node {
			<T>(url: string, options?: NodeRequestOptions): Promise<T>;

			/**
			 * Send an HTTP GET request using the default transport for the current platform.
			 */
			get<T>(url: string, options?: NodeRequestBaseOptions): Promise<T>;

			/**
			 * Send an HTTP POST request using the default transport for the current platform.
			 */
			post<T>(url: string, options?: NodeRequestBaseOptions): Promise<T>;

			/**
			 * Send an HTTP PUT request using the default transport for the current platform.
			 */
			put<T>(url: string, options?: NodeRequestBaseOptions): Promise<T>;

			/**
			 * Send an HTTP DELETE request using the default transport for the current platform.
			 */
			del<T>(url: string, options?: NodeRequestBaseOptions): Promise<T>;
		}

		/* dojo/request/notify */

		/* TODO: Type in TS 1.8 */
		/* type NotifyType = 'start' | 'send' | 'load' | 'error' | 'done' | 'stop'; */

		interface Notify {
			/**
			 * Register a listener to be notified when an event
			 * in dojo/request happens.
			 */
			(type: string /* NotifyType */, listener: (event: any) => void): Handle;

			emit(type: string, event: any, cancel: boolean): any;
		}

		/* dojo/request/registry */

		interface RegistryOptions extends BaseOptions, MethodOptions { }

		interface RegistryFunction {
			(url: string, options?: RequestOptions): boolean;
		}

		interface Provider<T> {
			(url: string, options?: RequestOptions): Promise<T>;
		}

		type RegisterUrlType = string | RegExp | RegistryFunction;

		interface Registry {
			<T>(url: string, options?: RegistryOptions): Promise<T>;

			register<T>(url: RegisterUrlType, provider: Provider<T>, first?: boolean): Handle;

			load(id: string, parentRequire: Function, loaded: Function): void; /* TODO: Align with loader api */

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

		/* dojo/request/script */

		interface ScriptBaseOptions extends BaseOptions {

			/**
			 * The URL parameter name that indicates the JSONP callback string.
			 * For instance, when using Yahoo JSONP calls it is normally,
			 * jsonp: "callback". For AOL JSONP calls it is normally
			 * jsonp: "c".
			 */
			jsonp?: string;

			/**
			 * A string of JavaScript that when evaluated like so:
			 * "typeof(" + checkString + ") != 'undefined'"
			 * being true means that the script fetched has been loaded.
			 * Do not use this if doing a JSONP type of call (use `jsonp` instead).
			 */
			checkString?: string;

			/**
			 * The Document object of a child iframe. If this is passed in, the script
			 * will be attached to that document. This can be helpful in some comet long-polling
			 * scenarios with Firefox and Opera.
			 */
			frameDoc?: Document;
		}

		interface ScriptOptions extends ScriptBaseOptions, MethodOptions { }

		interface Script {
			/**
			 * Sends a request using a script element with the given URL and options.
			 */
			<T>(url: string, options: ScriptOptions, returnDeferred: boolean): RequestDeferred<T>;
			<T>(url: string, options?: ScriptOptions): Promise<T>;

			/**
			 * Send an HTTP GET request using XMLHttpRequest with the given URL and options.
			 */
			get<T>(url: string, options?: ScriptBaseOptions): Promise<T>;

			_attach(id: string, url: string, frameDoc?: Document): HTMLScriptElement;
			_remove(id: string, frameDoc?: Document, cleanup?: boolean): void;
			_callbacksProperty: string;
		}

		/* dojo/request/util */

		interface Response<T> extends ParsedArgs {
			xhr?: XMLHttpRequest;
			requestOptions?: NodeRequestOptions;
			clientRequest?: any;
			hasSocket?: boolean;
			clientResponse?: any;
			status?: number;
			text?: string;
			data?: T;
		}

		interface RequestDeferred<T> extends Deferred<T> {
			response: Response<T>;
			isValid(response: Response<T>): boolean;
			isReady(response: Response<T>): boolean;
			handleResponse(response: Response<T>): Response<T>;
		}

		interface CommonMethods<O extends BaseOptions> {

			/**
			 * Send an HTTP GET request using XMLHttpRequest with the given URL and options.
			 */
			get<T>(url: string, options?: O): Promise<T>;

			/**
			 * Send an HTTP POST request using XMLHttpRequest with the given URL and options.
			 */
			post<T>(url: string, options?: O): Promise<T>;

			/**
			 * Send an HTTP PUT request using XMLHttpRequest with the given URL and options.
			 */
			put<T>(url: string, options?: O): Promise<T>;

			/**
			 * Send an HTTP DELETE request using XMLHttpRequest with the given URL and options.
			 */
			del<T>(url: string, options?: O): Promise<T>;
		}

		interface ParsedArgs {
			url: string;
			options: RequestOptions;
			getHeader(headerName: string): string;
		}

		interface Util {
			deepCopy<T extends Object, S extends Object>(target: T, source: S): T & S;
			deepCreate<T extends Object, P extends Object>(source: T, properties?: P): T & P;

			deferred<T>(
				response: Response<T>,
				cancel: (def: Deferred<Response<T>>, response: Response<T>) => void,
				isValid: (response: Response<T>) => boolean,
				isReady: (response: Response<T>) => boolean,
				last?: boolean
			): RequestDeferred<Response<T>>;

			addCommonMethods<T extends Object>(provider: T, methods: string[]): T;
			addCommonMethods<T extends Object>(provider: T): T & CommonMethods<BaseOptions>;

			parseArgs(url: string, options: BaseOptions, skipData?: boolean): ParsedArgs;

			checkStatus(): boolean;
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
