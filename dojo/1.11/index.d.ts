/// <reference path="dojo.d.ts" />
/// <reference path="_base.d.ts" />
/// <reference path="cldr.d.ts" />
/// <reference path="data.d.ts" />
/// <reference path="date.d.ts" />
/// <reference path="dnd.d.ts" />
/// <reference path="errors.d.ts" />
/// <reference path="io.d.ts" />
/// <reference path="on.d.ts" />
/// <reference path="promise.d.ts" />
/// <reference path="request.d.ts" />
/// <reference path="router.d.ts" />
/// <reference path="rpc.d.ts" />
/// <reference path="selector.d.ts" />
/// <reference path="store.d.ts" />

/**
 * The base configuration interface type, which is used when the loader starts and looks
 * for the dojoConfig variable.
 */
interface DojoConfig {
	/**
	 * Should the module loader support asyncronous loading, or legacy syncronous
	 * loading.  Defaults to false (legacy mode).
	 */
	async?: boolean;

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
	isDebug?: boolean;

	/**
	 * The locale to assume for loading localized resources in this page,
	 * specified according to [RFC 3066](http://www.ietf.org/rfc/rfc3066.txt).
	 * Must be specified entirely in lowercase, e.g. `en-us` and `zh-cn`.
	 * See the documentation for `dojo.i18n` and `dojo.requireLocalization`
	 * for details on loading localized resources. If no locale is specified,
	 * Dojo assumes the locale of the user agent, according to `navigator.userLanguage`
	 * or `navigator.language` properties.
	 */
	locale?: string;

	/**
	 * No default value. Specifies additional locales whose
	 * resources should also be loaded alongside the default locale when
	 * calls to `dojo.requireLocalization()` are processed.
	 */
	extraLocale?: string[];

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
	baseUrl?: string;

	/**
	 * A map of module names to paths relative to `dojo.baseUrl`. The
	 * key/value pairs correspond directly to the arguments which
	 * `dojo.registerModulePath` accepts. Specifying
	 * `djConfig.modulePaths = { "foo": "../../bar" }` is the equivalent
	 * of calling `dojo.registerModulePath("foo", "../../bar");`. Multiple
	 * modules may be configured via `djConfig.modulePaths`.
	 */
	modulePaths?: { [mid: string]: string };

	/**
	 * Adds a callback via dojo/ready. Useful when Dojo is added after
	 * the page loads and djConfig.afterOnLoad is true. Supports the same
	 * arguments as dojo/ready. When using a function reference, use
	 * `djConfig.addOnLoad = function(){};`. For object with function name use
	 * `djConfig.addOnLoad = [myObject, "functionName"];` and for object with
	 * function reference use
	 * `djConfig.addOnLoad = [myObject, function(){}];`
	 */
	addOnLoad?: () => void | [any, string];

	/**
	 * Run the parser after the page is loaded
	 */
	parseOnLoad?: boolean;

	/**
	 * An array of module names to be loaded immediately after dojo.js has been included
	 * in a page.
	 */
	require?: string[];

	/**
	 * Default duration, in milliseconds, for wipe and fade animations within dijits.
	 * Assigned to dijit.defaultDuration.
	 */
	defaultDuration?: number;

	/**
	 * Used by some modules to configure an empty iframe. Used by dojo/io/iframe and
	 * dojo/back, and dijit/popup support in IE where an iframe is needed to make sure native
	 * controls do not bleed through the popups. Normally this configuration variable
	 * does not need to be set, except when using cross-domain/CDN Dojo builds.
	 * Save dojo/resources/blank.html to your domain and set `djConfig.dojoBlankHtmlUrl`
	 * to the path on your domain your copy of blank.html.
	 */
	dojoBlankHtmlUrl?: string;

	/**
	 * Set this to true to enable publishing of topics for the different phases of
	 * IO operations. Publishing is done via dojo/topic.publish(). See dojo/main.__IoPublish for a list
	 * of topics that are published.
	 */
	ioPublish?: boolean;

	/**
	 * If set to a value that evaluates to true such as a string or array and
	 * isDebug is true and Firebug is not available or running, then it bypasses
	 * the creation of Firebug Lite allowing you to define your own console object.
	 */
	useCustomLogger?: any;

	/**
	 * Array containing the r, g, b components used as transparent color in dojo.Color;
	 * if undefined, ColorValue (white) will be used.
	 */
	transparentColor?: dojo._base.ColorValue | dojo._base.ColorValueAlpha;

	/**
	 * Defines dependencies to be used before the loader has been loaded.
	 * When provided, they cause the loader to execute require(deps, callback)
	 * once it has finished loading. Should be used with callback.
	 */
	deps?: (() => string[]) | string[];

	/**
	 * Defines the cached has API variables
	 */
	hasCache?: dojo.HasCache;

	/**
	 * Defines a callback to be used when dependencies are defined before
	 * the loader has been loaded. When provided, they cause the loader to
	 * execute require(deps, callback) once it has finished loading.
	 */
	callback?: (...args: any[]) => void;

	/**
	 * Whether deferred instrumentation should be loaded or included
	 * in builds.
	 */
	deferredInstrumentation?: boolean;

	/**
	 * Whether the deferred instrumentation should be used.
	 *
	 *   * `"report-rejections"`: report each rejection as it occurs.
	 *   * `true` or `1` or `"report-unhandled-rejections"`: wait 1 second
	 *     in an attempt to detect unhandled rejections.
	 */
	useDeferredInstrumentation?: string | boolean | number;

	/**
	 * Package configuration to pass to the AMD loader.
	 */
	packages?: dojo.Package[];

	/**
	 * A map of packages used to configure the AMD loader
	 */
	map?: dojo.ModuleMap;
}
