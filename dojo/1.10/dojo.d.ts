/// <reference path="index.d.ts" />

declare namespace dojo {

	/* general implied types */

	interface GenericConstructor<T> {
		new (...args: any[]): T;
	}

	interface GenericObject {
		[id: string]: any;
	}

	interface GenericFunction<T> {
		(...args: any[]): T;
	}

	interface Handle {
		remove(): void;
	}

	interface EventListener {
		(evt: any): void;
	}

	/* dojo/AdapterRegistry */

	interface AdapterRegistry {
		/**
		 * register a check function to determine if the wrap function or
		 * object gets selected
		 */
		register(name: string, check: (...args: any[]) => boolean, wrap: Function, directReturn?: boolean, override?: boolean): void;

		/**
		 * Find an adapter for the given arguments. If no suitable adapter
		 * is found, throws an exception. match() accepts any number of
		 * arguments, all of which are passed to all matching functions
		 * from the registered pairs.
		 */
		match(...args: any[]): any;

		/**
		 * Remove a named adapter from the registry
		 */
		unregister(name: string): boolean;
	}

	interface AdapterRegistryConstructor {
		new (returnWrappers?: boolean): AdapterRegistry;
	}

	/* dojo/aspect */

	interface AfterAdvice<T> {
		(result: T, ...args: any[]): T;
	}

	interface AroundAdvice<T> {
		(origFn: GenericFunction<T>): (...args: any[]) => T;
	}

	interface BeforeAdvice {
		(...args: any[]): any[] | void;
	}

	interface Aspect {
		/**
		 * The "before" export of the aspect module is a function that can be used to attach
		 * "before" advice to a method. This function will be executed before the original attach
		 * is executed. This function will be called with the arguments used to call the mattach
		 * This function may optionally return an array as the new arguments to use tattach
		 * the original method (or the previous, next-to-execute before advice, if one exattach
		 * If the before method doesn't return anything (returns undefined) the original argattach
		 * will be presattach
		 * If there are multiple "before" advisors, they are executed in the reverse order they were registered.
		 */
		before<T>(target: GenericObject, methodName: string, advice: BeforeAdvice): Handle;

		/**
		 * The "around" export of the aspect module is a function that can be used to attach
		 * "around" advice to a method. The advisor function is immediately executeattach
		 * the around() is called, is passed a single argument that is a function that attach
		 * called to continue execution of the original method (or the next around advattach
		 * The advisor function should return a function, and this function will be called whattach
		 * the method is called. It will be called with the arguments used to call the mattach
		 * Whatever this function returns will be returned as the result of the method call (unless after advise changes it).
		 */
		around<T>(target: GenericObject, methodName: string, advice: AroundAdvice<T>): Handle;

		/**
		 * The "after" export of the aspect module is a function that can be used to attach
		 * "after" advice to a method. This function will be executed after the original method
		 * is executed. By default the function will be called with a single argument, the return
		 * value of the original method, or the the return value of the last executed advice (if a previous one exists).
		 * The fourth (optional) argument can be set to true to so the function receives the original
		 * arguments (from when the original method was called) rather than the return value.
		 * If there are multiple "after" advisors, they are executed in the order they were registered.
		 */
		after<T>(target: GenericObject, methodName: string, advice: AfterAdvice<T>, receiveArguments?: boolean): Handle;
	}

	/* dojo/back */

	interface BackArgs {
		back?: GenericFunction<void>;
		forward?: GenericFunction<void>;
		changeUrl?: boolean | string;
	}

	interface Back {
		getHash(): string;
		setHash(h: string): void;

		/**
		 * private method. Do not call this directly.
		 */
		goBack(): void;

		/**
		 * private method. Do not call this directly.
		 */
		goForward(): void;

		/**
		 * Initializes the undo stack. This must be called from a <script>
		 * block that lives inside the `<body>` tag to prevent bugs on IE.
		 * Only call this method before the page's DOM is finished loading. Otherwise
		 * it will not work. Be careful with xdomain loading or djConfig.debugAtAllCosts scenarios,
		 * in order for this method to work, dojo/back will need to be part of a build layer.
		 */
		init(): void;

		/**
		 * Sets the state object and back callback for the very first page
		 * that is loaded.
		 * It is recommended that you call this method as part of an event
		 * listener that is registered via dojo/ready.
		 */
		setInitialState(args: BackArgs): void;

		/**
		 * adds a state object (args) to the history list.
		 */
		addToHistory(args: BackArgs): void;

		/**
		 * private method. Do not call this directly.
		 */
		_iframeLoaded(evt: Event, ifrLoc: Location): void;
	}

	/* dojo/behavior */

	interface Behavior {
		_behaviors: { [selector: string]: any };

		/**
		 * Add the specified behavior to the list of behaviors, ignoring existing
		 * matches.
		 */
		add(behaviorObject: { [selector: string]: any }): void;

		/**
		 * Applies all currently registered behaviors to the document.
		 */
		apply(): void;
	}

	/* dojo/cookie */

	interface CookieProps {
		expires?: Date | string | number;
		path?: string;
		domain?: string;
		secure?: boolean;
	}

	interface Cookie {
		/* Get or set a cookie. */
		(name: string, value?: string, props?: CookieProps): string;

		/**
		 * Use to determine if the current browser supports cookies or not.
		 */
		isSupported(): boolean;
	}

	/* dojo/currency */

	interface CurrencyFormatOptions extends NumberFormatOptions {

		/**
		 * Should not be set.  Value is assumed to be "currency".
		 */
		type?: string;

		/**
		 * localized currency symbol. The default will be looked up in table of supported currencies in `dojo.cldr`
		 * A [ISO4217](http://en.wikipedia.org/wiki/ISO_4217) currency code will be used if not found.
		 */
		symbol?: string;

		/**
		 * an [ISO4217](http://en.wikipedia.org/wiki/ISO_4217) currency code, a three letter sequence like "USD".
		 * For use with dojo.currency only.
		 */
		currency?: string;

		/**
		 * number of decimal places to show.  Default is defined based on which currency is used.
		 */
		places?: number;
	}

	interface CurrencyParseOptions extends NumberParseOptions {

		/**
		 * Should not be set.  Value is assumed to be "currency".
		 */
		type?: string;

		/**
		 * localized currency symbol. The default will be looked up in table of supported currencies in `dojo.cldr`
		 * A [ISO4217](http://en.wikipedia.org/wiki/ISO_4217) currency code will be used if not found.
		 */
		symbol?: string;

		/**
		 * an [ISO4217](http://en.wikipedia.org/wiki/ISO_4217) currency code, a three letter sequence like "USD".
		 * For use with dojo.currency only.
		 */
		currency?: string;

		/**
		 * number of decimal places to show.  Default is defined based on which currency is used.
		 */
		places?: number;

		/**
		 * Whether to include the fractional portion, where the number of decimal places are implied by the currency
		 * or explicit 'places' parameter.  The value [true,false] makes the fractional portion optional.
		 * By default for currencies, it the fractional portion is optional.
		 */
		factional?: boolean | [boolean, boolean];
	}

	interface Currency {
		_mixInDefaults(options: NumberFormatOptions): CurrencyFormatOptions;

		/**
		 * Format a Number as a currency, using locale-specific settings
		 */
		format(value: number, options?: CurrencyFormatOptions): string;

		/**
		 * Builds the regular needed to parse a currency value
		 */
		regexp(options?: NumberRegexpOptions): string;

		/**
		 * Convert a properly formatted currency string to a primitive Number,
		 * using locale-specific settings.
		 */
		parse(expression: string, options?: CurrencyParseOptions): number;
	}

	/* dojo/debounce */

	interface Debounce {
		/**
		 * Create a function that will only execute after `wait` milliseconds
		 */
		<T extends Function>(cb: T, wait: number): T;
		<T extends Function>(cb: Function, wait: number, ...args: any[]): T;
	}

	/* dojo/Deferred */

	interface Deferred<T> {

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
		resolve(value: T, strict?: boolean): promise.Promise<T>;

		/**
		 * Reject the deferred.
		 */
		reject(error: any, strict?: boolean): promise.Promise<T>;

		/**
		 * Add new callbacks to the deferred.
		 */
		then<U>(callback?: promise.PromiseCallback<T, U>, errback?: promise.PromiseErrback, progback?: promise.PromiseProgback): promise.Promise<U>;

		/**
		 * Inform the deferred it may cancel its asynchronous operation.
		 */
		cancel(reason: any, strict?: boolean): any;

		/**
		 * Returns `[object Deferred]`.
		 */
		toString(): string;
	}

	interface DeferredConstructor {
		/**
		 * Creates a new deferred. This API is preferred over
		 * `dojo/_base/Deferred`.
		 */
		new <T>(canceller?: (reason: any) => void): Deferred<T>;
	}

	/* dojo/DeferredList */

	interface DeferredList<T> extends Deferred<T[]> {
		/**
		 * Gathers the results of the deferreds for packaging
		 * as the parameters to the Deferred Lists' callback
		 */
		gatherResults<T>(deferredList: DeferredList<any>): DeferredList<T>;
	}

	interface DeferredListConstructor {
		/**
		 * Deprecated, use dojo/promise/all instead.
		 * Provides event handling for a group of Deferred objects.
		 */
		new <T>(list: T[], fireOnOneCallback?: boolean, fireOnOneErrback?: boolean, consumeErrors?: boolean, canceller?: (reason: any) => void): DeferredList<T>;
	}

	/* dojo/dom-form */

	interface DomForm {
		/**
		 * Serialize a form field to a JavaScript object.
		 */
		fieldToObject(inputNode: HTMLElement | string): GenericObject;

		/**
		 * Serialize a form node to a JavaScript object.
		 */
		toObject(fromNode: HTMLFormElement | string): GenericObject;

		/**
		 * Returns a URL-encoded string representing the form passed as either a
		 * node or string ID identifying the form to serialize
		 */
		toQuery(fromNode: HTMLFormElement | string): string;

		/**
		 * Create a serialized JSON string from a form node or string
		 * ID identifying the form to serialize
		 */
		toJson(formNode: HTMLFormElement | string): string;
	}

	/* dojo/Evented */

	interface Evented {
		on(type: string | ExtensionEvent, listener: EventListener): Handle;
		emit(type: string | ExtensionEvent, event: any): boolean;
	}

	/* dojo/has */

	interface HasCache {
		[feature: string]: any;
	}

	interface HasTestFunction {
		/* TypeScript has no way of referring to the global scope see Microsoft/TypeScript#983 */
		(global?: any, doc?: Document, element?: Element): any;
	}

	interface Has {
		/**
		 * Return the current value of the named feature.
		 * @param {string | number} name The name (if a string) or identifier (if an integer) of the feature to test.
		 */
		(name: string | number): any;

		cache: HasCache;

		/**
		 * Register a new feature test for some named feature.
		 */
		add(name: string | number, test: HasTestFunction, now?: boolean, force?: boolean): any;

		/**
		 * Deletes the contents of the element passed to test functions.
		 */
		clearElement(element: HTMLElement): HTMLElement;

		/**
		 * Resolves id into a module id based on possibly-nested tenary expression that branches on has feature test value(s).
		 */
		normalize(id: string, toAbsMid: Function): string; /* TODO: Align with loader api */

		/**
		 * Conditional loading of AMD modules based on a has feature test value.
		 */
		load(id: string, parentRequire: Function, loaded: Function): void; /* TODO: Align with loader api */
	}

	/* dojo/io-query */

	interface IoQuery {
		/**
		 * takes a name/value mapping object and returns a string representing
		 * a URL-encoded version of that object.
		 */
		objectToQuery(map: GenericObject): string;

		/**
		 * Create an object representing a de-serialized query section of a
		 * URL. Query keys with multiple values are returned in an array.
		 */
		queryToObject(str: string): GenericObject;
	}

	/* dojo/number */

	interface NumberFormatOptions {

		/**
		 * override [formatting pattern](http://www.unicode.org/reports/tr35/#Number_Format_Patterns)
		 * with this string.  Default value is based on locale.  Overriding this property will defeat
		 * localization.  Literal characters in patterns are not supported.
		 */
		pattern?: string;

		/**
		 * choose a format type based on the locale from the following:
		 * decimal, scientific (not yet supported), percent, currency. decimal by default.
		 */
		type?: string;

		/**
		 * fixed number of decimal places to show.  This overrides any
		 * information in the provided pattern.
		 */
		places?: number;

		/**
		 * 5 rounds to nearest .5; 0 rounds to nearest whole (default). -1
		 * means do not round.
		 */
		round?: number;

		/**
		 * override the locale used to determine formatting rules
		 */
		locale?: string;

		/**
		 * If false, show no decimal places, overriding places and pattern settings.
		 */
		factional?: boolean;
	}

	interface NumberFormatAbsoluteOptions {
		/**
		 * the decimal separator
		 */
		decimal?: string;

		/**
		 * the group separator
		 */
		group?: string;

		/**
		 * number of decimal places.  the range "n,m" will format to m places.
		 */
		places?: number | string;

		/**
		 * 5 rounds to nearest .5; 0 rounds to nearest whole (default). -1
		 * means don't round.
		 */
		round?: number;
	}

	interface NumberRegexpOptions {

		/**
		 * override [formatting pattern](http://www.unicode.org/reports/tr35/#Number_Format_Patterns)
		 * with this string.  Default value is based on locale.  Overriding this property will defeat
		 * localization.
		 */
		pattern?: string;

		/**
		 * choose a format type based on the locale from the following:
		 * decimal, scientific (not yet supported), percent, currency. decimal by default.
		 */
		type?: string;

		/**
		 * override the locale used to determine formatting rules
		 */
		locacle?: string;

		/**
		 * strict parsing, false by default.  Strict parsing requires input as produced by the format() method.
		 * Non-strict is more permissive, e.g. flexible on white space, omitting thousands separators
		 */
		strict?: boolean;

		/**
		 * number of decimal places to accept: Infinity, a positive number, or
		 * a range "n,m".  Defined by pattern or Infinity if pattern not provided.
		 */
		places?: number | string;
	}

	interface NumberParseOptions {

		/**
		 * override [formatting pattern](http://www.unicode.org/reports/tr35/#Number_Format_Patterns)
		 * with this string.  Default value is based on locale.  Overriding this property will defeat
		 * localization.  Literal characters in patterns are not supported.
		 */
		pattern?: string;

		/**
		 * choose a format type based on the locale from the following:
		 * decimal, scientific (not yet supported), percent, currency. decimal by default.
		 */
		type?: string;

		/**
		 * override the locale used to determine formatting rules
		 */
		locale?: string;

		/**
		 * strict parsing, false by default.  Strict parsing requires input as produced by the format() method.
		 * Non-strict is more permissive, e.g. flexible on white space, omitting thousands separators
		 */
		strict?: boolean;

		/**
		 * Whether to include the fractional portion, where the number of decimal places are implied by pattern
		 * or explicit 'places' parameter.  The value [true,false] makes the fractional portion optional.
		 */
		factional?: boolean | [boolean, boolean];
	}

	interface RealNumberRegexpFlags {

		/**
		 * The integer number of decimal places or a range given as "n,m".  If
		 * not given, the decimal part is optional and the number of places is
		 * unlimited.
		 */
		places?: number;

		/**
		 * A string for the character used as the decimal point.  Default
		 * is ".".
		 */
		decimal?: string;

		/**
		 * Whether decimal places are used.  Can be true, false, or [true,
		 * false].  Default is [true, false] which means optional.
		 */
		factional?: boolean | [boolean, boolean];

		/**
		 * Express in exponential notation.  Can be true, false, or [true,
		 * false]. Default is [true, false], (i.e. will match if the
		 * exponential part is present are not).
		 */
		exponent?: boolean | [boolean, boolean];

		/**
		 * The leading plus-or-minus sign on the exponent.  Can be true,
		 * false, or [true, false].  Default is [true, false], (i.e. will
		 * match if it is signed or unsigned).  flags in regexp.integer can be
		 * applied.
		 */
		eSigned?: boolean | [boolean, boolean];
	}

	interface IntegerRegexpFlags {

		/**
		 * The leading plus-or-minus sign. Can be true, false, or `[true,false]`.
		 * Default is `[true, false]`, (i.e. will match if it is signed
		 * or unsigned).
		 */
		signed?: boolean;

		/**
		 * The character used as the thousands separator. Default is no
		 * separator. For more than one symbol use an array, e.g. `[",", ""]`,
		 * makes ',' optional.
		 */
		separator?: string;

		/**
		 * group size between separators
		 */
		groupSize?: number;

		/**
		 * second grouping, where separators 2..n have a different interval than the first separator (for India)
		 */
		groupSize2?: number;
	}

	interface Number {
		/**
		 * Format a Number as a String, using locale-specific settings
		 */
		format(value: number, options?: NumberFormatOptions): string;

		/**
		 * not precise, but good enough
		 */
		_numberPatternRE: RegExp;

		/**
		 * Apply pattern to format value as a string using options. Gives no
		 * consideration to local customs.
		 */
		_applyPattern(value: number, pattern: string, options?: NumberFormatOptions): string;

		/**
		 * Rounds to the nearest value with the given number of decimal places, away from zero
		 */
		round(value: number, places?: number, increment?: number): number;

		/**
		 * Apply numeric pattern to absolute value using options. Gives no
		 * consideration to local customs.
		 */
		_formatAbsolute(value: number, pattern: string, options?: NumberFormatAbsoluteOptions): string;

		/**
		 * Builds the regular needed to parse a number
		 */
		regexp(options?: NumberRegexpOptions): string;

		_parseInfo(options?: any): { regexp: string, group: string, decimal: string, factor: number };

		/**
		 * Convert a properly formatted string to a primitive Number, using
		 * locale-specific settings.
		 */
		parse(expression: string, options?: NumberParseOptions): number;

		/**
		 * Builds a regular expression to match a real number in exponential
		 * notation
		 */
		_realNumberRegexp(flags: RealNumberRegexpFlags): string;

		/**
		 * Builds a regular expression that matches an integer
		 */
		_integerRegexp(flags: IntegerRegexpFlags): string;
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

	/* dojo/text */

	/**
	 * A getter and setter for storing the string content associated with the
	 * module and url arguments.
	 */
	interface Cache {
		(module: string | GenericObject, url: string, value?: string | { value: string, sanitize?: boolean }): string;
	}

	interface Text {
		/**
		 * the dojo/text caches it's own resources because of dojo.cache
		 */
		dynamic: boolean;

		normalize(id: string, toAbsMid: Function): string; /* TODO: Align with loader api */

		load(id: string, parentRequire: Function, loaded: Function): void; /* TODO: Align with loader api */
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
