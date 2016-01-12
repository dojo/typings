declare namespace dijit {
	/* Global Dijit Interface */
	interface Dijit {}

	/* dijit/a11yclick */

	interface A11yClick {

		/**
		 * Custom press, release, and click synthetic events
		 * which trigger on a left mouse click, touch, or space/enter keyup.
		 */
		(node: HTMLElement, listener: Function): dojo.Handle;

		/**
		 * Mousedown (left button), touchstart, or keydown (space or enter) corresponding to logical click operation.
		 */
		press: dojo.ExtensionEvent;

		/**
		 * Mouseup (left button), touchend, or keyup (space or enter) corresponding to logical click operation.
		 */
		release: dojo.ExtensionEvent;

		/**
		 * Mouse cursor or a finger is dragged over the given node.
		 */
		move: dojo.ExtensionEvent;
	}

	/* dijit/Destroyable */

	interface Destroyable {

		/**
		 * Destroy this class, releasing any resources registered via own().
		 */
		destroy(preserveDom?: boolean): void;

		/**
		 * Track specified handles and remove/destroy them when this instance is destroyed, unless they were
		 * already removed/destroyed manually.
		 */
		own(...args: any[]): any[];
	}

	interface DestroyableConstructor {
		/**
		 * Mixin to track handles and release them when instance is destroyed.
		 */
		new (): Destroyable;
	}

	/* dijit/Dialog */

	/* tslint:disable:class-name */
	interface _DialogBase extends _TemplatedMixin, form._FormMixin, _DialogMixin, _CssStatefulMixin {
		templateString: string;
		baseClass: string;
		cssStateNodes: { closeButtonNode: string };

		/**
		 * True if Dialog is currently displayed on screen.
		 */
		open: boolean;

		/**
		 * The time in milliseconds it takes the dialog to fade in and out
		 */
		duration: number;

		/**
		 * A Toggle to modify the default focus behavior of a Dialog, which
		 * is to re-focus the element which had focus before being opened.
		 * False will disable refocusing. Default: true
		 */
		refocus: boolean;

		/**
		 * A Toggle to modify the default focus behavior of a Dialog, which
		 * is to focus on the first dialog element after opening the dialog.
		 * False will disable autofocusing. Default: true
		 */
		autofocus: boolean;

		/**
		 * Toggles the movable aspect of the Dialog. If true, Dialog
		 * can be dragged by it's title. If false it will remain centered
		 * in the viewport.
		 */
		draggable: boolean;

		/**
		 * Maximum size to allow the dialog to expand to, relative to viewport size
		 */
		maxRatio: number;

		/**
		 * Dialog show [x] icon to close itself, and ESC key will close the dialog.
		 */
		closable: boolean;
		postMixInProperties(): void;
		postCreate(): void;

		/**
		 * Called when data has been loaded from an href.
		 * Unlike most other callbacks, this function can be connected to (via `dojo.connect`)
		 * but should *not* be overridden.
		 */
		onLoad(data?: any): void;

		focus(): void;

		/* Not entirely sure of the resolution type of these promises */

		/**
		 * Display the dialog
		 */
		show(): dojo.promise.Promise<any>;

		/**
		 * Hide the dialog
		 */
		hide(): dojo.promise.Promise<any>;

		/**
		 * Called with no argument when viewport scrolled or viewport size changed.  Adjusts Dialog as
		 * necessary to keep it visible.
		 *
		 * Can also be called with an argument (by dojox/layout/ResizeHandle etc.) to explicitly set the
		 * size of the dialog.
		 */
		resize(dim?: dojo.DomGeometryWidthHeight): void;

		destroy(): void;
	}

	interface _DialogBaseConstructor {
		new (params: any[], srcNodeRef?: HTMLElement): _DialogBase;
	}

	/* We have to manually override API extension conflicts with TypeScript */
	interface DialogContentPane extends layout.ContentPane {
		resize(dim?: dojo.DomGeometryWidthHeight): void;
	}

	interface Dialog extends DialogContentPane, _DialogBase { }

	interface DialogLevelManager {
		_beginZIndex: number;

		/**
		 * Call right before fade-in animation for new dialog.
		 *
		 * Saves current focus, displays/adjusts underlay for new dialog,
		 * and sets the z-index of the dialog itself.
		 *
		 * New dialog will be displayed on top of all currently displayed dialogs.
		 * Caller is responsible for setting focus in new dialog after the fade-in
		 * animation completes.
		 */
		show(dialog: _WidgetBase, underlayAttrs: Object): void;

		/**
		 * Called when the specified dialog is hidden/destroyed, after the fade-out
		 * animation ends, in order to reset page focus, fix the underlay, etc.
		 * If the specified dialog isn't open then does nothing.
		 *
		 * Caller is responsible for either setting display:none on the dialog domNode,
		 * or calling dijit/popup.hide(), or removing it from the page DOM.
		 */
		hide(dialog: _WidgetBase): void;

		/**
		 * Returns true if specified Dialog is the top in the task
		 */
		isTop(dialog: _WidgetBase): boolean;
	}

	interface DialogConstructor extends _WidgetBaseConstructor<Dialog> {
		/**
		 * A modal dialog Widget.
		 */
		new (params: any[], srcNodeRef?: HTMLElement): Dialog;

		/**
		 * for monkey patching and dojox/widget/DialogSimple
		 */
		_DialogBase: _DialogBaseConstructor;
		_DialogLevelManager: DialogLevelManager;
		_dialogStack: {
			dialog: _WidgetBase,
			focus: any,
			underlayAttrs: any
		}[];
	}

	/* dijit/_AttachMixin */

	interface _WidgetBase extends dojo.Stateful, Destroyable {
		dojoAttachEvent: string;
		dojoAttachPoint: string;
	}

	interface _AttachMixin {}

	/* dijit/_BidiMixin */

	interface _WidgetBase extends dojo.Stateful, Destroyable {

		/**
		 * Gets the right direction of text.
		 */
		getTextDir(text: string): string;

		/**
		 * Set element.dir according to this.textDir, assuming this.textDir has a value.
		 */
		applyTextDir(element: HTMLElement, text?: string): void;

		/**
		 * Wraps by UCC (Unicode control characters) option's text according to this.textDir
		 */
		enforceTextDirWithUcc(option: HTMLOptionElement, text: string): string;

		/**
		 * Restores the text of origObj, if needed, after enforceTextDirWithUcc, e.g. set("textDir", textDir).
		 */
		restoreOriginalText(origObj: HTMLOptionElement): HTMLOptionElement;
	}

	/* dijit/_Container */

	interface _Container {
		buildRendering(): void;

		/**
		 * Makes the given widget a child of this widget.
		 */
		addChild<T extends _WidgetBase>(widget: T, insertIndex?: number): void;

		/**
		 * Removes the passed widget instance from this widget but does
		 * not destroy it.  You can also pass in an integer indicating
		 * the index within the container to remove (ie, removeChild(5) removes the sixth widget)
		 */
		removeChild<T extends _WidgetBase>(widget: T | number): void;

		/**
		 * Returns true if widget has child widgets, i.e. if this.containerNode contains widgets.
		 */
		hasChildren(): boolean;

		/**
		 * Gets the index of the child in this container or -1 if not found
		 */
		getIndexOfChild<T extends _WidgetBase>(widget: T): number;
	}

	/* dijit/_CssStateMixin */

	interface _CssStateMixin {
		/**
		 * True if cursor is over this widget
		 */
		hovering: boolean;

		/**
		 * True if mouse was pressed while over this widget, and hasn't been released yet
		 */
		active: boolean;
	}

	/* dijit/_DialogMixin */

	interface _DialogMixin {
		/**
		 * HTML snippet to show the action bar (gray bar with OK/cancel buttons).
		 * Blank by default, but used by ConfirmDialog/ConfirmTooltipDialog subclasses.
		 */
		actionBarTemplate: string;

		/**
		 * Callback when the user hits the submit button.
		 * Override this method to handle Dialog execution.
		 */
		execute(formContents?: any): void;

		/**
		 * Called when user has pressed the Dialog's cancel button, to notify container.
		 */
		onCancel(): void;

		/**
		 * Called when user has pressed the dialog's OK button, to notify container.
		 */
		onExecute(): void;
	}

	/* dijit/_OnDijitClickMixin */

	interface _OnDijitClickMixin {
		/**
		 * override _WidgetBase.connect() to make this.connect(node, "ondijitclick", ...) work
		 */
		connect(obj: any, event: string | dojo.ExtensionEvent, method: string | dojo.EventListener): dojo.WatchHandle;
	}

	interface _OnDijitClickMixinConstructor {
		/**
		 * Deprecated.   New code should access the dijit/a11yclick event directly, ex:
		 * |	this.own(on(node, a11yclick, function(){ ... }));
		 *
		 * Mixing in this class will make _WidgetBase.connect(node, "ondijitclick", ...) work.
		 * It also used to be necessary to make templates with ondijitclick work, but now you can just require
		 * dijit/a11yclick.
		 */
		new (): _OnDijitClickMixin;
		a11yclick: A11yClick;
	}

	/* dijit/_FocusMixin */
	interface _FocusMixin {}

	interface _WidgetBase extends dojo.Stateful, Destroyable {
		/**
		 * Called when the widget becomes "active" because
		 * it or a widget inside of it either has focus, or has recently
		 * been clicked.
		 */
		onFocus(): void;

		/**
		 * Called when the widget stops being "active" because
		 * focus moved to something outside of it, or the user
		 * clicked somewhere outside of it, or the widget was
		 * hidden.
		 */
		onBlur(): void;
	}

	/* dijit/_TemplatedMixin */
	interface _TemplatedMixin extends _AttachMixin {

		/**
		 * A string that represents the widget template.
		 * Use in conjunction with dojo.cache() to load from a file.
		 */
		templateString: string;

		/**
		 * Path to template (HTML file) for this widget relative to dojo.baseUrl.
		 * Deprecated: use templateString with require([... "dojo/text!..."], ...) instead
		 */
		templatePath: string;

		/**
		 * Set _AttachMixin.searchContainerNode to true for back-compat for widgets that have data-dojo-attach-point's
		 * and events inside this.containerNode.   Remove for 2.0.
		 */
		searchContainerNode: boolean;

		/**
		 * Construct the UI for this widget from a template, setting this.domNode.
		 */
		buildRendering(): void;
	}

	interface _TemplatedMixinConstructor {
		new (params: any[], srcNodeRef: HTMLElement): _TemplatedMixin;

		/**
		 * Static method to get a template based on the templatePath or
		 * templateString key
		 */
		getCachedTemplate(templateString: string, alwaysUseString: string, doc?: Document): string|HTMLElement;
	}

	/* dijit/_Widget */
	interface _Widget extends _WidgetBase, _OnDijitClickMixin, _FocusMixin {
		/**
		 * Connect to this function to receive notifications of mouse click events.
		 */
		onClick(event: DocumentEvent): void;

		/**
		 * Connect to this function to receive notifications of mouse double click events.
		 */
		onDblClick(event: DocumentEvent): void;

		/**
		 * Connect to this function to receive notifications of keys being pressed down.
		 */
		onKeyDown(event: DocumentEvent): void;

		/**
		 * Connect to this function to receive notifications of printable keys being typed.
		 */
		onKeyPress(event: DocumentEvent): void;

		/**
		 * Connect to this function to receive notifications of keys being released.
		 */
		onKeyUp(event: DocumentEvent): void;

		/**
		 * Connect to this function to receive notifications of when the mouse button is pressed down.
		 */
		onMouseDown(event: DocumentEvent): void;

		/**
		 * Connect to this function to receive notifications of when the mouse moves over nodes contained within this widget.
		 */
		onMouseMove(event: DocumentEvent): void;

		/**
		 * Connect to this function to receive notifications of when the mouse moves off of nodes contained within this widget.
		 */
		onMouseOut(event: DocumentEvent): void;

		/**
		 * Connect to this function to receive notifications of when the mouse moves onto nodes contained within this widget.
		 */
		onMouseOver(event: DocumentEvent): void;

		/**
		 * Connect to this function to receive notifications of when the mouse moves off of this widget.
		 */
		onMouseLeave(event: DocumentEvent): void;

		/**
		 * Connect to this function to receive notifications of when the mouse moves onto this widget.
		 */
		onMouseEnter(event: DocumentEvent): void;

		/**
		 * Connect to this function to receive notifications of when the mouse button is released.
		 */
		onMouseUp(event: DocumentEvent): void;

		postCreate(): void;
		on(type: string | dojo.ExtensionEvent, func: dojo.EventListener): dojo.WatchHandle;

		/**
		 * Deprecated.  Use set() instead.
		 */
		setAttribute(attr: string, value: any): void;

		/**
		 * This method is deprecated, use get() or set() directly.
		 */
		attr(name: string | { [attr: string]: any }, value?: any): any;

		/**
		 * Returns all the widgets contained by this, i.e., all widgets underneath this.containerNode.
		 */
		getDescendants(): _Widget[];

		/**
		 * Called when this widget becomes the selected pane in a
		 * `dijit/layout/TabContainer`, `dijit/layout/StackContainer`,
		 * `dijit/layout/AccordionContainer`, etc.
		 *
		 * Also called to indicate display of a `dijit.Dialog`, `dijit.TooltipDialog`, or `dijit.TitlePane`.
		 */
		onShow(): void;

		/**
		 * Called when another widget becomes the selected pane in a
		 * `dijit/layout/TabContainer`, `dijit/layout/StackContainer`,
		 * `dijit/layout/AccordionContainer`, etc.
		 *
		 * Also called to indicate hide of a `dijit.Dialog`, `dijit.TooltipDialog`, or `dijit.TitlePane`.
		 */
		onHide(): void;

		/**
		 * Called when this widget is being displayed as a popup (ex: a Calendar popped
		 * up from a DateTextBox), and it is hidden.
		 * This is called from the dijit.popup code, and should not be called directly.
		 *
		 * Also used as a parameter for children of `dijit/layout/StackContainer` or subclasses.
		 * Callback if a user tries to close the child.   Child will be closed if this function returns true.
		 */
		onClose(): boolean;
	}

	/* dijit/_WidgetBase */
	interface _WidgetBase extends dojo.Stateful, Destroyable {

		/**
		 * A unique, opaque ID string that can be assigned by users or by the
		 * system. If the developer passes an ID which is known not to be
		 * unique, the specified ID is ignored and the system-generated ID is
		 * used instead.
		 */
		id: string;

		/**
		 * Rarely used.  Overrides the default Dojo locale used to render this widget,
		 * as defined by the [HTML LANG](http://www.w3.org/TR/html401/struct/dirlang.html#adef-lang) attribute.
		 * Value must be among the list of locales specified during by the Dojo bootstrap,
		 * formatted according to [RFC 3066](http://www.ietf.org/rfc/rfc3066.txt) (like en-us).
		 */
		lang: string;

		/**
		 * Bi-directional support, as defined by the [HTML DIR](http://www.w3.org/TR/html401/struct/dirlang.html#adef-dir)
		 * attribute. Either left-to-right "ltr" or right-to-left "rtl".  If undefined, widgets renders in page's
		 * default direction.
		 */
		dir: string;

		/**
		 * HTML class attribute
		 */
		class: string;

		/**
		 * HTML style attributes as cssText string or name/value hash
		 */
		style: string;

		/**
		 * HTML title attribute.
		 *
		 * For form widgets this specifies a tooltip to display when hovering over
		 * the widget (just like the native HTML title attribute).
		 *
		 * For TitlePane or for when this widget is a child of a TabContainer, AccordionContainer,
		 * etc., it's used to specify the tab label, accordion pane title, etc.  In this case it's
		 * interpreted as HTML.
		 */
		title: string;

		/**
		 * When this widget's title attribute is used to for a tab label, accordion pane title, etc.,
		 * this specifies the tooltip to appear when the mouse is hovered over that text.
		 */
		tooltip: string;

		/**
		 * Root CSS class of the widget (ex: dijitTextBox), used to construct CSS classes to indicate
		 * widget state.
		 */
		baseClass: string;

		/**
		 * pointer to original DOM node
		 */
		srcNodeRef: HTMLElement;

		/**
		 * This is our visible representation of the widget! Other DOM
		 * Nodes may by assigned to other properties, usually through the
		 * template system's data-dojo-attach-point syntax, but the domNode
		 * property is the canonical "top level" node in widget UI.
		 */
		domNode: HTMLElement;

		/**
		 * Designates where children of the source DOM node will be placed.
		 * "Children" in this case refers to both DOM nodes and widgets.
		 */
		containerNode: HTMLElement;

		/**
		 * The document this widget belongs to.  If not specified to constructor, will default to
		 * srcNodeRef.ownerDocument, or if no sourceRef specified, then to the document global
		 */
		ownerDocument: HTMLElement;

		/**
		 * Deprecated.	Instead of attributeMap, widget should have a _setXXXAttr attribute
		 * for each XXX attribute to be mapped to the DOM.
		 */
		attributeMap: { [attribute: string]: any };

		/**
		 * Bi-directional support,	the main variable which is responsible for the direction of the text.
		 * The text direction can be different than the GUI direction by using this parameter in creation
		 * of a widget.
		 */
		textDir: string;

		/**
		 * Kicks off widget instantiation.  See create() for details.
		 */
		postscript(params?: any, srcNodeRef?: HTMLElement): void;

		/**
		 * Kick off the life-cycle of a widget
		 */
		create(params?: any, srcNodeRef?: HTMLElement): void;

		/**
		 * Called after the parameters to the widget have been read-in,
		 * but before the widget template is instantiated. Especially
		 * useful to set properties that are referenced in the widget
		 * template.
		 */
		postMixInProperties(): void;

		/**
		 * Construct the UI for this widget, setting this.domNode.
		 * Most widgets will mixin `dijit._TemplatedMixin`, which implements this method.
		 */
		buildRendering(): void;

		/**
		 * Processing after the DOM fragment is created
		 */
		postCreate(): void;

		/**
		 * Processing after the DOM fragment is added to the document
		 */
		startup(): void;

		/**
		 * Destroy this widget and its descendants
		 */
		destroyRecursive(preserveDom?: boolean): void;

		/**
		 * Destroys the DOM nodes associated with this widget.
		 */
		destroyRendering(preserveDom?: boolean): void;

		/**
		 * Recursively destroy the children of this widget and their
		 * descendants.
		 */
		destroyDescendants(preserveDom?: boolean): void;

		/**
		 * Deprecated. Override destroy() instead to implement custom widget tear-down
		 * behavior.
		 */
		uninitialize(): boolean;

		/**
		 * Used by widgets to signal that a synthetic event occurred, ex:
		 * |	myWidget.emit("attrmodified-selectedChildWidget", {}).
		 */
		emit(type: string, eventObj: any, callbackArgs: any[]): any;

		/**
		 * Call specified function when event occurs, ex: myWidget.on("click", function(){ ... }).
		 */
		on(type: string | dojo.ExtensionEvent, func: dojo.EventListener): dojo.WatchHandle;

		/**
		 * Returns a string that represents the widget.
		 */
		toString(): string;

		/**
		 * Returns all direct children of this widget, i.e. all widgets underneath this.containerNode whose parent
		 * is this widget.   Note that it does not return all descendants, but rather just direct children.
		 */
		getChildren<T extends _WidgetBase>(): T[];

		/**
		 * Returns the parent widget of this widget.
		 */
		getParent<T extends _WidgetBase>(): T;

		/**
		 * Deprecated, will be removed in 2.0, use this.own(on(...)) or this.own(aspect.after(...)) instead.
		 */
		connect(obj: any, event: string | dojo.ExtensionEvent, method: string | dojo.EventListener): dojo.WatchHandle;

		/**
		 * Deprecated, will be removed in 2.0, use handle.remove() instead.
		 */
		disconnect(handle: dojo.WatchHandle): void;

		/**
		 * Deprecated, will be removed in 2.0, use this.own(topic.subscribe()) instead.
		 */
		subscribe(t: string, method: dojo.EventListener): dojo.WatchHandle;

		/**
		 * Deprecated, will be removed in 2.0, use handle.remove() instead.
		 */
		unsubscribe(handle: dojo.WatchHandle): void;

		/**
		 * Return this widget's explicit or implicit orientation (true for LTR, false for RTL)
		 */
		isLeftToRight(): boolean;

		/**
		 * Return true if this widget can currently be focused
		 * and false if not
		 */
		isFocusable(): boolean;

		/**
		 * Place this widget somewhere in the DOM based
		 * on standard domConstruct.place() conventions.
		 */
		placeAt<T extends _WidgetBase>(reference: dojo.NodeFragmentOrString | T, position?: string | number): _WidgetBase;

		/**
		 * Wrapper to setTimeout to avoid deferred functions executing
		 * after the originating widget has been destroyed.
		 * Returns an object handle with a remove method (that returns null) (replaces clearTimeout).
		 */
		defer(fcn: Function, delay?: number): dojo.Handle;
	}

	interface _WidgetBaseConstructor<T> extends dojo._base.DeclareConstructor<T> {
		new (params: any[], srcNodeRef: HTMLElement): T;
	}
}
