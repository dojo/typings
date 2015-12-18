/// <reference path="../../dijit/1.10/index.d.ts" />
/// <reference path="../../dojox/1.10/index.d.ts" />

declare namespace dojo {
	namespace _base {

		/* dojo/_base/array */
		interface Array {
			/**
			 * Determines whether or not every item in arr satisfies the condition implemented by callback.
			 * @param {T[] | string} arr the array to iterate on. If a string, operates on individual characters.
			 * @param {Function | string} callback a  function is invoked with three arguments: item, index, and
			 *                                     array and returns true if the condition is met.
			 * @param {object} thisObj may be used to scope the call to callback
			 */
			every<T>(arr: T[] | string, callback: (item: T, idx: number, arr: T[]) => boolean | string, thisObj?: any): boolean;

			/**
			 * Determines whether or not any item in arr satisfies the condition implemented by callback.
			 */
			some<T>(arr: T[] | string, callback: (item: T, idx: number, arr: T[]) => boolean | string, thisObj?: any): boolean;

			/**
			 * locates the last index of the provided value in the passed array. If the value is not found, -1
			 * is returned.
			 * @param {boolean} findLast Makes indexOf() work like lastIndexOf().  Used internally; not meant
			 *                           for external usage.
			 */
			indexOf<T>(arr: T[], value: T, fromIndex?: number, findLast?: boolean): number;

			/**
			 * locates the first index of the provided value in the passed array. If the value is not found,
			 * -1 is returned.
			 */
			lastIndexOf<T>(arr: T[], value: T, fromIndex?: number): number;

			/**
			 * locates the last index of the provided value in the passed array. If the value is not found,
			 * -1 is returned.
			 */
			forEach<T>(arr: T[], callback: (item: T, idx: number, arr: T[]) => void, thisObj?: any): void;

			/**
			 * for every item in arr, callback is invoked. Return values are ignored. If you want to break
			 * out of the loop, consider using array.every() or array.some().
			 */
			map<T, U>(arr: T[] | string, callback: (item: T, idx: number, arr: T[]) => U | string, thisObj?: any, Ctr?: dojo.GenericConstructor<U[]>): U[];

			/**
			 * Returns a new Array with those items from arr that match the condition implemented by
			 * callback.
			 */
			filter<T>(arr: T[], callback: (item: T, idx: number, arr: T[]) => boolean, thisObj?: any): T[];

			clearCache(): void;
		}

		/* dojo/_base/Color */
		type ColorValue = [number, number, number];
		type ColorValueAlpha = [number, number, number, number];

		interface ColorObject {
			r: number;
			g: number;
			b: number;
			a?: number;
		}

		interface Color {
			named: {
				'black': ColorValue;
				'silver': ColorValue;
				'gray': ColorValue,
				'white': ColorValue,
				'maroon': ColorValue,
				'red': ColorValue,
				'purple': ColorValue,
				'fuchsia': ColorValue,
				'green': ColorValue,
				'lime': ColorValue,
				'olive': ColorValue,
				'yellow': ColorValue,
				'navy': ColorValue,
				'blue': ColorValue,
				'teal': ColorValue,
				'aqua': ColorValue,
				'transparent': [number, number, number, number];
			};
			r: number;
			g: number;
			b: number;
			a: number;
			_set(r: number, g: number, b: number, a: number): void;

			/** Takes a named string, hex string, array of rgb or rgba values,
			 * an object with r, g, b, and a properties, or another `Color` object
			 * and sets this color instance to that value.
			 */
			setColor(color: ColorValue | ColorValueAlpha | ColorObject | string): Color;

			/**
			 * Ensures the object has correct attributes
			 */
			sanatize(): Color;

			/**
			 * Returns 3 component array of rgb values
			 */
			toRgb(): ColorValue;

			/**
			 * Returns a 4 component array of rgba values from the color represented by
			 * this object.
			 */
			toRgba(): ColorValueAlpha;

			/**
			 * Returns a CSS color string in hexadecimal representation
			 */
			toHex(): string;

			/**
			 * Returns a css color string in rgb(a) representation
			 */
			toCss(includeAlpha?: boolean): string;

			/**
			 * Returns a visual representation of the color
			 */
			toString(): string;

			/**
			 * Blend colors end and start with weight from 0 to 1, 0.5 being a 50/50 blend,
			 * can reuse a previously allocated Color object for the result
			 */
			blendColors(start: Color, end: Color, weight: number, obj?: Color): Color;

			/**
			 * Returns a `Color` instance from a string of the form
			 * "rgb(...)" or "rgba(...)". Optionally accepts a `Color`
			 * object to update with the parsed value and return instead of
			 * creating a new object.
			 */
			fromRgb(color: string, obj?: Color): Color;

			/**
			 * Converts a hex string with a '#' prefix to a color object.
			 * Supports 12-bit #rgb shorthand. Optionally accepts a
			 * `Color` object to update with the parsed value.
			 */
			fromHex(color: string, obj?: Color): Color;

			/**
			 * Builds a `Color` from a 3 or 4 element array, mapping each
			 * element in sequence to the rgb(a) values of the color.
			 */
			fromArray(color: ColorValue | ColorValueAlpha, obj?: Color): Color;

			/**
			 * Parses `str` for a color value. Accepts hex, rgb, and rgba
			 * style color values.
			 */
			fromString(str: string, obj?: Color): Color;
		}

		/* dojo/_base/config */
		interface Config {
			/** Defaults to `false`. If set to `true`, ensures that Dojo provides
			 * extended debugging feedback via Firebug. If Firebug is not available
			 * on your platform, setting `isDebug` to `true` will force Dojo to
			 * pull in (and display) the version of Firebug Lite which is
			 * integrated into the Dojo distribution, thereby always providing a
			 * debugging/logging console when `isDebug` is enabled. Note that
			 * Firebug's `console.*` methods are ALWAYS defined by Dojo. If
			 * `isDebug` is false and you are on a platform without Firebug, these
			 * methods will be defined as no-ops.
			 */
			isDebug: boolean;

			/**
			 * The locale to assume for loading localized resources in this page,
			 * specified according to [RFC 3066](http://www.ietf.org/rfc/rfc3066.txt).
			 * Must be specified entirely in lowercase, e.g. `en-us` and `zh-cn`.
			 * See the documentation for `dojo.i18n` and `dojo.requireLocalization`
			 * for details on loading localized resources. If no locale is specified,
			 * Dojo assumes the locale of the user agent, according to `navigator.userLanguage`
			 * or `navigator.language` properties.
			 */
			locale: string;

			/**
			 * No default value. Specifies additional locales whose
			 * resources should also be loaded alongside the default locale when
			 * calls to `dojo.requireLocalization()` are processed.
			 */
			extraLocale: string[];

			/**
			 * The directory in which `dojo.js` is located. Under normal
			 * conditions, Dojo auto-detects the correct location from which it
			 * was loaded. You may need to manually configure `baseUrl` in cases
			 * where you have renamed `dojo.js` or in which `<base>` tags confuse
			 * some browsers (e.g. IE 6). The variable `dojo.baseUrl` is assigned
			 * either the value of `djConfig.baseUrl` if one is provided or the
			 * auto-detected root if not. Other modules are located relative to
			 * this path. The path should end in a slash.
			 */
			baseUrl: string;

			/**
			 * A map of module names to paths relative to `dojo.baseUrl`. The
			 * key/value pairs correspond directly to the arguments which
			 * `dojo.registerModulePath` accepts. Specifying
			 * `djConfig.modulePaths = { "foo": "../../bar" }` is the equivalent
			 * of calling `dojo.registerModulePath("foo", "../../bar");`. Multiple
			 * modules may be configured via `djConfig.modulePaths`.
			 */
			modulePaths: { [mid: string]: string };

			/**
			 * Adds a callback via dojo/ready. Useful when Dojo is added after
			 * the page loads and djConfig.afterOnLoad is true. Supports the same
			 * arguments as dojo/ready. When using a function reference, use
			 * `djConfig.addOnLoad = function(){};`. For object with function name use
			 * `djConfig.addOnLoad = [myObject, "functionName"];` and for object with
			 * function reference use
			 * `djConfig.addOnLoad = [myObject, function(){}];`
			 */
			addOnLoad: () => void | [any, string];

			/**
			 * Run the parser after the page is loaded
			 */
			parseOnLoad: boolean;

			/**
			 * An array of module names to be loaded immediately after dojo.js has been included
			 * in a page.
			 */
			require: string[];

			/**
			 * Default duration, in milliseconds, for wipe and fade animations within dijits.
			 * Assigned to dijit.defaultDuration.
			 */
			defaultDuration: number;

			/**
			 * Used by some modules to configure an empty iframe. Used by dojo/io/iframe and
			 * dojo/back, and dijit/popup support in IE where an iframe is needed to make sure native
			 * controls do not bleed through the popups. Normally this configuration variable
			 * does not need to be set, except when using cross-domain/CDN Dojo builds.
			 * Save dojo/resources/blank.html to your domain and set `djConfig.dojoBlankHtmlUrl`
			 * to the path on your domain your copy of blank.html.
			 */
			dojoBlankHtmlUrl: string;

			/**
			 * Set this to true to enable publishing of topics for the different phases of
			 * IO operations. Publishing is done via dojo/topic.publish(). See dojo/main.__IoPublish for a list
			 * of topics that are published.
			 */
			ioPublish: boolean;

			/**
			 * If set to a value that evaluates to true such as a string or array and
			 * isDebug is true and Firebug is not available or running, then it bypasses
			 * the creation of Firebug Lite allowing you to define your own console object.
			 */
			useCustomLogger: any;

			/**
			 * Array containing the r, g, b components used as transparent color in dojo.Color;
			 * if undefined, [255,255,255] (white) will be used.
			 */
			transparentColor: ColorValue | ColorValueAlpha;

			/**
			 * Defines dependencies to be used before the loader has been loaded.
			 * When provided, they cause the loader to execute require(deps, callback)
			 * once it has finished loading. Should be used with callback.
			 */
			deps: () => string[] | string[];

			/**
			 * Defines the cached has API variables
			 */
			hasCache: { [feature: string]: any };

			/**
			 * Defines a callback to be used when dependencies are defined before
			 * the loader has been loaded. When provided, they cause the loader to
			 * execute require(deps, callback) once it has finished loading.
			 */
			callback: (...args: any[]) => void;

			/**
			 * Whether deferred instrumentation should be loaded or included
			 * in builds.
			 */
			deferredInstrumentation: boolean;

			/**
			 * Whether the deferred instrumentation should be used.
			 *
			 *   * `"report-rejections"`: report each rejection as it occurs.
			 *   * `true` or `1` or `"report-unhandled-rejections"`: wait 1 second
			 *     in an attempt to detect unhandled rejections.
			 */
			useDeferredInstrumentation: string | boolean | number;
		}

		/* dojo/_base/connect */

		interface Connect {
			/**
			 * TODO: Type this better
			 */
			_keypress(object: any, listener: EventListener): Handle;

			/**
			 * `dojo.connect` is a deprecated event handling and delegation method in
			 * Dojo. It allows one function to "listen in" on the execution of
			 * any other, triggering the second whenever the first is called. Many
			 * listeners may be attached to a function, and source functions may
			 * be either regular function calls or DOM events.
			 */
			connect(obj: any, event: string, context: any, method: EventListener | string, dontFix?: boolean): Handle;
			connect(event: string, context: any, method: EventListener | string, dontFix?: boolean): Handle;

			/**
			 * Remove a link created by dojo.connect.
			 */
			disconnect(handle: Handle): void;

			/**
			 * Attach a listener to a named topic. The listener function is invoked whenever the
			 * named topic is published (see: dojo.publish).
			 * Returns a handle which is needed to unsubscribe this listener.
			 */
			subscribe(topic: string, context: any, method: EventListener): Handle;

			/**
			 * Invoke all listener method subscribed to topic.
			 */
			publish(topic: string, args: any[]): boolean;

			/**
			 * Ensure that every time obj.event() is called, a message is published
			 * on the topic. Returns a handle which can be passed to
			 * dojo.disconnect() to disable subsequent automatic publication on
			 * the topic.
			 */
			connectPublisher(topic: string, obj: any, method: string): Handle;
			connectPublisher(topic: string, method: EventListener): Handle;

			/**
			 * Checks an event for the copy key (meta on Mac, and ctrl anywhere else)
			 */
			isCopyKey(e: Event): boolean;
		}

		/* dojo/_base/declare */

		interface DeclareConstructor<T> {
			new (...args: any[]): T;

			/**
			 * Adds all properties and methods of source to constructor's
			 * prototype, making them available to all instances created with
			 * constructor. This method is specific to constructors created with
			 * declare().
			 */
			extend<U>(source: U): DeclareConstructor<T & U>;

			/**
			 * Create a subclass of the declared class from a list of base classes.
			 */
			createSubclass<U, V, X>(mixins: [DeclareConstructor<U>, DeclareConstructor<V>], props: X): DeclareConstructor<T & U & V & X>;
			createSubclass<U, V>(mixins: [DeclareConstructor<U>], props: V): DeclareConstructor<T & U & V>;
			createSubclass<U, V>(mixins: DeclareConstructor<U>, props: V): DeclareConstructor<T & U & V>;
			createSubclass<U>(mixins: [DeclareConstructor<U>]): DeclareConstructor<T & U>;
			createSubclass<U>(mixins: DeclareConstructor<U>): DeclareConstructor<T & U>;
			createSubclass<U>(mixins: any, props: U): DeclareConstructor<T & U>;
		}

		/**
		 * Create a feature-rich constructor from compact notation.
		 */
		interface Declare {
			<A, B, C>(className: string, superClass: [DeclareConstructor<A>, DeclareConstructor<B>], props: C): DeclareConstructor<A & B & C>;
			<A, B, C>(superClass: [DeclareConstructor<A>, DeclareConstructor<B>], props: C): DeclareConstructor<A & B & C>;
			<A, B>(className: string, superClass: DeclareConstructor<A>, props: B): DeclareConstructor<A & B>;
			<A, B>(superClass: DeclareConstructor<A>, props: B): DeclareConstructor<A & B>;
			<A>(className: string, superClass: DeclareConstructor<any> | DeclareConstructor<any>[], props: any): DeclareConstructor<A>;
			<A>(superClass: DeclareConstructor<any> | DeclareConstructor<any>[], props: any): DeclareConstructor<A>;
			(className: string, superClass: any[], props: any): DeclareConstructor<any>;
			(superClass: any[], props: any): DeclareConstructor<any>;

			/**
			 * Mix in properties skipping a constructor and decorating functions
			 * like it is done by declare().
			 */
			safeMixin<A, B>(target: A, source: B): A & B;
		}

		/* dojo/_base/Deferred */

		/**
		 * Deprecated.   This module defines the legacy dojo/_base/Deferred API.
		 * New code should use dojo/Deferred instead.
		 */
		interface Deferred<T> {
			new <U>(canceller?: (reason: any) => void): Deferred<U>;
			<U>(canceller?: (reason: any) => void): Deferred<U>;

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
			resolve(value: T): void;

			/**
			 * Reject the deferred.
			 */
			reject(error: any): void;

			/**
			 * The results of the Defereed
			 */
			results: [T, any];

			/**
			 * Adds callback and error callback for this deferred instance.
			 */
			addCallbacks(callback?: promise.PromiseCallback<T>, errback?: promise.PromiseErrback): Deferred<T>;

			/**
			 * Add new callbacks to the deferred.
			 */
			then<U>(callback?: promise.PromiseCallback<T>, errback?: promise.PromiseErrback, progback?: promise.PromiseProgback): promise.Promise<U>;

			/**
			 * Cancels the asynchronous operation
			 */
			cancel(): void;

			/**
			 * Adds successful callback for this deferred instance.
			 */
			addCallback(callback: promise.PromiseCallback<T>): Deferred<T>;

			/**
			 * Adds error callback for this deferred instance.
			 */
			addErrback(errback: promise.PromiseErrback): Deferred<T>;

			/**
			 * Add handler as both successful callback and error callback for this deferred instance.
			 */
			addBoth(callback?: promise.PromiseErrback): Deferred<T>;

			fired: number;

			when<U>(valueOrPromise: any, callback?: promise.PromiseCallback<U>, errback?: promise.PromiseErrback, progback?: promise.PromiseProgback): dojo.Deferred<U>;
		}

		/* dojo/_base/event */

		/**
		 * This module defines dojo DOM event API.   Usually you should use dojo/on, and evt.stopPropagation() +
		 * evt.preventDefault(), rather than this module.
		 */
		interface EventModule {
			/**
			 * normalizes properties on the event object including event
			 * bubbling methods, keystroke normalization, and x/y positions
			 */
			fix(evt: Event, sender: Element): Event;

			/**
			 * prevents propagation and clobbers the default action of the
			 * passed event
			 */
			stop(evt: Event): void;
		}

		/* dojo/_base/fx */

		interface Line {
			/**
			 * Returns the point on the line
			 * @param {number} n a floating point number greater than 0 and less than 1
			 */
			getValue(n: number): number;
		}

		/**
		 * Object used to generate values from a start value to an end value
		 */
		interface LineConstructor {
			new (start: number, end: number): Line;
		}

		interface Animation extends Evented {
			/**
			 * The time in milliseconds the animation will take to run
			 */
			duration: number;

			/**
			 * A two element array of start and end values, or a `_Line` instance to be
			 * used in the Animation.
			 */
			curve: Line | [number, number];

			/**
			 * A Function to adjust the acceleration (or deceleration) of the progress
			 * across a _Line
			 */
			easing?: Function;

			/**
			 * The number of times to loop the animation
			 */
			repeat: number;

			/**
			 * the time in milliseconds to wait before advancing to next frame
			 * (used as a fps timer: 1000/rate = fps)
			 */
			rate: number;

			/**
			 * The time in milliseconds to wait before starting animation after it
			 * has been .play()'ed
			 */
			delay?: number;

			/**
			 * Synthetic event fired before a Animation begins playing (synchronous)
			 */
			beforeBegin?: Event;

			/**
			 * Synthetic event fired as a Animation begins playing (useful?)
			 */
			onBegin?: Event;

			/**
			 * Synthetic event fired at each interval of the Animation
			 */
			onAnimate?: Event;

			/**
			 * Synthetic event fired after the final frame of the Animation
			 */
			onEnd?: Event;

			/**
			 * Synthetic event fired any time the Animation is play()'ed
			 */
			onPlay?: Event;

			/**
			 * Synthetic event fired when the Animation is paused
			 */
			onPause?: Event;

			/**
			 * Synthetic event fires when the Animation is stopped
			 */
			onStop?: Event;

			_precent: number;
			_startRepeatCount: number;
			_getStep(): number;

			/**
			 * Convenience function.  Fire event "evt" and pass it the
			 * arguments specified in "args".
			 */
			_fire(evt: Event, args?: any[]): Animation;

			/**
			 * Start the animation.
			 */
			play(delay?: number, gotoStart?: boolean): Animation;

			_play(gotoStart?: boolean): Animation;

			/**
			 * Pauses a running animation.
			 */
			pause(): Animation;

			/**
			 * Sets the progress of the animation.
			 */
			gotoPercent(precent: number, andPlay?: boolean): Animation;

			/**
			 * Stops a running animation.
			 */
			stop(gotoEnd?: boolean): Animation;

			/**
			 * cleanup the animation
			 */
			destroy(): void;

			/**
			 * Returns a string token representation of the status of
			 * the animation, one of: "paused", "playing", "stopped"
			 */
			status(): string;

			_cycle(): Animation;
			_clearTimer(): void;
			_startTimer(): void;
			_stopTimer(): void;
		}

		/**
		 * A generic animation class that fires callbacks into its handlers
		 * object at various states.
		 */
		interface AnimationConstructor {
			new (args: any): Animation;
		}

		interface AnimationCallback {
			(node: HTMLElement): void;
		}

		interface FadeArguments {
			node: HTMLElement | string;
			duration?: number;
			easing?: Function;
		}

		interface AnimationArguments extends FadeArguments {
			properties: { [name: string]: any };
			onEnd?: AnimationCallback;
		}

		interface Fx {
			_Line: LineConstructor;

			Animation: AnimationConstructor;

			_fade(args: any): Animation;

			/**
			 * Returns an animation that will fade node defined in 'args' from
			 * its current opacity to fully opaque.
			 */
			fadeIn(args: FadeArguments): Animation;

			/**
			 * Returns an animation that will fade node defined in 'args'
			 * from its current opacity to fully transparent.
			 */
			fadeOut(args: FadeArguments): Animation;

			_defaultEasing(n?: number): number;

			/**
			 * Returns an animation that will transition the properties of
			 * node defined in `args` depending how they are defined in
			 * `args.properties`
			 */
			animateProperty(args: AnimationArguments): Animation;

			/**
			 * A simpler interface to `animateProperty()`, also returns
			 * an instance of `Animation` but begins the animation
			 * immediately, unlike nearly every other Dojo animation API.
			 */
			anim(
				node: HTMLElement | string,
				properties: { [name: string]: any },
				duration?: number,
				easing?: Function,
				onEnd?: AnimationCallback,
				delay?: number): Animation;
		}

		/* dojo/_base/kernel */

		interface Dojo {
			config: Config;
			global: any;
			dijit: dijit.Dijit;
			dojox: dojox.DojoX;

			/**
			 * a map from a name used in a legacy module to the (global variable name, object addressed by that name)
			 * always map dojo, dijit, and dojox
			 */
			scopeMap: {
				[scope: string]: [string, any];
				dojo: [string, Dojo];
				dijit: [string, dijit.Dijit];
				dojox: [string, dojox.DojoX];
			};

			baseUrl: string;
			isAsync: boolean;
			locale: string;
			version: {
				major: number;
				minor: number;
				patch: number;
				flag: string;
				revision: number;
				toString(): string;
			};

			/**
			 * A legacy method created for use exclusively by internal Dojo methods. Do not use this method
			 * directly unless you understand its possibly-different implications on the platforms your are targeting.
			 */
			eval(scriptText: string): any;

			exit(exitcode?: number): void;

			/**
			 * Log a debug message to indicate that a behavior has been
			 * deprecated.
			 */
			deprectated(behaviour: string, extra?: string, removal?: string): void;

			/**
			 * Marks code as experimental.
			 */
			experimental(moduleName: string, extra?: string): void;

			/**
			 * Returns a URL relative to a module.
			 */
			moduleUrl(module: string, url?: string): any;

			/**
			 * for backward compatibility with layers built with 1.6 tooling
			 */
			_hasResource: any;
		}

		/* dojo/_base/lang */

		interface ReplaceCallback {
			(match: string, name: string, offset: number, tmpl: string): string;
		}

		interface Lang {
			/**
			 * Lists property names that must be explicitly processed during for-in iteration
			 * in environments that have has("bug-for-in-skips-shadowed") true.
			 */
			_extraNames: string[];

			/**
			 * Copies/adds all properties of one or more sources to dest; returns dest.
			 */
			_mixin<T, U>(dest: T, source: U, copyFunc?: (s: any) => any): T & U;

			/**
			 * Set a property from a dot-separated string, such as "A.B.C"
			 */
			setObject(name: string, value: any, context?: any): any;

			/**
			 * Get a property from a dot-separated string, such as "A.B.C"
			 */
			getObject<T>(name: string, create?: boolean, context?: any): T;

			/**
			 * determine if an object supports a given method
			 */
			exists(name: string, obj?: any): boolean;

			/**
			 * Return true if it is a String
			 */
			isString(it: any): it is string;

			/**
			 * Return true if it is an Array.
			 */
			isArray(it: any): it is any[];

			/**
			 * Return true if it is a Function
			 */
			isFunction(it: any): it is Function;

			/**
			 * Returns true if it is a JavaScript object (or an Array, a Function
			 * or null)
			 */
			isObject(it: any): it is { [id: name]: any; };

			/**
			 * similar to isArray() but more permissive
			 */
			isArrayLike(it: any): boolean;

			/**
			 * Returns true if it is a built-in function or some other kind of
			 * oddball that *should* report as a function but doesn't
			 */
			isAlien(it: any): boolean;

			/**
			 * Adds all properties and methods of props to constructor's
			 * prototype, making them available to all instances created with
			 * constructor.
			 */
			extend<T, U>(ctor: GenericConstructor<T>, props: U): GenericConstructor<T & U>;

			_hitchArgs<T extends Function>(scope: any, method: T): T;

			/**
			 * Returns a function that will only ever execute in the given scope.
			 * This allows for easy use of object member functions
			 * in callbacks and other places in which the "this" keyword may
			 * otherwise not reference the expected scope.
			 * Any number of default positional arguments may be passed as parameters
			 * beyond "method".
			 * Each of these values will be used to "placehold" (similar to curry)
			 * for the hitched function.
			 */
			hitch<T extends Function>(scope: any, method: T): T;
			hitch<T extends Function>(scope: any, method: Function, ...args: any[]): T;

			/**
			 * Returns a new object which "looks" to obj for properties which it
			 * does not have a value for. Optionally takes a bag of properties to
			 * seed the returned object with initially.
			 */
			delegate<T, U>(obj: T, props?: U): T & U;

			/**
			 * Converts an array-like object (i.e. arguments, DOMCollection) to an
			 * array. Returns a new Array with the elements of obj.
			 */
			_toArray(obj: any, offset?: number, startWith?: any[]): any[];

			/**
			 * similar to hitch() except that the scope object is left to be
			 * whatever the execution context eventually becomes.
			 */
			partial<U extends Function>(method: Function | string, ...args: any[]): U;

			/**
			 * Clones objects (including DOM nodes) and all children.
			 * Warning: do not clone cyclic structures.
			 */
			clone<T>(src: T): T;

			/**
			 * Trims whitespace from both sides of the string
			 */
			trim(str: string): string;

			/**
			 * Performs parameterized substitutions on a string. Throws an
			 * exception if any parameter is unmatched.
			 */
			replace(tmpl: string, map: GenericObject | ReplaceCallback, pattern?: RegExp): string;
		}

		/* dojo/_base/loader */

		interface Loader {
			extractLegacyApiApplications(text: string, noCommentText?: string): any;
			require(mid: string, require: any, loaded: (...modules: any[]) => void): void;
			loadInit(mid: string, require: any, loaded: (...modules: any[]) => void): void;
		}

		/* TODO: dojo/_base/NodeList only extends query.NodeList */

		/* dojo/_base/query aliases dojo/query */

		/* dojo/_base/sniff */
		interface Dojo {
			/**
			 * True if the client is a web-browser
			 */
			isBrowser: boolean;

			/**
			 * Version as a Number if client is FireFox. undefined otherwise. Corresponds to
			 * major detected FireFox version (1.5, 2, 3, etc.)
			 */
			isFF: number;

			/**
			 * Version as a Number if client is MSIE(PC). undefined otherwise. Corresponds to
			 * major detected IE version (6, 7, 8, etc.)
			 */
			isIE: number;

			/**
			 * Version as a Number if client is a KHTML browser. undefined otherwise. Corresponds to major
			 * detected version.
			 */
			isKhtml: number;

			/**
			 * Version as a Number if client is a WebKit-derived browser (Konqueror,
			 * Safari, Chrome, etc.). undefined otherwise.
			 */
			isWebKit: number;

			/**
			 * Version as a Number if client is a Mozilla-based browser (Firefox,
			 * SeaMonkey). undefined otherwise. Corresponds to major detected version.
			 */
			isMozilla: number;

			/**
			 * Version as a Number if client is a Mozilla-based browser (Firefox,
			 * SeaMonkey). undefined otherwise. Corresponds to major detected version.
			 */
			isMoz: number;

			/**
			 * Version as a Number if client is Opera. undefined otherwise. Corresponds to
			 * major detected version.
			 */
			isOpera: number;

			/**
			 * Version as a Number if client is Safari or iPhone. undefined otherwise.
			 */
			isSafari: number;

			/**
			 * Version as a Number if client is Chrome browser. undefined otherwise.
			 */
			isChrome: number;

			/**
			 * True if the client runs on Mac
			 */
			isMac: number;

			/**
			 * Version as a Number if client is iPhone, iPod, or iPad. undefined otherwise.
			 */
			isIos: number;

			/**
			 * Version as a Number if client is android browser. undefined otherwise.
			 */
			isAndroid: number;

			/**
			 * True if client is Wii
			 */
			isWii: boolean;

			/**
			 * Page is in quirks mode.
			 */
			isQuirks: boolean;

			/**
			 * True if client is Adobe Air
			 */
			isAir: boolean;
		}
	}
}
