declare namespace dojo {
	namespace router {

		/* dojo/router/RouterBase */

		interface RouterBaseArgs { }

		interface RouterBaseCallback {
			(event: RouterBaseEvent): void;
		}

		interface RouterBaseEvent extends Event {
			params: string[] | any;
			oldPath: string;
			newPath: string;
			preventDefault(): void;
			stopImmediatePropagation(): void;
		}

		interface RouterBaseHandle extends Handle {
			register(callback: RouterBaseCallback, isBefore?: boolean): RouterBaseHandle;
		}

		interface RouterBase {
			_routes: any[];
			_routeIndex: { [id: string]: any };
			_started: boolean;
			_currentPath: string;
			idMatch: RegExp;
			idReplacement: string;
			globMatch: RegExp;
			globReplacement: string;

			/**
			 * Registers a route to a handling callback
			 */
			register(route: string | RegExp, callback: RouterBaseCallback): RouterBaseHandle;

			/**
			 * Registers a route to a handling callback, except before
			 * any previously registered callbacks
			 */
			registerBefore(route: string | RegExp, callback: RouterBaseCallback): RouterBaseHandle;

			/**
			 * A simple pass-through to make changing the hash easy,
			 * without having to require dojo/hash directly. It also
			 * synchronously fires off any routes that match.
			 */
			go(path: string, replace?: boolean): boolean;

			/**
			 * This method must be called to activate the router. Until
			 * startup is called, no hash changes will trigger route
			 * callbacks.
			 */
			startup(defaultPath?: string): void;

			destroy(): void;

			_handlePathChange(newPath: string): boolean;
			_convertRouteToRegExp(router: string): RegExp;
			_getParameterNames(route: string): string[];
			_indexRoutes(): void;
			_registerRoute(route: string | RegExp, callback: RouterBaseCallback, isBefore?: boolean): RouterBaseHandle;
		}

		interface RouterBaseConstructor {
			new (kwArgs: RouterBaseArgs): RouterBase;
		}
	}
}
