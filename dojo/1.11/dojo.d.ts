/// <reference path="index.d.ts" />
/// <reference path="../../doh/1.11/doh.d.ts" />

declare namespace dojo {
	/* general implied types */

	type NodeOrString = Node | string;
	type ElementOrString = Element | string;
	type NodeFragmentOrString = NodeOrString | DocumentFragment;

	interface GenericConstructor<T> {
		new (...args: any[]): T;
		prototype: T;
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

	interface BuildProfile {
		resourceTags: { [tag: string]: (filename: string, mid?: string) => boolean; };
	}

	interface Package {
		location?: string;
		main?: string;
		name?: string;
	}

	export interface ModuleMap extends ModuleMapItem {
		[ sourceMid: string ]: ModuleMapReplacement;
	}

	export interface ModuleMapItem {
		[ mid: string ]: /* ModuleMapReplacement | ModuleMap */ any;
	}

	export interface ModuleMapReplacement extends ModuleMapItem {
		[ findMid: string ]: /* replaceMid */ string;
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
		prototype: AdapterRegistry;
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
		before<T>(target: GenericObject, methodName: string, advice: BeforeAdvice | Function): Handle;

		/**
		 * The "around" export of the aspect module is a function that can be used to attach
		 * "around" advice to a method. The advisor function is immediately executeattach
		 * the around() is called, is passed a single argument that is a function that attach
		 * called to continue execution of the original method (or the next around advattach
		 * The advisor function should return a function, and this function will be called whattach
		 * the method is called. It will be called with the arguments used to call the mattach
		 * Whatever this function returns will be returned as the result of the method call (unless after advise changes it).
		 */
		around<T>(target: GenericObject, methodName: string, advice: AroundAdvice<T> | Function): Handle;

		/**
		 * The "after" export of the aspect module is a function that can be used to attach
		 * "after" advice to a method. This function will be executed after the original method
		 * is executed. By default the function will be called with a single argument, the return
		 * value of the original method, or the the return value of the last executed advice (if a previous one exists).
		 * The fourth (optional) argument can be set to true to so the function receives the original
		 * arguments (from when the original method was called) rather than the return value.
		 * If there are multiple "after" advisors, they are executed in the order they were registered.
		 */
		after<T>(target: GenericObject, methodName: string, advice: AfterAdvice<T> | Function, receiveArguments?: boolean): Handle;
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
		fractional?: boolean | [boolean, boolean];
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
		resolve(value?: T, strict?: boolean): promise.Promise<T>;

		/**
		 * Reject the deferred.
		 */
		reject(error?: any, strict?: boolean): promise.Promise<T>;

		/**
		 * Add new callbacks to the deferred.
		 */
		then<U>(callback?: promise.PromiseCallback<T, U>, errback?: promise.PromiseErrback<U>, progback?: promise.PromiseProgback): promise.Promise<U>;

		/**
		 * Inform the deferred it may cancel its asynchronous operation.
		 */
		cancel(reason?: any, strict?: boolean): any;

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
		prototype: Deferred<any>;
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
		prototype: DeferredList<any>;
	}

	/* dojo/dojo */

	interface RequireTrace {
		(group: string, args: any[]): void;
		on: boolean | number;
		group: GenericObject;
		set(group: string | GenericObject, value: any): void;
	}

	interface Require {
		(config: GenericObject, dependencies: string[], callback?: GenericFunction<void>): Require;
		(dependencies: string[], callback: GenericFunction<void>): Require;
		async: number| boolean;
		has: dojo.Has;
		isXdurl(url: string): boolean;
		initSyncLoader(dojoRequirePlugin: any, checkDojoRequirePlugin: any, transformToAmd: any): GenericObject;
		getXhr(): XMLHttpRequest | ActiveXObject;
		getText(url: string, async?: boolean, onLoad?: (responseText: string, async?: boolean) => void): string;
		eval(text: string, hint?: string): any;
		signal(type: string, args: any[]): void;
		on(type: string, listener: (...args: any[]) => void): Handle;
		map: { [id: string]: any };
		waitms?: number;
		legacyMode: boolean;
		rawConfig: dojo._base.Config;
		baseUrl: string;
		combo?: {
			add: () => void;
			done(callback: (mids: string[], url?: string) => void, req: Require): void;
			plugins?: GenericObject;
		};
		idle(): boolean;
		toAbsMid(mid: string, referenceModule?: string): string;
		toUrl(name: string, referenceModule?: string): string;
		undef(moduleId: string, referenceModule?: string): void;
		pageLoaded: number | boolean;
		injectUrl(url: string, callback?: () => void, owner?: HTMLScriptElement): HTMLScriptElement;
		log(...args: any[]): void;
		trace: RequireTrace;
		boot?: [string[], Function] | number;
	}

	interface Define {
		(mid: string, dependencies?: string[], factory?: any): void;
		(dependencies: string[], factory?: any): void;
		amd: string;
	}

	/* dojo/dom */

	interface Dom {
		/**
		 * Returns DOM node with matching `id` attribute or falsy value (ex: null or undefined)
		 * if not found. Internally if `id` is not a string then `id` returned.
		 */
		byId<E extends Element>(id: string | E, doc?: Document): E;

		/**
		 * Returns true if node is a descendant of ancestor
		 */
		isDescendant(node: NodeOrString, ancestor: NodeOrString): boolean;

		/**
		 * Enable or disable selection on a node
		 */
		setSelectable(node: ElementOrString, selectable?: boolean): void;
	}

	/* dojo/dom-attr */

	interface DomAttr {
		/**
		 * Returns true if the requested attribute is specified on the
		 * given element, and false otherwise.
		 */
		has(node: NodeOrString, name: string): boolean;

		/**
		 * Gets an attribute on an HTML element.
		 * Because sometimes this uses node.getAttribute, it should be a string,
		 * but it can also get any other attribute on a node, therefore it is unsafe
		 * to type just a string.
		 */
		get(node: ElementOrString, name: string): any;

		/**
		 * Sets an attribute on an HTML element.
		 */
		set(node: ElementOrString, name: string, value: any): Element;
		set(node: ElementOrString, map: GenericObject): Element;

		/**
		 * Removes an attribute from an HTML element.
		 */
		remove(node: NodeOrString, name: string): void;

		/**
		 * Returns an effective value of a property or an attribute.
		 */
		getNodeProp(node: NodeOrString, name: string): any;
	}

	/* dojo/dom-class */

	interface DomClass {

		/**
		 * Returns whether or not the specified classes are a portion of the
		 * class list currently applied to the node.
		 */
		contains(node: NodeOrString, classStr: string): boolean;

		/**
		 * Adds the specified classes to the end of the class list on the
		 * passed node. Will not re-apply duplicate classes.
		 */
		add(node: NodeOrString, classStr: string | string[]): void;

		/**
		 * Removes the specified classes from node. No `contains()`
		 * check is required.
		 */
		remove(node: NodeOrString, classStr?: string | string[]): void;

		/**
		 * Replaces one or more classes on a node if not present.
		 * Operates more quickly than calling dojo.removeClass and dojo.addClass
		 */
		replace(node: NodeOrString, addClassStr: string | string[], removeClassStr?: string | string[]): void;

		/**
		 * Adds a class to node if not present, or removes if present.
		 * Pass a boolean condition if you want to explicitly add or remove.
		 * Returns the condition that was specified directly or indirectly.
		 */
		toggle(node: NodeOrString, classStr: string | string[], condition?: boolean): boolean;
	}

	/* dojo/dom-construct */

	/* TODO implement for TS 1.8 */
	/* type PosString = 'first' | 'after' | 'before' | 'last' | 'replace' | 'only'; */

	interface DomConstruct {

		/**
		 * instantiates an HTML fragment returning the corresponding DOM.
		 */
		toDom(frag: string, doc?: Document): DocumentFragment | Node;

		/**
		 * Attempt to insert node into the DOM, choosing from various positioning options.
		 * Returns the first argument resolved to a DOM node.
		 */
		place(node: NodeFragmentOrString, refNode: NodeOrString, position?: string /* PosString */ | number): HTMLElement;

		/**
		 * Create an element, allowing for optional attribute decoration
		 * and placement.
		 */
		create(tag: NodeOrString, attrs?: GenericObject, refNode?: NodeOrString, pos?: string /* PosString */ | number): HTMLElement;

		/**
		 * safely removes all children of the node.
		 */
		empty(node: NodeOrString): void;

		/**
		 * Removes a node from its parent, clobbering it and all of its
		 * children.
		 */
		destroy(node: NodeOrString): void;
	}

	/* dojo/dom-form */

	interface DomForm {
		/**
		 * Serialize a form field to a JavaScript object.
		 */
		fieldToObject(inputNode: NodeOrString): GenericObject;

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
		toJson(formNode: HTMLFormElement | string, prettyPrint?: boolean): string;
	}

	/* dojo/dom-geometry */

	interface DomGeometryWidthHeight {
		w?: number;
		h?: number;
	}

	interface DomGeometryBox extends DomGeometryWidthHeight {
		l?: number;
		t?: number;
	}

	interface DomGeometryBoxExtents extends DomGeometryBox {
		r?: number;
		b?: number;
	}

	interface Point {
		x: number;
		y: number;
	}

	interface DomGeometryXYBox extends DomGeometryWidthHeight, Point {
	}

	interface DomGeometry {
		boxModel: string; /* TODO: string literal 'border-box' | 'content-box' */

		/**
		 * Returns object with special values specifically useful for node
		 * fitting.
		 */
		getPadExtents(node: Element, computedStyle?: DomComputedStyle): DomGeometryBoxExtents;

		/**
		 * returns an object with properties useful for noting the border
		 * dimensions.
		 */
		getBorderExtents(node: Element, computedStyle?: DomComputedStyle): DomGeometryBoxExtents;

		/**
		 * Returns object with properties useful for box fitting with
		 * regards to padding.
		 */
		getPadBorderExtents(node: Element, computedStyle?: DomComputedStyle): DomGeometryBoxExtents;

		/**
		 * returns object with properties useful for box fitting with
		 * regards to box margins (i.e., the outer-box).
		 * - l/t = marginLeft, marginTop, respectively
		 * - w = total width, margin inclusive
		 * - h = total height, margin inclusive
		 * The w/h are used for calculating boxes.
		 * Normally application code will not need to invoke this
		 * directly, and will use the ...box... functions instead.
		 */
		getMarginExtents(node: Element, computedStyle?: DomComputedStyle): DomGeometryBoxExtents;

		/**
		 * returns an object that encodes the width, height, left and top
		 * positions of the node's margin box.
		 */
		getMarginBox(node: Element, computedStyle?: DomComputedStyle): DomGeometryBox;

		/**
		 * Returns an object that encodes the width, height, left and top
		 * positions of the node's content box, irrespective of the
		 * current box model.
		 */
		getContentBox(node: Element, computedStyle?: DomComputedStyle): DomGeometryBox;

		/**
		 * Sets the size of the node's contents, irrespective of margins,
		 * padding, or borders.
		 */
		setContentSize(node: Element, box: DomGeometryWidthHeight, computedStyle?: DomComputedStyle): void;

		/**
		 * sets the size of the node's margin box and placement
		 * (left/top), irrespective of box model. Think of it as a
		 * passthrough to setBox that handles box-model vagaries for
		 * you.
		 */
		setMarginBox(node: Element, box: DomGeometryBox, computedStyle?: DomComputedStyle): void;

		/**
		 * Returns true if the current language is left-to-right, and false otherwise.
		 */
		isBodyLtr(doc?: Document): boolean;

		/**
		 * Returns an object with {node, x, y} with corresponding offsets.
		 */
		docScroll(doc?: Document): Point;

		/**
		 * Deprecated method previously used for IE6-IE7.  Now, just returns `{x:0, y:0}`.
		 */
		getIeDocumentElementOffset(doc: Document): Point;

		/**
		 * In RTL direction, scrollLeft should be a negative value, but IE
		 * returns a positive one. All codes using documentElement.scrollLeft
		 * must call this function to fix this error, otherwise the position
		 * will offset to right when there is a horizontal scrollbar.
		 */
		fixIeBiDiScrollLeft(scrollLeft: number, doc?: Document): number;

		/**
		 * Gets the position and size of the passed element relative to
		 * the viewport (if includeScroll==false), or relative to the
		 * document root (if includeScroll==true).
		 */
		position(node: Element, includeScroll?: boolean): DomGeometryXYBox;

		/**
		 * returns an object that encodes the width and height of
		 * the node's margin box
		 */
		getMarginSize(node: Element, computedStyle?: DomComputedStyle): DomGeometryWidthHeight;

		/**
		 * Normalizes the geometry of a DOM event, normalizing the pageX, pageY,
		 * offsetX, offsetY, layerX, and layerX properties
		 */
		normalizeEvent(event: Event): void;
	}

	/* dojo/dom-prop */

	interface DomProp {
		/**
		 * Gets a property on an HTML element.
		 */
		get(node: ElementOrString, name: string): any;

		/**
		 * Sets a property on an HTML element.
		 */
		set(node: ElementOrString, name: string | GenericObject, value?: any): Element;
	}

	/* dojo/dom-style */

	// TODO move over the most common properties from CSSStyleDeclaration
	interface DomComputedStyle {
		position?: string;
		width?: string;
		height?: string;
		[id: string]: any;
	}

	interface DomStyle {
		/**
		 * Returns a "computed style" object.
		 */
		getComputedStyle(node: Node): DomComputedStyle;

		/**
		 * Accesses styles on a node.
		 */
		get(node: ElementOrString): DomComputedStyle;
		get(node: ElementOrString, name: string): string | number;

		/**
		 * Sets styles on a node.
		 */
		set(node: ElementOrString, name: DomComputedStyle): DomComputedStyle;
		set(node: ElementOrString, name: string, value: string | number): DomComputedStyle;

		/**
		 * converts style value to pixels on IE or return a numeric value.
		 */
		toPixelValue(element: Element, value: string): number;
	}

	/* dojo/domReady */

	interface DomReady {
		/**
		 * Plugin to delay require()/define() callback from firing until the DOM has finished
		 */
		(callback: Function): void;

		load(id: string, parentRequire: Function, loaded: Function): void; /* TODO: Align with loader api */
		_Q: Function[];
		_onEmpty(): void;
	}

	/* dojo/Evented */

	interface Evented {
		on(type: string | ExtensionEvent, listener: EventListener | Function): Handle;
		emit(type: string | ExtensionEvent, ...events: any[]): boolean;
	}

	interface EventedConstructor extends _base.DeclareConstructor<Evented> {
		new (params?: Object): Evented;
	}

	/* dojo/fx */

	/* dojo/fx augments the dojo/_base/fx, therefore it is typed in fx.d.ts and not referenced from
	  index.d.ts or module.d.ts and is self contained typings for dojo/fx and dojo/fx/* */

	/* dojo/gears */

	/* This is long-ago deprecated by Google, so just doing a minimal typing */

	interface Gears {
		_gearsObject(): any;
		available: boolean;
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
		(name: 'host-browser'): boolean;
		(name: 'host-node'): any;
		(name: 'host-rhino'): boolean;
		(name: 'dom'): boolean;
		(name: 'dojo-dom-ready-api'): 1;
		(name: 'dojo-sniff'): 1;
		// if host-browser is true
		(name: 'dom-addeventlistener'): void | boolean;
		(name: 'touch'): void | boolean;
		(name: 'touch-events'): void | boolean;
		(name: 'pointer-events'): void | boolean;
		(name: 'MSPointer'): void | boolean;
		(name: 'device-width'): void | number;
		(name: 'dom-attributes-explicit'): void | boolean;
		(name: 'dom-attributes-specified-flag'): void | boolean;
		// dojo/_base/browser
		(name: 'config-selectorEngine'): string;

		cache: HasCache;

		/**
		 * Register a new feature test for some named feature.
		 */
		add(name: string | number, test: HasTestFunction, now?: boolean, force?: boolean): any;
		add<T extends (Object | string | number | boolean | null | void)>(name: string | number, test: T, now?: boolean, force?: boolean): any;

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

	/* dojo/hash */

	interface Hash {
		(hash?: string, replace?: boolean): string;
	}

	/* dojo/hccss */

	/* this only does has.add and re-exports the has interface */
	interface Has {
		(name: 'highcontrast'): void | boolean;
	}

	/* dojo/html */

	type ContentSetterContent = string | Node | ArrayLike<Node>;

	interface ContentSetterParams {
		node?: NodeOrString;
		content?: ContentSetterContent;
		id?: string;
		cleanContent?: boolean;
		extractContent?: boolean;
		parseContent?: boolean;
		parserScope?: boolean;
		startup?: boolean;
		onBegin?: Function;
		onEnd?: Function;
		tearDown?: Function;
		onContentError?: Function;
		onExecError?: Function;
	}

	interface ContentSetter {

		/**
		 * An node which will be the parent element that we set content into
		 */
		node: NodeOrString;

		/**
		 * The content to be placed in the node. Can be an HTML string, a node reference, or a enumerable list of nodes
		 */
		content: ContentSetterContent;

		/**
		 * Usually only used internally, and auto-generated with each instance
		 */
		id: string;

		/**
		 * Should the content be treated as a full html document,
		 * and the real content stripped of <html>, <body> wrapper before injection
		 */
		cleanContent: boolean;

		/**
		 * Should the content be treated as a full html document,
		 * and the real content stripped of `<html> <body>` wrapper before injection
		 */
		extractContent: boolean;

		/**
		 * Should the node by passed to the parser after the new content is set
		 */
		parseContent: boolean;

		/**
		 * Flag passed to parser.	Root for attribute names to search for.	  If scopeName is dojo,
		 * will search for data-dojo-type (or dojoType).  For backwards compatibility
		 * reasons defaults to dojo._scopeName (which is "dojo" except when
		 * multi-version support is used, when it will be something like dojo16, dojo20, etc.)
		 */
		parserScope: string;

		/**
		 * Start the child widgets after parsing them.	  Only obeyed if parseContent is true.
		 */
		startup: boolean;

		/**
		 * front-end to the set-content sequence
		 */
		set(cont?: ContentSetterContent, params?: ContentSetterParams): promise.Promise<Node> | Node;

		/**
		 * sets the content on the node
		 */
		setContent(): void;

		/**
		 * cleanly empty out existing content
		 */
		empty(): void;

		/**
		 * Called after instantiation, but before set();
		 * It allows modification of any of the object properties -
		 * including the node and content provided - before the set operation actually takes place
		 */
		onBegin(): Node;

		/**
		 * Called after set(), when the new content has been pushed into the node
		 * It provides an opportunity for post-processing before handing back the node to the caller
		 * This default implementation checks a parseContent flag to optionally run the dojo parser over the new content
		 */
		onEnd(): Node;

		/**
		 * manually reset the Setter instance if its being re-used for example for another set()
		 */
		tearDown(): void;

		onContentError(): string;
		onExecError(): string;
		_mixin(params: ContentSetterParams): void;
		parseDeferred: Deferred<any[]>;

		/**
		 * runs the dojo parser over the node contents, storing any results in this.parseResults
		 */
		_parse(): void;

		/**
		 * shows user the string that is returned by on[type]Error
		 * override/implement on[type]Error and return your own string to customize
		 */
		_onError(type: string, err: Error, consoleText?: string): void;
	}

	interface ContentSetterConstructor extends _base.DeclareConstructor<ContentSetter> {
		new (params?: ContentSetterParams, node?: NodeOrString): ContentSetter;
	}

	interface Html {
		/**
		 * removes !DOCTYPE and title elements from the html string.
		 *
		 * khtml is picky about dom faults, you can't attach a style or `<title>` node as child of body
		 * must go into head, so we need to cut out those tags
		 */
		_secureForInnerHtml(cont: string): string;

		/**
		 * Deprecated, should use dojo/dom-constuct.empty() directly, remove in 2.0.
		 */
		_emptyNode(node: NodeOrString): void;

		/**
		 * inserts the given content into the given node
		 */
		_setNodeContent<T extends Node>(node: Node, cont: string | Node | ArrayLike<T>): Node;

		_ContentSetter: ContentSetterConstructor;

		/**
		 * inserts (replaces) the given content into the given node. dojo/dom-construct.place(cont, node, "only")
		 * may be a better choice for simple HTML insertion.
		 */
		set(node: Node, cont?: ContentSetterContent, params?: ContentSetterParams): promise.Promise<Node> | Node;
	}

	/* dojo/i18n */

	interface I18n {
		getLocalization(moduleName: string, bundleName: string, locale?: string): any;

		dynamic: boolean;

		/**
		 * Resolves id into a module id based on possibly-nested tenary expression that branches on has feature test value(s).
		 */
		normalize(id: string, toAbsMid: Function): string; /* TODO: Align with loader api */

		normalizeLocale(locale?: string): string;

		/**
		 * Conditional loading of AMD modules based on a has feature test value.
		 */
		load(id: string, parentRequire: Function, loaded: Function): void; /* TODO: Align with loader api */

		cache: { [bundle: string]: any };

		getL10nName(moduleName: string, bundleName: string, locale?: string): string;
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

	/* dojo/json */

	interface Json {

		/**
		 * Parses a [JSON](http://json.org) string to return a JavaScript object.
		 */
		parse(str: string, strict?: boolean): any;

		/**
		 * Returns a [JSON](http://json.org) serialization of an object.
		 */
		stringify(value: any, replacer?: (key: string, value: any) => any| any[], space?: string | number): string;
	}

	/* dojo/keys */

	interface Keys {
		BACKSPACE: number;
		TAB: number;
		CLEAR: number;
		ENTER: number;
		SHIFT: number;
		CTRL: number;
		ALT: number;
		META: number;
		PAUSE: number;
		CAPS_LOCK: number;
		ESCAPE: number;
		SPACE: number;
		PAGE_UP: number;
		PAGE_DOWN: number;
		END: number;
		HOME: number;
		LEFT_ARROW: number;
		UP_ARROW: number;
		RIGHT_ARROW: number;
		DOWN_ARROW: number;
		INSERT: number;
		DELETE: number;
		HELP: number;
		LEFT_WINDOW: number;
		RIGHT_WINDOW: number;
		SELECT: number;
		NUMPAD_0: number;
		NUMPAD_1: number;
		NUMPAD_2: number;
		NUMPAD_3: number;
		NUMPAD_4: number;
		NUMPAD_5: number;
		NUMPAD_6: number;
		NUMPAD_7: number;
		NUMPAD_8: number;
		NUMPAD_9: number;
		NUMPAD_MULTIPLY: number;
		NUMPAD_PLUS: number;
		NUMPAD_ENTER: number;
		NUMPAD_MINUS: number;
		NUMPAD_PERIOD: number;
		NUMPAD_DIVIDE: number;
		F1: number;
		F2: number;
		F3: number;
		F4: number;
		F5: number;
		F6: number;
		F7: number;
		F8: number;
		F9: number;
		F10: number;
		F11: number;
		F12: number;
		F13: number;
		F14: number;
		F15: number;
		NUM_LOCK: number;
		SCROLL_LOCK: number;
		UP_DPAD: number;
		DOWN_DPAD: number;
		LEFT_DPAD: number;
		RIGHT_DPAD: number;
		copyKey: number;
	}

	/* dojo/loadInit */

	interface LoadInit {
		dynamic: number;

		/**
		 * Resolves id into a module id based on possibly-nested tenary expression that branches on has feature test value(s).
		 */
		normalize(id: string, toAbsMid: Function): string; /* TODO: Align with loader api */

		/**
		 * Conditional loading of AMD modules based on a has feature test value.
		 */
		load(id: string, parentRequire: Function, loaded: Function): void; /* TODO: Align with loader api */
	}

	/* dojo/mouse */

	interface Mouse {
		_eventHandler(type: string, selectHandler?: (evt: MouseEvent, listener: EventListener) => void): MouseEvent;

		/**
		 * This is an extension event for the mouseenter that IE provides, emulating the
		 * behavior on other browsers.
		 */
		enter: MouseEvent;

		/**
		 * This is an extension event for the mouseleave that IE provides, emulating the
		 * behavior on other browsers.
		 */
		leave: MouseEvent;

		/**
		 * This is an extension event for the mousewheel that non-Mozilla browsers provide,
		 * emulating the behavior on Mozilla based browsers.
		 */
		wheel: string | ExtensionEvent;

		/**
		 * Test an event object (from a mousedown event) to see if the left button was pressed.
		 */
		isLeft(e: MouseEvent): boolean;

		/**
		 * Test an event object (from a mousedown event) to see if the middle button was pressed.
		 */
		isMiddle(e: MouseEvent): boolean;

		/**
		 * Test an event object (from a mousedown event) to see if the right button was pressed.
		 */
		isRight(e: MouseEvent): boolean;
	}

	/* dojo/node */

	/* should only be used for re-exporting CommonJS modules */

	/* dojo/NodeList */

	/* Just proxies dojo/query::NodeList */

	/* dojo/NodeList-* are included as seperate .d.ts files */

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
		fractional?: boolean | [ boolean, boolean ];
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
		fractional?: boolean | [boolean, boolean];
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
		fractional?: boolean | [boolean, boolean];

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
		(target: Element | GenericObject, listener: EventListener): Handle;
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
		(target: Element | GenericObject, type: string | ExtensionEvent, listener: EventListener | Function, dontFix?: boolean): Handle;

		/**
		 * This function acts the same as on(), but with pausable functionality. The
		 * returned signal object has pause() and resume() functions. Calling the
		 * pause() method will cause the listener to not be called for future events.
		 */
		pausable(target: Element | GenericObject, type: string | ExtensionEvent, listener: EventListener | Function, dontFix?: boolean): PauseHandle;

		/**
		 * This function acts the same as on(), but will only call the listener once. The
		 * listener will be called for the first
		 * event that takes place and then listener will automatically be removed.
		 */
		once(target: Element | GenericObject, type: string | ExtensionEvent, listener: EventListener | Function, dontFix?: boolean): Handle;

		parse(target: Element | GenericObject, type: string | ExtensionEvent, listener: EventListener | Function, dontFix: boolean, matchesTarget: Element | GenericObject): Handle;

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
		emit(target: Element | GenericObject, type: string | ExtensionEvent, event?: any): boolean;

		/**
		 * normalizes properties on the event object including event
		 * bubbling methods, keystroke normalization, and x/y positions
		 */
		_fixEvent(evt: any, sender: any): any;
	}

	/* dojo/parser */

	interface ParserOptions { }

	interface ParserObjects {
		ctor?: GenericConstructor<any>;
		types?: string[];
		node: Node;
		scripts?: HTMLScriptElement[];
		inherited?: { [prop: string]: any; };
	}

	interface InstancesArray extends Array<any>, promise.Promise<any> {}

	interface Parser {
		/**
		 * Clear cached data.   Used mainly for benchmarking.
		 */
		_clearCache(): void;

		/**
		 * Convert a `<script type="dojo/method" args="a, b, c"> ... </script>`
		 * into a function
		 */
		_functionFromScript(node: HTMLScriptElement, attrData: string): Function;

		/**
		 * Takes array of nodes, and turns them into class instances and
		 * potentially calls a startup method to allow them to connect with
		 * any children.
		 */
		instantiate(nodes: Node[], mixin?: Object, options?: ParserOptions): any[];

		/**
		 * Takes array of objects representing nodes, and turns them into class instances and
		 * potentially calls a startup method to allow them to connect with
		 * any children.
		 */
		_instantiate(nodes: ParserObjects[], mixin?: Object, options?: ParserOptions, returnPromise?: boolean): any[] | promise.Promise<any[]>;

		/**
		 * Calls new ctor(params, node), where params is the hash of parameters specified on the node,
		 * excluding data-dojo-type and data-dojo-mixins.   Does not call startup().
		 */
		construct<T>(
			ctor: GenericConstructor<T>,
			node: Node, mixin?: Object,
			options?: ParserOptions,
			scripts?: HTMLScriptElement[],
			inherited?: { [prop: string]: any; }
		): promise.Promise<T> | T;

		/**
		 * Scan a DOM tree and return an array of objects representing the DOMNodes
		 * that need to be turned into widgets.
		 */
		scan(root?: Node, options?: ParserOptions): promise.Promise<ParserObjects[]>;

		/**
		 * Helper for _scanAMD().  Takes a `<script type=dojo/require>bar: "acme/bar", ...</script>` node,
		 * calls require() to load the specified modules and (asynchronously) assign them to the specified global
		 * variables, and returns a Promise for when that operation completes.
		 *
		 * In the example above, it is effectively doing a require(["acme/bar", ...], function(a){ bar = a; }).
		 */
		_require(script: HTMLScriptElement, options: ParserOptions): promise.Promise<any>;

		/**
		 * Scans the DOM for any declarative requires and returns their values.
		 */
		_scanAmd(root?: Node, options?: ParserOptions): promise.Promise<boolean>;

		/**
		 * Scan the DOM for class instances, and instantiate them.
		 */
		parse(rootNode?: Node, options?: ParserOptions): InstancesArray;
	}

	/* dojo/query */

	interface NodeListFilterCallback<T extends Node> {
		(item: T, idx: number, nodeList: this): boolean;
	}

	type NodeListFilter<T extends Node> = string | NodeListFilterCallback<T>;

	interface NodeList<T extends Node> extends ArrayLike<T> {
		/**
		 * decorate an array to make it look like a `dojo/NodeList`.
		 */
		_wrap<U extends Node, V extends Node>(a: U[], parent?: NodeList<V>, NodeListCtor?: NodeListConstructor): NodeList<U>;

		_NodeListCtor: NodeListConstructor;
		toString(): string;

		/**
		 * private function to hold to a parent NodeList. end() to return the parent NodeList.
		 */
		_stash(parent: Node): this;

		/**
		 * Listen for events on the nodes in the NodeList.
		 */
		on(eventName: string, listener: EventListener): Handle[];

		/**
		 * Ends use of the current `NodeList` by returning the previous NodeList
		 * that generated the current NodeList.
		 */
		end<U extends Node>(): NodeList<U>;

		/**
		 * Returns a new NodeList, maintaining this one in place
		 */
		slice(begin: number, end?: number): this;

		/**
		 * Returns a new NodeList, manipulating this NodeList based on
		 * the arguments passed, potentially splicing in new elements
		 * at an offset, optionally deleting elements
		 */
		splice(index: number, howmany?: number, ...items: T[]): this;

		/**
		 * see `dojo/_base/array.indexOf()`. The primary difference is that the acted-on
		 * array is implicitly this NodeList
		 */
		indexOf(value: T, fromIndex?: number, findLast?: boolean): number;

		/**
		 * see `dojo/_base/array.lastIndexOf()`. The primary difference is that the
		 * acted-on array is implicitly this NodeList
		 */
		lastIndexOf(value: T, fromIndex?: number): number;

		/**
		 * see `dojo/_base/array.every()` and the [Array.every
		 * docs](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every).
		 * Takes the same structure of arguments and returns as
		 * dojo/_base/array.every() with the caveat that the passed array is
		 * implicitly this NodeList
		 */
		every(callback: (item: T, idx: number, nodeList: this) => boolean | string, thisObj?: Object): boolean;

		/**
		 * Takes the same structure of arguments and returns as
		 * `dojo/_base/array.some()` with the caveat that the passed array as
		 * implicitly this NodeList.  See `dojo/_base/array.some()` and Mozillaas
		 * [Array.soas
		 * documentation](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some).
		 */
		some(callback: (item: T, idx: number, nodeList: this) => boolean | string, thisObj?: Object): boolean;

		/**
		 * Returns a new NodeList comprised of items in this NodeList
		 * as well as items passed in as parameters
		 */
		concat(...items: T[]): this;

		/**
		 * see `dojo/_base/array.map()`. The primary difference is that the acted-on
		 * array is implicitly this NodeList and the return is a
		 * NodeList (a subclass of Array)
		 */
		map<U extends Node>(func: (item: T, idx: number, nodeList: this) => U, obj?: Object): NodeList<U>;

		/**
		 * see `dojo/_base/array.forEach()`. The primary difference is that the acted-on
		 * array is implicitly this NodeList. If you want the option to break out
		 * of the forEach loop, use every() or some() instead.
		 */
		forEach(callback: (item: T, idx: number, nodeList: this) => void, thisObj?: Object): this;

		/**
		 * "masks" the built-in javascript filter() method (supported
		 * in Dojo via `dojo/_base/array.filter`) to support passing a simple
		 * string filter in addition to supporting filtering function
		 * objects.
		 */
		filter<U extends Node>(filter: NodeListFilter<T>, thisObj?: Object): NodeList<U>;

		/**
		 * Create a new instance of a specified class, using the
		 * specified properties and each node in the NodeList as a
		 * srcNodeRef.
		 */
		instantiate(declaredClass: string | GenericConstructor<any>, properties?: Object): this;

		/**
		 * Returns a new NodeList comprised of items in this NodeList
		 * at the given index or indices.
		 */
		at(...indices: number[]): this;

	}

	interface NodeListConstructor {
		new <T extends Node>(array: number | Array<T>): NodeList<T>;
		new <T extends Node>(...args: T[]): NodeList<T>;
		<T extends Node>(array: number | Array<T>): NodeList<T>;
		<T extends Node>(...args: T[]): NodeList<T>;

		prototype: NodeList<any>;

		/**
		 * decorate an array to make it look like a `dojo/NodeList`.
		 */
		_wrap<U extends Node, V extends Node>(a: U[], parent?: NodeList<V>, NodeListCtor?: NodeListConstructor): NodeList<U>;

		/**
		 * adapts a single node function to be used in the map-type
		 * actions. The return is a new array of values, as via `dojo/_base/array.map`
		 */
		_adaptAsMap<T extends Node, U extends Node>(f: (node: T) => U, o?: Object): NodeList<U>;

		/**
		 * adapts a single node function to be used in the forEach-type
		 * actions. The initial object is returned from the specialized
		 * function.
		 */
		_adaptAsForEach<T extends Node>(f: (node: T) => void, o?: Object): this;

		/**
		 * adapts a single node function to be used in the filter-type actions
		 */
		_adaptAsFilter<T extends Node>(f: (node: T) => boolean, o?: Object): this;

		/**
		 * adapts a single node function to be used in the map-type
		 * actions, behaves like forEach() or map() depending on arguments
		 */
		_adaptWithCondition<T extends Node, U extends Node>(f: (node: T) => U | void, g: (...args: any[]) => boolean, o?: Object): NodeList<U> | this;
	}

	interface Query {
		/**
		 * Returns nodes which match the given CSS selector, searching the
		 * entire document by default but optionally taking a node to scope
		 * the search by. Returns an instance of NodeList.
		 */
		<T extends Node>(query: string, root?: NodeOrString): NodeList<T>;

		/**
		 * Test to see if a node matches a selector
		 */
		matches(node: Node, selector: string, root?: NodeOrString): boolean;

		/**
		 * Filters an array of nodes. Note that this does not guarantee to return a NodeList, just an array.
		 */
		filter<T extends Node>(nodes: NodeList<T> | T[], select: string, root?: NodeOrString): T[] | NodeList<T>;

		/**
		 * can be used as AMD plugin to conditionally load new query engine
		 */
		load(id: string, parentRequire: Function, loaded: Function): void; /* TODO: Align with loader api */
	}

	/* dojo/ready */

	interface Ready {
		/**
		 * Add a function to execute on DOM content loaded and all requested modules have arrived and been evaluated.
		 * In most cases, the `domReady` plug-in should suffice and this method should not be needed.
		 *
		 * When called in a non-browser environment, just checks that all requested modules have arrived and been
		 * evaluated.
		 */
		(callback: Function): void;
		(context: Object, callback: Function | string): void;
		(priority: number, callback: Function): void;
		(priority: number, context: Object, callback: Function | string): void;
	}

	/* dojo/regexp */

	interface RegExpModule {
		/**
		 * Adds escape sequences for special characters in regular expressions
		 */
		escapeString(str: string, except?: string): string;

		/**
		 * Builds a regular expression that groups subexpressions
		 */
		buildGroupRE(arr: any[] | Object, re: (item: any) => string, nonCapture?: boolean): string;

		/**
		 * adds group match to expression
		 */
		group(expression: string, nonCapture?: boolean): string;
	}

	/* dojo/request */

	/* This is contained in request.d.ts */

	/* dojo/require */

	interface RequirePlugin {
		dynamic: number;
		normalize(id: string): string;
		load(mid: string, require: any, loaded: (...modules: any[]) => void): void;
	}

	/* dojo/robot */

	interface Robot extends doh.Robot {
		_resolveNode(n: NodeOrString | (() => Node)): Node;
		_scrollIntoView(n: Node): void;
		_position(n: Node): DomGeometryBoxExtents;
		_getWindowChain(n: Node): Window[];

		/**
		 * Scroll the passed node into view, if it is not.
		 */
		scrollIntoView(node: NodeOrString | (() => Node), delay?: number): void;

		/**
		 * Moves the mouse over the specified node at the specified relative x,y offset.
		 */
		mouseMoveAt(
			node: NodeOrString | (() => Node),
			delay?: number,
			duration?: number,
			offsetX?: number,
			offsetY?: number
		): void;
	}

	/* dojo/robotx */

	interface RobotX extends Robot {
		/**
		 * Called every time a new page is loaded into the iframe, to setup variables
		 * Point dojo.global, dojo.publish, etc. to refer to iframe.
		 * Remove for 2.0?
		 */
		_updateDocument(): void;

		/**
		 * Opens the application at the specified URL for testing, redirecting dojo to point to the application
		 * environment instead of the test environment.
		 */
		initRobot(url: string): void;

		/**
		 * Notifies DOH that the doh.robot is about to make a page change in the application it is driving,
		 * returning a doh.Deferred object the user should return in their runTest function as part of a DOH test.
		 */
		waitForPageToLoad(submitActions: () => void): any;
	}

	/* dojo/router */

	/* Module just exports instance of dojo.router.BaseRouter */

	/* dojo/sniff */

	interface Has {
		(name: 'air'): boolean;
		(name: 'wp'): void | number;
		(name: 'msapp'): void | number;
		(name: 'khtml'): void | number;
		(name: 'edge'): void | number;
		(name: 'opr'): void | number;
		(name: 'webkit'): void | number;
		(name: 'chrome'): void | number;
		(name: 'android'): void | number;
		(name: 'safari'): void | number;
		(name: 'mac'): boolean;
		(name: 'quirks'): boolean;
		(name: 'iphone'): void | number;
		(name: 'ipod'): void | number;
		(name: 'ipad'): void | number;
		(name: 'ios'): void | number;
		(name: 'bb'): void | number | boolean;
		(name: 'trident'): void | number;
		(name: 'svg'): boolean;
		(name: 'opera'): void | number;
		(name: 'mozilla'): void | number;
		(name: 'ff'): void | number;
		(name: 'ie'): void | number;
		(name: 'wii'): boolean | any;
	}

	/* Just rexports has after adding features */

	/* dojo/Stateful */

	interface WatchHandle extends Handle {
		unwatch(): void;
	}

	interface Stateful {
		/**
		 * Used across all instances a hash to cache attribute names and their getter
		 * and setter names.
		 */
		_attrPairNames: { [attr: string]: string };

		/**
		 * Helper function for get() and set().
		 * Caches attribute name values so we don't do the string ops every time.
		 */
		_getAttrNames(name: string): string;

		/**
		 * Automatic setting of params during construction
		 */
		postscript(params?: Object): void;

		/**
		 * Get a property on a Stateful instance.
		 */
		get(name: string): any;

		/**
		 * Set a property on a Stateful instance
		 */
		set(name: string, value: any): this;
		set(name: string, ...values: any[]): this;
		set(name: Object): this;

		/**
		 * Internal helper for directly changing an attribute value.
		 */
		_changeAttrValue(name: string, value: any): this;

		/**
		 * Watches a property for changes
		 */
		watch(callback: (prop: string, oldValue: any, newValue: any) => void): WatchHandle;
		watch(name: string, callback: (prop: string, oldValue: any, newValue: any) => void): WatchHandle;
	}

	interface StatefulConstructor extends _base.DeclareConstructor<Stateful> {
		new (params?: Object): Stateful;
	}

	/* dojo/string */

	interface String {

		/**
		 * Efficiently escape a string for insertion into HTML (innerHTML or attributes), replacing &, <, >, ", ', and / characters.
		 */
		escape(str: string): string;

		/**
		 * Efficiently replicate a string `n` times.
		 */
		rep(str: string, num: number): string;

		/**
		 * Pad a string to guarantee that it is at least `size` length by
		 * filling with the character `ch` at either the start or end of the
		 * string. Pads at the start, by default.
		 */
		pad(text: string, size: number, ch?: string, end?: boolean): string;

		/**
		 * Performs parameterized substitutions on a string. Throws an
		 * exception if any parameter is unmatched.
		 */
		substitute(template: string, map: Object | any[], transform?: (value: any, key: string) => any, thisObject?: Object): string;

		/**
		 * Trims whitespace from both sides of the string
		 */
		trim(str: string): string;
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

	/* dojo/throttle */

	interface Throttle {
		<T extends Function>(cb: T, wait: number): T;
	}

	/* dojo/topic */

	interface Topic {
		/**
		 * Publishes a message to a topic on the pub/sub hub. All arguments after
		 * the first will be passed to the subscribers, so any number of arguments
		 * can be provided (not just event).
		 */
		publish(topic: string | ExtensionEvent, ...event: any[]): boolean;

		/**
		 * Subscribes to a topic on the pub/sub hub
		 */
		subscribe(topic: string | ExtensionEvent, listener: EventListener | Function): Handle;
	}

	/* dojo/touch */

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

	/* dojo/uacss */

	/* rexports has after adding classes to dom */

	/* dojo/when */

	interface When {
		/**
		 * Transparently applies callbacks to values and/or promises.
		 */
		<T>(value: T | dojo.promise.Promise<T>): dojo.promise.Promise<T>;
		<T>(value: T | dojo.promise.Promise<T>,
			callback?: dojo.promise.PromiseCallback<T, T>,
			errback?: dojo.promise.PromiseErrback<T>,
			progress?: dojo.promise.PromiseProgback): T | dojo.promise.Promise<T>;
		<T, U>(value: T | dojo.promise.Promise<T>,
			callback?: dojo.promise.PromiseCallback<T, U>,
			errback?: dojo.promise.PromiseErrback<U>,
			progress?: dojo.promise.PromiseProgback): U | dojo.promise.Promise<U>;
	}

	/* dojo/window */

	interface WindowModule {

		/**
		 * Returns the dimensions and scroll position of the viewable area of a browser window
		 */
		getBox(doc?: Document): DomGeometryBox;

		/**
		 * Get window object associated with document doc.
		 */
		get(doc?: Document): Window;

		/**
		 * Scroll the passed node into view using minimal movement, if it is not already.
		 */
		scrollIntoView(node: Element, pos?: DomGeometryXYBox): void;
	}
}
