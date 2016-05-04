/// <reference path="dojo.d.ts" />

declare namespace dojo {
	namespace on {
		/* dojo/on/asyncEventListener */

		interface AsyncEventListener {
			/**
			 * This sub module provide an event factory for delayed events (like debounce or throttle)
			 */
			(listener: EventListener): EventListener;
		}

		/* dojo/on/debounce */

		interface Debounce {
			/**
			 * event parser for custom events
			 */
			(selector: string | ExtensionEvent, delay: number): ExtensionEvent;
		}

		/* dojo/on/throttle */

		interface Throttle {
			(selector: string | ExtensionEvent, delay: number): ExtensionEvent;
		}
	}
}
