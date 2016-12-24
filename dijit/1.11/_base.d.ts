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
	}
}
