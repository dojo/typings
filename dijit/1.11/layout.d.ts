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

		interface _LayoutWidgetConstructor extends _WidgetBaseConstructor<_LayoutWidget> { }

		/* dijit/layout/_TabContainerBase */

		interface _TabContainerBase extends StackContainer, _TemplatedMixin {
			/**
			 * Defines where tabs go relative to tab content.
			 * "top", "bottom", "left-h", "right-h"
			 */
			tabPosition: string;
			// tabPosition: 'top' | 'bottom' | 'left-h' | 'right-h';

			/**
			 * Defines whether the tablist gets an extra class for layouting, putting a border/shading
			 * around the set of tabs.   Not supported by claro theme.
			 */
			tabStrip: boolean;

			/**
			 * If true, use styling for a TabContainer nested inside another TabContainer.
			 * For tundra etc., makes tabs look like links, and hides the outer
			 * border since the outer TabContainer already has a border.
			 */
			nested: boolean;
		}

		/* dijit/layout/LayoutContainer */

		interface LayoutContainer extends _LayoutWidget {
			/**
			 * Which design is used for the layout:
			 *
			 * - "headline" (default) where the top and bottom extend the full width of the container
			 * - "sidebar" where the left and right sides extend from top to bottom.
			 *
			 * However, a `layoutPriority` setting on child panes overrides the `design` attribute on the parent.
			 * In other words, if the top and bottom sections have a lower `layoutPriority` than the left and right
			 * panes, the top and bottom panes will extend the entire width of the box.
			 */
			design: string;
			// design: 'headline' | 'sidebar';

			addChild<T extends _WidgetBase>(child: T, insertIndex?: number): void;
			removeChild<T extends _WidgetBase>(child: T): void;
		}

		interface LayoutContainerConstructor extends _WidgetBaseConstructor<LayoutContainer> { }

		/* dijit/layout/AccordionContainer */

		interface _AccordionButton extends _WidgetBase, _TemplatedMixin, _CssStateMixin {
			/**
			 * Title of the pane.
			 */
			label: string;

			/**
			 * Tooltip that appears on hover.
			 */
			title: string;

			/**
			 * CSS class for icon to left of label.
			 */
			iconClassAttr: string;

			/**
			 * Returns the height of the title dom node.
			 */
			getTitleHeight(): number;
		}

		interface _AccordionButtonConstructor extends _WidgetBaseConstructor<_AccordionButton> { }

		interface AccordionContainer extends StackContainer {
			/**
			 * Amount of time (in ms) it takes to slide panes.
			 */
			duration: number;

			/**
			 * The name of the widget used to display the title of each pane.
			 */
			buttonWidget: _AccordionButtonConstructor;
		}

		interface AccordionContainerConstructor extends _WidgetBaseConstructor<AccordionContainer> { }

		/* dijit/layout/AccordionPane */

		interface AccordionPane extends ContentPane {
			/**
			 * Called when this pane is selected.
			 */
			onSelected(): void;
		}

		interface AccordionPaneConstructor extends _WidgetBaseConstructor<AccordionPane> { }

		/* dijit/layout/BorderContainer */

		interface BorderContainer extends LayoutContainer {
			/**
			 * Give each pane a border and margin.
			 * Margin determined by domNode.paddingLeft.
			 * When false, only resizable panes have a gutter (i.e. draggable splitter) for resizing.
			 */
			gutters: boolean;

			/**
			 * Specifies whether splitters resize as you drag (true) or only upon mouseup (false)
			 */
			liveSplitters: boolean;

			/**
			 * Save splitter positions in a cookie.
			 */
			persist: boolean;

			/**
			 * Returns the widget responsible for rendering the splitter associated with region.with
			 */
			getSplitter(region: string): any;

			destroyRecursive(): void;
		}

		interface BorderContainerConstructor extends _WidgetBaseConstructor<BorderContainer> { }

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

		interface _ContentPaneResizeMixinConstructor extends _WidgetBaseConstructor<_ContentPaneResizeMixin> { }

		/* dijit/layout/LinkPane */

		interface LinkPane extends ContentPane, _TemplatedMixin {
			/**
			 * A ContentPane with an href where (when declared in markup) the
			 * title is specified as innerHTML rather than as a title attribute.
			 */
		}

		interface LinkPaneConstructor extends _WidgetBaseConstructor<LinkPane> { }

		/* dijit/layout/ScrollingTabController */

		interface ScrollingTabController extends TabController, _WidgetsInTemplateMixin {
			/**
			 * True if a menu should be used to select tabs when they are too
			 * wide to fit the TabContainer, false otherwise.
			 */
			useMenu: boolean;

			/**
			 * True if a slider should be used to select tabs when they are too
			 * wide to fit the TabContainer, false otherwise.
			 */
			useSlider: boolean;

			/**
			 * The css class to apply to the tab strip, if it is visible.
			 */
			tabStripClass: string;

			/**
			 * Creates an Animation object that smoothly scrolls the tab list
			 * either to a fixed horizontal pixel value, or to the selected tab.
			 */
			createSmoothScroll(pixels?: number): dojo._base.Animation;

			/**
			 * Scrolls the menu to the right.
			 */
			doSlideRight(e: MouseEvent): void;

			/**
			 * Scrolls the menu to the left.
			 */
			doSlideLeft(e: MouseEvent): void;

			/**
			 * Scrolls the tab list to the left or right by 75% of the widget
			 * width.
			 */
			doSlide(direction: number, node: HTMLElement): void;
		}

		interface ScrollingTabControllerConstructor extends _WidgetBaseConstructor<ScrollingTabController> { }

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

			/**
			 * References the currently selected child widget, if any.
			 * Adjust selected child with selectChild() method.
			 */
			selectedChildWidget: _Widget;

			selectChild<T extends _WidgetBase>(page: T | string, animate: boolean): dojo.promise.Promise<any>;

			forward(): dojo.promise.Promise<any>;

			back(): dojo.promise.Promise<any>;

			closeChild<T extends _WidgetBase>(page: T): void;

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

		interface _StackButton extends dijit.form.ToggleButton {
			/**
			 * When true, display close button for this tab.
			 */
			closeButton: boolean;
		}

		interface _StackButtonConstructor extends _WidgetBaseConstructor<_StackButton> { }

		interface StackControllerBase extends _Widget, _TemplatedMixin, _Container {

			/**
			 * The id of the page container I point to.
			 */
			containerId: string;

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
			adjacent(forward: boolean): _WidgetBase;

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

		interface StackController extends StackControllerBase {
			/**
			 * The button widget to create to correspond to each page.
			 */
			buttonWidget: _StackButtonConstructor;
		}

		interface StackControllerConstructor extends _WidgetBaseConstructor<StackController> { }

		/* dijit/layout/TabContainer */

		interface TabContainer extends _TabContainerBase {

			/**
			 * True if a menu should be used to select tabs when they are too
			 * wide to fit the TabContainer, false otherwise.
			 */
			useMenu: boolean;

			/**
			 * True if a slider should be used to select tabs when they are too
			 * wide to fit the TabContainer, false otherwise.
			 */
			useSlider: boolean;

			/**
			 * An optional parameter to override the widget used to display the tab labels.
			 */
			controllerWidget: string;
		}

		interface TabContainerConstructor extends _WidgetBaseConstructor<TabContainer> { }

		/* dijit/layout/TabController */

		interface _TabButton extends _StackButton { }

		interface _TabButtonConstructor extends _WidgetBaseConstructor<_TabButton> { }

		interface TabController extends StackControllerBase {
			/**
			 * Defines where tabs go relative to the content.
			 * "top", "bottom", "left-h", "right-h"
			 */
			tabPosition: string;
			// tabPosition: 'top' | 'bottom' | 'left-h' | 'right-h';

			/**
			 * The tab widget to create to correspond to each page.
			 */
			buttonWidget: _TabButtonConstructor;

			/**
			 * Class of [x] close icon, used by event delegation code to tell
			 * when close button was clicked.
			 */
			buttonWidgetCloseClass: string;
		}

		interface TabControllerConstructor extends _WidgetBaseConstructor<TabController> {
			TabButton: _TabButton;
		}
	}
}
