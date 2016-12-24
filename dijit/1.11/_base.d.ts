declare namespace dijit {
	namespace _base {

		/* dijit/_base/focus */

		type Bookmark = { isCollapsed: boolean, mark?: Range };
		type FocusNode = Element | null;
		type RemoveHandle = { remove(): void };

		/**
		 * Deprecated module to monitor currently focused node and stack of currently focused widgets.
		 *
		 * New code should access dijit/focus directly.
		 */
		interface focus {
			/**
			 * Currently focused item on screen
			 */
			_curFocus: FocusNode;

			/**
			 * Previously focused item on screen
			 */
			_prevFocus: FocusNode;

			/**
			 * Returns true if there is no text selected
			 */
			isCollapsed(): boolean;

			/**
			 * Retrieves a bookmark that can be used with moveToBookmark to return to the same range
			 */
			getBookmark(): Bookmark;

			/**
			 * Moves current selection to a bookmark
			 */
			moveToBookmark(bookmark: Bookmark): void;

			/**
			 * Called as getFocus(), this returns an Object showing the current focus and selected text.
			 *
			 * Called as getFocus(widget), where widget is a (widget representing) a button that was just pressed, it returns where focus was before that button was pressed.   (Pressing the button may have either shifted focus to the button, or removed focus altogether.)   In this case the selected text is not returned, since it can't be accurately determined.
			 */
			getFocus(menu: dijit._WidgetBase, openedForWindow?: Window): {
				node: FocusNode;
				bookmark: any;
				openedForWindow?: Window
			};

			/**
			 * List of currently active widgets (focused widget and it's ancestors)
			 */
			_activeStack: dijit._WidgetBase[];

			/**
			 * Registers listeners on the specified iframe so that any click or focus event on that iframe (or anything in it) is reported as a focus/click event on the `<iframe>` itself.
			 *
			 * Currently only used by editor.
			 */
			registerIframe(iframe: HTMLIFrameElement): RemoveHandle;

			/**
			 * Unregisters listeners on the specified iframe created by registerIframe.
			 * After calling be sure to delete or null out the handle itself.
			 */
			unregisterIframe(handle?: RemoveHandle): void;

			/**
			 * Registers listeners on the specified window (either the main window or an iframe's window) to detect when the user has clicked somewhere or focused somewhere.
			 *
			 * Users should call registerIframe() instead of this method.
			 */
			registerWin(targetWindow: Window, effectiveNode: Element): RemoveHandle;

			/**
			 * Unregisters listeners on the specified window (either the main window or an iframe's window) according to handle returned from registerWin().
			 * After calling be sure to delete or null out the handle itself.
			 */
			unregisterWin(handle?: RemoveHandle): void;
		}

		/* dijit/_base/manager */

		/**
		 * Deprecated.  Shim to methods on registry, plus a few other declarations.
		 *
		 * New code should access dijit/registry directly when possible.
		 */
		interface manager {
			// byId: typeof dijit.Registry.byId;
			// getUniqueId: typeof dijit.Registry.getUniqueId;
			// findWidgets: typeof dijit.Registry.findWidgets;
			// _destroyAll: typeof dijit.Registry._destroyAll;
			// byNode: typeof dijit.Registry.byNode;
			// getEnclosingWidget: typeof Registry.getEnclosingWidget;
			defaultDuration: number;
		}

		/* dijit/_base/place */

		type placeOnScreenAround = (node: Element, aroundNode: Element, aroundCorners: Object | any[], layoutNode?: dijit.LayoutNodeFunction) => void;

		/**
		 * Deprecated back compatibility module, new code should use dijit/place directly instead of using this module.
		 */
		interface place {
			/**
			 * Deprecated method to return the dimensions and scroll position of the viewable area of a browser window.
			 *
			 * New code should use windowUtils.getBox()
			 */
			getViewport(): dojo.DomGeometryBox;

			placeOnScreen: typeof dijit.Place.at;

			/**
			 * Like dijit.placeOnScreenAroundNode(), except it accepts an arbitrary object for the "around" argument and finds a proper processor to place a node.
			 *
			 * Deprecated, new code should use dijit/place.around() instead.
			 */
			placeOnScreenAroundElement: placeOnScreenAround;

			/**
			 * Position node adjacent or kitty-corner to aroundNode such that it's fully visible in viewport.
			 *
			 * Deprecated, new code should use dijit/place.around() instead.
			 */
			placeOnScreenAroundNode: placeOnScreenAround;

			/**
			 * Like dijit.placeOnScreenAroundNode(), except that the "around" parameter is an arbitrary rectangle on the screen (x, y, width, height) instead of a dom node.
			 *
			 * Deprecated, new code should use dijit/place.around() instead.
			 */
			placeOnScreenAroundRectangle: placeOnScreenAround;

			/**
			 * Deprecated method, unneeded when using dijit/place directly.
			 *
			 * Transforms the passed array of preferred positions into a format suitable for passing as the aroundCorners argument to dijit/place.placeOnScreenAroundElement.
			 */
			getPopupAroundAlignment(position: string[], leftToRight?: boolean): { [s: dijit.PlaceCorner]: dijit.PlaceCorner };
		}

		/* dijit/_base/popup */

		/**
		 * Deprecated.   Old module for popups, new code should use dijit/popup directly.
		 */
		interface popup extends dijit.popup { }

		/* dijit/_base/scroll */

		/**
		 * Back compatibility module, new code should use windowUtils directly instead of using this module.
		 */
		interface scroll { }

		/* dijit/_base/sniff */

		/**
		 * Deprecated, back compatibility module, new code should require dojo/uacss directly instead of this module.
		 */
		interface sniff { }
	}
}
