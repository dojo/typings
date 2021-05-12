
declare namespace dojox {
	/**
	 * The DojoX RPC Project is an enhanced version of dojo.rpc, and will replace it in 2.0. RPC, or remote procedure
	 * call, is a system for communicating with a backend using a variety of flexible transports, all wrapped around a
	 * single class called a Service
	 * @see https://dojotoolkit.org/reference-guide/1.10/dojox/rpc.html#dojox-rpc
	 */
	namespace rpc {
		/**
		 * dojox.rpc.Service is the foundation of most RPC transportation. To use a Service, you need an SMD. Defining
		 * the SMD is a separate discussion, so for now we’ll reuse some pre-defined SMD’s available in the RPC project’s
		 * SMDLibrary/ folder.
		 *
		 * There are several transports/envelopes that are defined in separate modules to minimize the size of
		 * dojox.rpc.Service. These must also be loaded if they are used by the SMD:
		 *
		 *          JSONP Transport requires dojo.io.script
		 *          REST transport requires dojox.rpc.Rest
		 *          JSON-RPC-2.0 and JSON-RPC-1.0 envelopes require dojox.rpc.JsonRPC
		 *
		 *          All of the provided SMDLibrary SMD’s are based on JSONP, and consequently require dojo.io.script.
		 *          If you define your own SMD with a local target endpoint, dojo.io.script is not needed.
		 */
		class Service {

			/**
			 * The google.smd file is located in a fixed location, available from dojo.moduleUrl calculations.
			 *
			 * Additionally, in 1.2 you are able to take advantage of scriptFrame transport, which will divert all
			 * traffic through a hidden iframe, preventing other io.script processes from being ‘blocked’ while they wait
			 * on response data. Simply provide a frameDoc attribute and passed as an optional parameter to the constructor:
			 * An iframe will be created if one cannot be found.
			 *
			 * If the argument passed to new Service() is an object, it is assumed to be the direct service definition.
			 * Or if it is a string, it will be treated as a URL, and the above code will be run for you.
			 *
			 * Service, like io.script, works around Dojo’s built in Deferred system, providing asynchronous communication
			 * around a familiar API. Once we’ve created our Service from an SMD, the methods defined in the SMD are
			 * available through the return handle provided.
			 * @example
			 * var goog = new dojox.rpc.Service(dojo.moduleUrl("dojox.rpc", "SMDLibrary/google.smd"));
			 * @example
			 * var goog = null;
			 * dojo.xhrGet({
			 *    url: dojo.moduleUrl("dojox.rpc", "SMDLibrary/google.smd"),
			 *    handleAs: "json",
			 *    load: function(data){
			 *        goog = new dojox.rpc.Service(data);
			 *    }
			 * });
			 * @example
			 * // assuming your dojox/ is in js/
			 * var goog = new dojox.rpc.Service("js/dojox/rpc/SMDLibrary/google.smd");
			 * @example
			 * dojo.require("dojox.io.scriptFrame");
			 * dojo.require("dojox.rpc.Service");
			 * var goog = new dojox.rpc.Service("js/dojox/rpc/SMDLibrary/google.smd", {
			 *     frameDoc:"someIframeID"
			 * });
			 * @example
			 * var goog = new dojox.rpc.Service(dojo.moduleUrl("dojox.rpc.SMDLibrary", "google.smd"));
			 * goog.webSearch({ q:"Dojo Toolkit" }).then(
			 *     function(data){
			 *        // in this particular RPC call, the results you seek are:
			 *        console.log(data.responseData.results);
			 *     },
			 *     function(err){
			 *        // an error occurred. timeout, bad data, etc.
			 *     }
			 * );
			 * @param smd
			 * @param options
			 * @see https://dojotoolkit.org/reference-guide/1.10/dojox/rpc/Service.html#dojox-rpc-service
			 */
			constructor(smd: string | object, options: any);

			// Internal method we are overriding
			protected _generateService(serviceName: string, method: object): () => dojo.Deferred<any>;

			// Internal method
			protected _getRequest(method: object, args: any): dojo.Deferred<any>;

			// Internal method
			protected _executeMethod(method: object): dojo.Deferred<any>;
		}

		// we did not test the ServiceConstructor yet
		interface ServiceConstructor extends dijit._WidgetBaseConstructor<Service> {
		}
	}
}
