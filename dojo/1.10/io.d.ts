declare namespace dojo {
	namespace io {
		/* dojo/io/iframe */

		interface IFrameIoArgs extends _base.IoArgs {

			/**
			 * The HTTP method to use. "GET" or "POST" are the only supported
			 * values.  It will try to read the value from the form node's
			 * method, then try this argument. If neither one exists, then it
			 * defaults to POST.
			 */
			method?: string;

			/**
			 * Specifies what format the result data should be given to the
			 * load/handle callback. Valid values are: text, html, xml, json,
			 * javascript. IMPORTANT: For all values EXCEPT html and xml, The
			 * server response should be an HTML file with a textarea element.
			 * The response data should be inside the textarea element. Using an
			 * HTML document the only reliable, cross-browser way this
			 * transport can know when the response has loaded. For the html
			 * handleAs value, just return a normal HTML document.  NOTE: xml
			 * is now supported with this transport (as of 1.1+); a known issue
			 * is if the XML document in question is malformed, Internet Explorer
			 * will throw an uncatchable error.
			 */
			handleAs?: string;

			/**
			 * If "form" is one of the other args properties, then the content
			 * object properties become hidden form form elements. For
			 * instance, a content object of {name1 : "value1"} is converted
			 * to a hidden form element with a name of "name1" and a value of
			 * "value1". If there is not a "form" property, then the content
			 * object is converted into a name=value&name=value string, by
			 * using xhr.objectToQuery().
			 */
			content?: Object;
		}

		interface IFrame {

			/**
			 * Creates a hidden iframe in the page. Used mostly for IO
			 * transports.  You do not need to call this to start a
			 * dojo/io/iframe request. Just call send().
			 */
			create(fname: string, onloadstr: string, uri: string): HTMLIFrameElement;

			/**
			 * Sets the URL that is loaded in an IFrame. The replace parameter
			 * indicates whether location.replace() should be used when
			 * changing the location of the iframe.
			 */
			setSrc(iframe: HTMLIFrameElement, src: string, replace?: boolean): void;

			/**
			 * Returns the document object associated with the iframe DOM Node argument.
			 */
			doc(iframeNode: HTMLIFrameElement): Document;

			/**
			 * Function that sends the request to the server.
			 * This transport can only process one send() request at a time, so if send() is called
			 * multiple times, it will queue up the calls and only process one at a time.
			 */
			send<T>(args: IFrameIoArgs): _base.Deferred<T>;

			_iframeOnload: any;
		}

		/* dojo/io/script */

		interface ScriptIoArgs extends _base.IoArgs {

			/**
			 * Deprecated as of Dojo 1.4 in favor of "jsonp", but still supported for
			 * legacy code. See notes for jsonp property.
			 */
			callbackParamName: string;

			/**
			 * The URL parameter name that indicates the JSONP callback string.
			 * For instance, when using Yahoo JSONP calls it is normally,
			 * jsonp: "callback". For AOL JSONP calls it is normally
			 * jsonp: "c".
			 */
			jsonp: string;

			/**
			 * A string of JavaScript that when evaluated like so:
			 * "typeof(" + checkString + ") != 'undefined'"
			 * being true means that the script fetched has been loaded.
			 * Do not use this if doing a JSONP type of call (use callbackParamName instead).
			 */
			checkString: string;

			/**
			 * The Document object for a child iframe. If this is passed in, the script
			 * will be attached to that document. This can be helpful in some comet long-polling
			 * scenarios with Firefox and Opera.
			 */
			frameDoc: Document;
		}

		interface Script {

			/**
			 * sends a get request using a dynamically created script tag.
			 */
			get<T>(ioArgs: ScriptIoArgs): _base.Deferred<T>;

			/**
			 * creates a new `<script>` tag pointing to the specified URL and
			 * adds it to the document.
			 */
			attach(id: string, url: string, frameDoc?: Document): HTMLScriptElement;

			/**
			 * removes the script element with the given id, from the given frameDocument.
			 * If no frameDocument is passed, the current document is used.
			 */
			remove(id: string, frameDoc?: Document, cleanup?: boolean): void;

			/**
			 * sets up a Deferred object for an IO request.
			 */
			_makeScriptDeferred(args: ScriptIoArgs, cancel?: Function): _base.Deferred<any>;

			/**
			 * canceller function for xhr._ioSetArgs call.
			 */
			_deferredCancel(dfd: _base.Deferred<any>): void;

			/**
			 * okHandler function for xhr._ioSetArgs call.
			 */
			_deferredOk(dfd: _base.Deferred<any>): void;

			/**
			 * errHandler function for xhr._ioSetArgs call.
			 */
			_deferredError(error: Error, dfd: _base.Deferred<any>): Error;

			_deadScripts: any[];
			_counter: number;

			/**
			 * sets up an entry in the deadScripts array.
			 */
			_addDeadScript(ioArgs: ScriptIoArgs): void;

			/**
			 * inflight check function to see if dfd is still valid.
			 */
			_validCheck(dfd: _base.Deferred<any>): boolean;

			/**
			 * inflight check function to see if IO finished.
			 */
			_ioCheck(dfd: _base.Deferred<any>): boolean;

			/**
			 * inflight function to handle a completed response.
			 */
			_resHandle(dfd: _base.Deferred<any>): void;

			/**
			 * A method that can be overridden by other modules
			 * to control when the script attachment occurs.
			 */
			_canAttach(ioArgs: ScriptIoArgs): boolean;

			/**
			 * generic handler for jsonp callback. A pointer to this function
			 * is used for all jsonp callbacks.  NOTE: the "this" in this
			 * function will be the Deferred object that represents the script
			 * request.
			 */
			_jsonpCallback(json: Object): void;
		}
	}
}
