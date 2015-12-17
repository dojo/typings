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
		type ColorValue = [ number, number, number ];
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
				'blue':	ColorValue,
				'teal': ColorValue,
				'aqua': ColorValue,
				'transparent': [ number, number, number, number ];
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
			addOnLoad: () => void | [ any, string ];

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

		/* dojo/_base/declare */

		/**
		 * Create a feature-rich constructor from compact notation.
		 */
		interface Declare {
			<A, B, C>(className: string, superClass: [ dojo.GenericConstructor<A>, dojo.GenericConstructor<B> ], props: C): dojo.GenericConstructor<A&B&C>;
			<A, B, C>(superClass: [ dojo.GenericConstructor<A>, dojo.GenericConstructor<B> ], props: C): dojo.GenericConstructor<A&B&C>;
			<A, B>(className: string, superClass: dojo.GenericConstructor<A>, props: B): dojo.GenericConstructor<A&B>;
			<A, B>(superClass: dojo.GenericConstructor<A>, props: B): dojo.GenericConstructor<A&B>;
			<A>(className: string, superClass: dojo.GenericConstructor<any>|dojo.GenericConstructor<any>[], props: any): dojo.GenericConstructor<A>;
			<A>(superClass: dojo.GenericConstructor<any>|dojo.GenericConstructor<any>[], props: any): dojo.GenericConstructor<A>;
			(className: string, superClass: any[], props: any): dojo.GenericConstructor<any>;
			(superClass: any[], props: any): dojo.GenericConstructor<any>;
		}
	}
}