declare namespace dojo {
	namespace rpc {

		/* dojo/rpc/JsonpService */

		interface JsonpService<T> extends RpcService<T> {
			strictArgChecks: boolean;

			/**
			 * JSONP bind method. Takes remote method, parameters,
			 * deferred, and a url, calls createRequest to make a JSON-RPC
			 * envelope and passes that off with bind.
			 */
			bind(method: string, parameters: string[], deferredRequestHandler: dojo._base.Deferred<T>, url?: string): void;

			/**
			 * create a JSONP req
			 */
			createRequest(parameters: string[]): string[];
		}

		interface JsonpServiceConstructor {
			new <T>(args: string | RpcServiceArgs, requiredArgs: string[]): JsonpService<T>;
		}

		/* dojo/rpc/JsonService */

		interface JsonService<T> extends RpcService<T> {
			bustCache: boolean;
			contentType: string;
			lastSubmissionId: number;

			/**
			 * call an arbitrary remote method without requiring it to be
			 * predefined with SMD
			 */
			callRemote<U>(method: string, params: string[]): dojo._base.Deferred<U>;

			/**
			 * JSON-RPC bind method. Takes remote method, parameters,
			 * deferred, and a url, calls createRequest to make a JSON-RPC
			 * envelope and passes that off with bind.
			 */
			bind(method: string, parameters: string[], deferredRequestHandler: dojo._base.Deferred<T>, url: string): void;

			/**
			 * create a JSON-RPC envelope for the request
			 */
			createRequest(method: string, params: string[]): string;

			/**
			 * parse the result envelope and pass the results back to
			 * the callback function
			 */
			parseResults(obj: any): T;
		}

		interface JsonServiceConstructor {
			new <T>(args: string | RpcServiceArgs): JsonService<T>;
		}

		/* dojo/rpc/RpcService */

		interface SmdMethod {
			name: string;
			parameters?: string[];
			url?: string;
			serviceUrl?: string;
			serviceURL?: string;
		}

		interface SmdObj {
			methods?: SmdMethod[];
			serviceUrl?: string;
			serviceURL?: string;
			required?: boolean;
		}

		interface RpcServiceArgs {
			smdStr?: string;
			serviceUrl?: string;
			strictArgChecks?: boolean;
			smdObj?: SmdObj;
		}

		interface RpcService<T> {
			strictArgChecks: boolean;
			serviceUrl: string;

			/**
			 * parse the results coming back from an rpc request.  this
			 * base implementation, just returns the full object
			 * subclasses should parse and only return the actual results
			 */
			parseResults(obj: any): T;

			/**
			 * create callback that calls the Deferred errback method
			 */
			errorCallback(deferredRequestHandler: dojo._base.Deferred<T>): (data: any) => void;

			/**
			 * create callback that calls the Deferred's callback method
			 */
			resultCallback(deferredRequestHandler: dojo._base.Deferred<T>): (obj: any) => void;

			/**
			 * generate the local bind methods for the remote object
			 */
			generateMethod(method: string, parameters: string[], url: string): dojo._base.Deferred<T>;

			/**
			 * callback method for receipt of a smd object.  Parse the smd
			 * and generate functions based on the description
			 */
			processSmd(obj: SmdObj): void;
		}

		interface RpcServiceConstructor {
			/**
			 * Take a string as a url to retrieve an smd or an object that is an smd or partial smd to use
			 * as a definition for the service
			 */
			new <T>(args: string | RpcServiceArgs): RpcService<T>;
		}
	}
}
