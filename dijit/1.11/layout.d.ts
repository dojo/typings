declare namespace dijit {

	namespace layout {

		/* dijit/_LayoutWidget */

		/* tslint:disable:class-name */
		interface _LayoutWidget extends _Widget, _Container, _Contained {

			/**
			 * Base class for a _Container widget which is responsible for laying
			 * out its children. Widgets which mixin this code must define layout()
			 * to manage placement and sizing of the children.
			 */
			baseClass: string;
			/**
			 * Indicates that this widget is going to call resize() on its
			 * children widgets, setting their size, when they become visible.
			 */
			isLayoutContainer: boolean;

			/**
			 * Call this to resize a widget, or after its size has changed.
			 *
			 * ####Change size mode:
			 *
			 * When changeSize is specified, changes the marginBox of this widget
			 * and forces it to re-layout its contents accordingly.
			 * changeSize may specify height, width, or both.
			 *
			 * If resultSize is specified it indicates the size the widget will
			 * become after changeSize has been applied.
			 *
			 * ####Notification mode:
			 *
			 * When changeSize is null, indicates that the caller has already changed
			 * the size of the widget, or perhaps it changed because the browser
			 * window was resized. Tells widget to re-layout its contents accordingly.
			 *
			 * If resultSize is also specified it indicates the size the widget has
			 * become.
			 *
			 * In either mode, this method also:
			 *
			 * 1. Sets this._borderBox and this._contentBox to the new size of
			 * 	the widget. Queries the current domNode size if necessary.
			 * 2. Calls layout() to resize contents (and maybe adjust child widgets).
			 */
			resize(changeSize?: dojo.DomGeometryBox, resultSize?: dojo.DomGeometryWidthHeight): void;

			/**
			 * Widgets override this method to size and position their contents/children.
			 * When this is called, this._contentBox is guaranteed to be set (see resize()).
			 *
			 * This is called after startup(), and also when the widget's size has been
			 * changed.
			 */
			layout(): void;
		}

		/* dijit/ContentPane */

		interface ContentPane extends _Widget, _Container, _ContentPaneResizeMixin {

			/**
			 * The href of the content that displays now
			 * Set this at construction if you want to load data externally when th
			 * pane is shown.  (Set preload=true to load it immediately.
			 * Changing href after creation doesn't have any effect; Use set('href', ...);
			 */
			href: string;

			/**
			 * The innerHTML of the ContentPane
			 * Note that the initialization parameter / argument to set("content", ...
			 * can be a String, DomNode, Nodelist, or _Widget.
			 */
			content: dojo.ContentSetterContent | dijit._Widget;

			/**
			 * Extract visible content from inside of `<body> .... </body>`
			 * I.e., strip `<html>` and `<head>` (and it's contents) from the href
			 */
			extractContent: boolean;

			/**
			 * Parse content and create the widgets, if any.
			 */
			parseOnLoad: boolean;

			/**
			 * Flag passed to parser.  Root for attribute names to search for.   If scopeName is dojo
			 * will search for data-dojo-type (or dojoType).  For backwards compatibilit
			 * reasons defaults to dojo._scopeName (which is "dojo" except whe
			 * multi-version support is used, when it will be something like dojo16, dojo20, etc.)
			 */
			parserScope: string;

			/**
			 * Prevent caching of data from href's by appending a timestamp to the href.
			 */
			preventCache: boolean;

			/**
			 * Force load of data on initialization even if pane is hidden.
			 */
			preload: boolean;

			/**
			 * Refresh (re-download) content when pane goes from hidden to shown
			 */
			refreshOnShow: boolean;

			/**
			 * Message that shows while downloading
			 */
			loadingMessage: string;

			/**
			 * Message that shows if an error occurs
			 */
			errorMessage: string;

			/**
			 * True if the ContentPane has data in it, either specifie
			 * during initialization (via href or inline content), or se
			 * via set('content', ...) / set('href', ...
			 * False if it doesn't have any content, or if ContentPane i
			 * still in the process of downloading href.
			 */
			isLoaded: boolean;

			baseClass: string;

			/**
			 * Function that should grab the content specified via href.
			 */
			ioMethod<T>(url: string, options?: dojo.request.XhrBaseOptions): dojo.request.Promise<T>;

			/**
			 * Parameters to pass to xhrGet() request, for example:
			 * |	<div data-dojo-type="dijit/layout/ContentPane" data-dojo-props="href: './bar', ioArgs: {timeout: 500}">
			 */
			ioArgs: { [arg: string]: string | number };

			/**
			 * This is the `dojo.Deferred` returned by set('href', ...) and refresh()
			 * Calling onLoadDeferred.then() registers you
			 * callback to be called only once, when the prior set('href', ...) call o
			 * the initial href parameter to the constructor finishes loading
			 * This is different than an onLoad() handler which gets called any time any hre
			 * or content is loaded.
			 */
			onLoadDeferred: dojo.Deferred<any>;

			/**
			 * Flag to parser that I'll parse my contents, so it shouldn't.
			 */
			stopParser: boolean;

			/**
			 * Flag from the parser that this ContentPane is inside a templat
			 * so the contents are pre-parsed.
			 */
			template: boolean;

			markupFactory<T>(params: any, node: HTMLElement, ctor: dojo.GenericConstructor<T>): T;
			create(params: any, srcNodeRef: HTMLElement): void;
			postMixInProperties(): void;
			buildRendering(): void;

			/**
			 * Call startup() on all children including non _Widget ones like dojo/dnd/Source objects
			 */
			startup(): void;

			/**
			 * Deprecated.   Use set('href', ...) instead.
			 */
			setHref(href: string | URL): ContentPane;

			/**
			 * Deprecated.   Use set('content', ...) instead.
			 */
			setContent(data: dojo.ContentSetterContent): ContentPane;

			/**
			 * Cancels an in-flight download of content
			 */
			cancel(): void;

			destroy(): void;

			/**
			 * Destroy the ContentPane and its contents
			 */
			destroyRecursive(): void;

			/**
			 * [Re]download contents of href and display
			 */
			refresh(): dojo.Deferred<any>;

			/**
			 * Destroy all the widgets inside the ContentPane and empty containerNode
			 */
			destroyDescendants(preserveDom?: boolean): void;

			/**
			 * Event hook, is called after everything is loaded and widgetified
			 */
			onLoad(data?: any): void;

			/**
			 * Event hook, is called before old content is cleared
			 */
			onUnload(): void;

			/**
			 * Called before download starts.
			 */
			onDownloadStart(): string;

			/**
			 * Called on DOM faults, require faults etc. in content.
			 * In order to display an error message in the pane, return
			 * the error message from this method, as an HTML string.
			 * By default (if this method is not overriden), it returns
			 * nothing, so the error message is just printed to the console.
			 */
			onContentError(error: Error): void;

			/**
			 * Called when download error occurs.
			 * In order to display an error message in the pane, return
			 * the error message from this method, as an HTML string.
			 * Default behavior (if this method is not overriden) is to display
			 * the error message inside the pane.
			 */
			onDownloadError(error: Error): void;

			/**
			 * Called when download is finished.
			 */
			onDownloadEnd(): void;
		}

		interface ContentPaneConstructor extends _WidgetBaseConstructor<ContentPane> { }

		/* dijit/layout/_ContentPaneResizeMixin */

		/* tslint:disable:class-name */
		interface _ContentPaneResizeMixin {

			/**
			 * - false - don't adjust size of children
			 * - true - if there is a single visible child widget, set it's size to however big the ContentPane is
			 */
			doLayout: boolean;

			/**
			 * Indicates that this widget will call resize() on it's child widgets
			 * when they become visible.
			 */
			isLayoutContainer: boolean;

			/**
			 * See `dijit/layout/_LayoutWidget.startup()` for description.
			 * Although ContentPane doesn't extend _LayoutWidget, it does implement
			 * the same API.
			 */
			startup(): void;

			/**
			 * See `dijit/layout/_LayoutWidget.resize()` for description.
			 * Although ContentPane doesn't extend _LayoutWidget, it does implement
			 * the same API.
			 */
			resize(changeSize?: dojo.DomGeometryBox, resultSize?: dojo.DomGeometryWidthHeight): void;
		}

		/* dijit/layout/StackContainer */

		interface StackContainer extends _LayoutWidget {
			/**
			 * If true, change the size of my currently displayed child to match my size.
			 */
			doLayout: boolean;

			/**
			 * Remembers the selected child across sessions.
			 */
			persist: boolean;

			selectChild<T extends dijit._WidgetBase>(page: T | string, animate: boolean): dojo.promise.Promise<any>;

			forward(): dojo.promise.Promise<any>;

			back(): dojo.promise.Promise<any>;

			closeChild<T extends dijit._WidgetBase>(page: T): void;

			/**
			 * Destroy all the widgets inside the StackContainer and empty containerNode
			 */
			destroyDescendants(preserveDom?: boolean): void;
		}

		interface StackContainerConstructor extends _WidgetBaseConstructor<StackContainer> { }

		interface StackContainerChildWidget extends _WidgetBase {
			/**
			 * Specifies that this widget should be the initially displayed pane.
			 * Note: to change the selected child use `dijit/layout/StackContainer.selectChild`
			 */
			 selected: boolean;

			/**
			 * Specifies that the button to select this pane should be disabled.
			 * Doesn't affect programmatic selection of the pane, nor does it deselect the pane if it is currently selected.
			 */
			 disabled: boolean;

			/**
			 * True if user can close (destroy) this child, such as (for example) clicking the X on the tab.
			 */
			 closable: boolean;

			/**
			 * CSS class specifying icon to use in label associated with this pane.
			 */
			 iconClass: string;

			/**
			 * When true, display title of this widget as tab label etc., rather than just using
			 * icon specified in iconClass.
			 */
			 showTitle: boolean;
		}

		/* dijit/layout/StackController */

		interface StackController extends _Widget, _TemplatedMixin, _Container {

			/**
			 * The id of the page container I point to.
			 */
			containerId: string;

			/**
			 * The buntton widget to create to correspond to each page.
			 */
			buttonWidget: _WidgetBase;

			/**
			 * CSS class of [x] close icon used by event delegation code to tell when
			 * the close button was clicked.
			 */
			buttonWidgetCloseClass: string;

			/**
			 * Returns the button corresponding to the pane with the given id.
			 */
			pane2button<T extends _WidgetBase>(id: string): T;

			/**
			 * Called after the StackContainer has finished initializing.
			 */
			onStartup(info: Object): void;

			/**
			 * Called whenever a page is added to the container. Create button
			 * corresponding to the page.
			 */
			onAddChild<T extends _WidgetBase>(page: T, insertIndex?: number): void;

			/**
			 * Called whenever a page is removed from the container. Remove the
			 * button corresponding to the page.
			 */
			onRemoveChild<T extends _WidgetBase>(page: T): void;

			/**
			 * Called when a page has been selected in the StackContainer, either
			 * by me or by another StackController.
			 */
			onSelectChild<T extends _WidgetBase>(page: T): void;

			/**
			 * Called whenever one of my child buttons is pressed in an attempt to
			 * select a page.
			 */
			onButtonClick<T extends _WidgetBase>(page: T): void;

			/**
			 * Called whenever one of my child buttons [X] is pressed in an attempt
			 * to close a page.
			 */
			onCloseButtonClick<T extends _WidgetBase>(page: T): void;

			/**
			 * Helper for onkeydown to find next/previous button.
			 */
			adjacent(forward: boolean): dijit._WidgetBase;

			/**
			 * Handle keystrokes on the page list, for advancing to next/previous
			 * button and closing the page in the page is closable.
			 */
			onkeydown(e: Event, fromContainer?: boolean): void;

			/**
			 * Called when there was a keydown on the container.
			 */
			onContainerKeyDown(info: Object): void;
		}

		 interface StackControllerConstructor extends _WidgetBaseConstructor<StackController> { }

	}
}
