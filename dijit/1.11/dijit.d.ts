declare namespace dijit {
	/* Global Dijit Interface */
	interface Dijit { }

	/* dijit/_AttachMixin */

	/* tslint:disable:class-name */

	interface _WidgetBase extends dojo.Stateful, Destroyable {
		dojoAttachEvent: string;
		dojoAttachPoint: string;
	}

	interface _AttachMixin {
		/**
		 * List of widget attribute names associated with data-dojo-attach-point=... in the template, ex: ["containerNode", "labelNode"]
		 */
		_attachPoints: string[];

		/**
		 * List of connections associated with data-dojo-attach-event=... in the template
		 */
		_attachEvents: dojo.Handle[];

		/**
		 * Object to which attach points and events will be scoped.  Defaults to 'this'.
		 */
		attachScope: any;

		/**
		 * Search descendants of this.containerNode for data-dojo-attach-point and data-dojo-attach-event.
		 *
		 * Should generally be left false (the default value) both for performance and to avoid failures when this.containerNode holds other _AttachMixin instances with their own attach points and events.
		 */
		searchContainerNode: boolean;

		/**
		 * Attach to DOM nodes marked with special attributes.
		 */
		buildRendering(): void;

		/**
		 * hook for _WidgetsInTemplateMixin
		 */
		_beforeFillContent(): void;

		/**
		 * Iterate through the dom nodes and attach functions and nodes accordingly.
		 *
		 * Map widget properties and functions to the handlers specified in the dom node and it's descendants. This function iterates over all nodes and looks for these properties:
		 * - dojoAttachPoint/data-dojo-attach-point
		 * - dojoAttachEvent/data-dojo-attach-event
		 */
		_attachTemplateNodes(rootNode: Element | Node): void;

		/**
		 * Process data-dojo-attach-point and data-dojo-attach-event for given node or widget.
		 *
		 * Returns true if caller should process baseNode's children too.
		 */
		_processTemplateNode<T extends (Element | Node | _WidgetBase)>(
			baseNode: T,
			getAttrFunc: (baseNode: T, attr: string) => string,
			attachFunc: (node: T, type: string, func?: Function) => dojo.Handle
		): boolean;

		/**
		 * Roughly corresponding to dojo/on, this is the default function for processing a data-dojo-attach-event.  Meant to attach to DOMNodes, not to widgets.
		 */
		_attach(node: Element | Node, type: string, func?: Function): dojo.Handle;

		/**
		 * Detach and clean up the attachments made in _attachtempalteNodes.
		 */
		_detachTemplateNodes(): void;

		destroyRendering(preserveDom?: boolean): void;
	}

	interface _AttachMixinConstructor extends dojo._base.DeclareConstructor<_AttachMixin> { }

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

	/* dijit/_ConfirmDialogMixin */

	interface _ConfirmDialogMixin extends _WidgetsInTemplateMixin {
		/**
		 * HTML snippet for action bar, overrides _DialogMixin.actionBarTemplate
		 */
		actionBarTemplate: string;

		/**
		 * Label of OK button.
		 */
		buttonOk: string;

		/**
		 * Label of cancel button.
		 */
		buttonCancel: string;
	}

	/* dijit/_Contained */

	interface _Contained {
		/**
		 * Returns the previous child of the parent or null if this is the
		 * first child of the parent.
		 */
		getPreviousSibling<T extends _WidgetBase>(): T;

		/**
		 * Returns the next child of the parent or null if this is the last
		 * child of the parent.
		 */
		getNextSibling<T extends _WidgetBase>(): T;

		/**
		 * Returns the index of this widget within its container parent.
		 * It returns -1 if the parent does not exist or if the parent is
		 * not a dijit/_Container.
		 */
		getIndexInParent(): number;
	}

	interface _ContainedConstructor extends dojo._base.DeclareConstructor<_Contained> { }

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
		removeChild<T extends _WidgetBase>(widget: T): void;
		removeChild<T extends number>(widget: number): void;

		/**
		 * Returns true if widget has child widgets, i.e. if this.containerNode contains widgets.
		 */
		hasChildren(): boolean;

		/**
		 * Gets the index of the child in this container or -1 if not found
		 */
		getIndexOfChild<T extends _WidgetBase>(widget: T): number;
	}

	interface _ContainerConstructor extends dojo._base.DeclareConstructor<_Container> { }

	/* dijit/_CssStateMixin */

	interface CSSStateNodes {
		[node: string]: string;
	}

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

	interface _CssStateMixinConstructor extends dojo._base.DeclareConstructor<_CssStateMixin> { }

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

	/* dijit/_FocusMixin */
	interface _FocusMixin { }

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

	/* dijit/_HasDropDown */

	interface _HasDropDown<T extends _WidgetBase> extends _FocusMixin {
		/**
		 * The button/icon/node to click to display the drop down.
		 * Can be set via a data-dojo-attach-point assignment.
		 * If missing, then either focusNode or domNode (if focusNode is also missing) will be used.
		 */
		_buttonNode: HTMLElement;

		/**
		 * Will set CSS class dijitUpArrow, dijitDownArrow, dijitRightArrow etc. on this node depending
		 * on where the drop down is set to be positioned.
		 * Can be set via a data-dojo-attach-point assignment.
		 * If missing, then _buttonNode will be used.
		 */
		_arrowWrapperNode: HTMLElement;

		/**
		 * The node to set the aria-expanded class on.
		 * Also sets popupActive class but that will be removed in 2.0.
		 * Can be set via a data-dojo-attach-point assignment.
		 * If missing, then focusNode or _buttonNode (if focusNode is missing) will be used.
		 */
		_popupStateNode: HTMLElement;

		/**
		 * The node to display the popup around.
		 * Can be set via a data-dojo-attach-point assignment.
		 * If missing, then domNode will be used.
		 */
		_aroundNode: HTMLElement;

		/**
		 * The widget to display as a popup.  This widget *must* be
		 * defined before the startup function is called.
		 */
		dropDown: T;

		/**
		 * Set to true to make the drop down at least as wide as this
		 * widget.  Set to false if the drop down should just be its
		 * default width.
		 */
		autoWidth: boolean;

		/**
		 * Set to true to make the drop down exactly as wide as this
		 * widget.  Overrides autoWidth.
		 */
		forceWidth: boolean;

		/**
		 * The max height for our dropdown.
		 * Any dropdown taller than this will have scrollbars.
		 * Set to 0 for no max height, or -1 to limit height to available space in viewport
		 */
		maxHeight: number;

		/**
		 * This variable controls the position of the drop down.
		 * It's an array of strings
		 */
		dropDownPosition: string[];
		/* TODO remove for TS 1.8 */
		/* dropDownPosition: ('before' | 'after' | 'above' | 'below')[]; */

		/**
		 * When set to false, the click events will not be stopped, in
		 * case you want to use them in your subclass
		 */
		_stopClickEvents: boolean;

		/**
		 * Callback when the user mousedown/touchstart on the arrow icon.
		 */
		_onDropDownMouseDown(e: MouseEvent): void;

		/**
		 * Callback on mouseup/touchend after mousedown/touchstart on the arrow icon.
		 * Note that this function is called regardless of what node the event occurred on (but only after
		 * a mousedown/touchstart on the arrow).
		 */
		_onDropDownMouseUp(e?: MouseEvent): void;

		/**
		 * The drop down was already opened on mousedown/keydown; just need to stop the event
		 */
		_onDropDownClick(e: MouseEvent): void;

		buildRendering(): void;
		postCreate(): void;
		destroy(preserveDom?: boolean): void;

		/**
		 * Returns true if the dropdown exists and it's data is loaded.  This can
		 * be overridden in order to force a call to loadDropDown().
		 */
		isLoaded(): boolean;

		/**
		 * Creates the drop down if it doesn't exist, loads the data
		 * if there's an href and it hasn't been loaded yet, and then calls
		 * the given callback.
		 */
		loadDropDown(loadCallback: () => void): void;

		/**
		 * Creates the drop down if it doesn't exist, loads the data
		 * if there's an href and it hasn't been loaded yet, and
		 * then opens the drop down.  This is basically a callback when the
		 * user presses the down arrow button to open the drop down.
		 */
		loadAndOpenDropDown(): dojo.Deferred<T>;

		/**
		 * Callback when the user presses the down arrow button or presses
		 * the down arrow key to open/close the drop down.
		 * Toggle the drop-down widget; if it is up, close it, if not, open it
		 */
		toggleDropDown(): void;

		/**
		 * Opens the dropdown for this widget.   To be called only when this.dropDown
		 * has been created and is ready to display (ie, it's data is loaded).
		 */
		openDropDown(): PlaceLocation;

		/**
		 * Closes the drop down on this widget
		 */
		closeDropDown(focus?: boolean): void;
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

	interface _TemplatedMixinConstructor extends _WidgetBaseConstructor<_TemplatedMixin> {
		/**
		 * Static method to get a template based on the templatePath or
		 * templateString key
		 */
		getCachedTemplate(templateString: string, alwaysUseString: string, doc?: Document): string | HTMLElement;
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
		emit(type: string, eventObj?: any, callbackArgs?: any[]): any;

		/**
		 * Call specified function when event occurs, ex: myWidget.on("click", function(){ ... }).
		 */
		on(type: string | dojo.ExtensionEvent, func: dojo.EventListener | Function): dojo.WatchHandle;

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
		placeAt<T extends _WidgetBase>(reference: dojo.NodeFragmentOrString | T, position?: string | number): this;

		/**
		 * Wrapper to setTimeout to avoid deferred functions executing
		 * after the originating widget has been destroyed.
		 * Returns an object handle with a remove method (that returns null) (replaces clearTimeout).
		 */
		defer(fcn: Function, delay?: number): dojo.Handle;
	}

	interface _WidgetBaseConstructor<W> extends Pick<dojo._base.DeclareConstructor<W>, Exclude<keyof dojo._base.DeclareConstructor<W>, 'new'>> {
		new (params?: Partial<W> & ThisType<W>, srcNodeRef?: dojo.NodeOrString): W & dojo._base.DeclareCreatedObject;
	}

	/* dijit/_WidgetsInTemplateMixin */

	interface _WidgetsInTemplateMixin {
		/**
		 * Used to provide a context require to dojo/parser in order to be
		 * able to use relative MIDs (e.g. `./Widget`) in the widget's template.
		 */
		contextRequire: Function;

		startup(): void;
	}

	interface _WidgetsInTemplateMixinConstructor extends dojo._base.DeclareConstructor<_WidgetsInTemplateMixin> {
		new (params: Object, srcNodeRef: dojo.NodeOrString): _WidgetsInTemplateMixin;
	}

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

	/* dijit/Calendar */

	interface _MonthDropDownButton extends form.DropDownButton<_MonthDropDown> {
		onMonthSelect(): void;
		postCreate(): void;

		set(name: 'month', value: number): this;
		set(name: string, value: any): this;
		set(values: Object): this;
	}

	interface _MonthDropDownButtonConstructor extends _WidgetBaseConstructor<_MonthDropDownButton> { }

	interface _MonthDropDown extends _Widget, _TemplatedMixin, _CssStateMixin {
		months: string[];
		baseClass: string;
		templateString: string;

		/**
		 * Callback when month is selected from drop down
		 */
		onChange(month: number): void;

		set(name: 'months', value: string[]): this;
		set(name: string, value: any): this;
		set(values: Object): this;
	}

	interface _MonthDropDownConstructor extends _WidgetBaseConstructor<_MonthDropDown> { }

	interface Calendar extends CalendarLite, _Widget, _CssStateMixin {

		baseClass: string;

		/**
		 * Set node classes for various mouse events, see dijit._CssStateMixin for more details
		 */
		cssStateNodes: CSSStateNodes;

		/**
		 * Creates the drop down button that displays the current month and lets user pick a new one
		 */
		_createMonthWidget(): _MonthDropDownButton;

		postCreate(): void;

		/**
		 * Handler for when user selects a month from the drop down list
		 */
		_onMonthSelect(newMonth: number): void;

		/**
		 * Handler for mouse over events on days, sets hovered style
		 */
		_onDayMouseOver(evt: MouseEvent): void;

		/**
		 * Handler for mouse out events on days, clears hovered style
		 */
		_onDayMouseOut(evt: MouseEvent): void;
		_onDayMouseDown(evt: MouseEvent): void;
		_onDayMouseUp(evt: MouseEvent): void;

		/**
		 * Provides keyboard navigation of calendar.
		 */
		handleKey(evt: KeyboardEvent): void;

		/**
		 * For handling keydown events on a stand alone calendar
		 */
		_onKeyDown(evt: KeyboardEvent): void;

		/**
		 * Deprecated.   Notification that a date cell was selected.  It may be the same as the previous value.
		 */
		onValueSelected(date: Date): void;

		onChange(date: Date): void;

		/**
		 * May be overridden to return CSS classes to associate with the date entry for the given dateObject
		 * for example to indicate a holiday in specified locale.
		 */
		getClassForDate(dateObject: Date, locale?: string): string;

		get(name: 'value'): Date;
		get(name: string): any;

		set(name: 'value', value: number | Date): this;
		set(name: string, value: any): this;
		set(values: Object): this;
	}

	interface CalendarConstructor extends _WidgetBaseConstructor<Calendar> {
		_MonthWidget: _MonthWidgetConstructor;
		_MonthDropDown: _MonthDropDownButtonConstructor;
		_MonthDropDownButton: _MonthDropDownButtonConstructor;
	}

	/* dijit/CalendarLite */

	interface _MonthWidget extends _WidgetBase {
		set(name: 'month', value: Date): this;
		set(name: string, value: any): this;
		set(values: Object): this;
	}

	interface _MonthWidgetConstructor extends _WidgetBaseConstructor<_MonthWidget> { }

	interface CalendarLite extends _WidgetBase, _TemplatedMixin {
		/**
		 * Template for main calendar
		 */
		templateString: string;

		/**
		 * Template for cell for a day of the week (ex: M)
		 */
		dowTemplateString: string;

		dateTemplateString: string;
		weekTemplateString: string;

		/**
		 * The currently selected Date, initially set to invalid date to indicate no selection.
		 */
		value: Date;

		/**
		 * JavaScript namespace to find calendar routines.	 If unspecified, uses Gregorian calendar routines
		 * at dojo/date and dojo/date/locale.
		 */
		datePackage: string;

		/**
		 * How to represent the days of the week in the calendar header. See locale
		 */
		dayWidth: string;

		/**
		 * Order fields are traversed when user hits the tab key
		 */
		tabIndex: string;

		/**
		 * (Optional) The first day of week override. By default the first day of week is determined
		 * for the current locale (extracted from the CLDR).
		 * Special value -1 (default value), means use locale dependent value.
		 */
		dayOffset: number;

		/**
		 * Date object containing the currently focused date, or the date which would be focused
		 * if the calendar itself was focused.   Also indicates which year and month to display,
		 * i.e. the current "page" the calendar is on.
		 */
		currentFocus: Date;

		/**
		 * Put the summary to the node with role=grid
		 */
		_setSummaryAttr: string;

		baseClass: string;

		/**
		 * Runs various tests on the value, checking that it's a valid date, rather
		 * than blank or NaN.
		 */
		_isValidDate(value: Date): boolean;

		/**
		 * Convert Number into Date, or copy Date object.   Then, round to nearest day,
		 * setting to 1am to avoid issues when DST shift occurs at midnight, see #8521, #9366)
		 */
		_patchDate(value: number | Date): Date;

		/**
		 * This just sets the content of node to the specified text.
		 * Can't do "node.innerHTML=text" because of an IE bug w/tables, see #3434.
		 */
		_setText(node: HTMLElement, text?: string): void;

		/**
		 * Fills in the calendar grid with each day (1-31).
		 * Call this on creation, when moving to a new month.
		 */
		_populateGrid(): void;

		/**
		 * Fill in localized month, and prev/current/next years
		 */
		_populateControls(): void;

		/**
		 * Sets calendar's value to today's date
		 */
		goToToday(): void;

		/**
		 * Creates the drop down button that displays the current month and lets user pick a new one
		 */
		_createMonthWidget(): void;

		buildRendering(): void;
		postCreate(): void;

		/**
		 * Set up connects for increment/decrement of months/years
		 */
		_connectControls(): void;

		/**
		 * If the calendar currently has focus, then focuses specified date,
		 * changing the currently displayed month/year if necessary.
		 * If the calendar doesn't have focus, updates currently
		 * displayed month/year, and sets the cell that will get focus
		 * when Calendar is focused.
		 */
		_setCurrentFocusAttr(date: Date, forceFocus?: boolean): void;

		/**
		 * Focus the calendar by focusing one of the calendar cells
		 */
		focus(): void;

		/**
		 * Handler for day clicks, selects the date if appropriate
		 */
		_onDayClick(evt: MouseEvent): void;

		/**
		 * Returns the cell corresponding to the date, or null if the date is not within the currently
		 * displayed month.
		 */
		_getNodeByDate(value: Date): HTMLElement;

		/**
		 * Marks the specified cells as selected, and clears cells previously marked as selected.
		 * For CalendarLite at most one cell is selected at any point, but this allows an array
		 * for easy subclassing.
		 */
		_markSelectedDates(dates: Date[]): void;

		/**
		 * Called only when the selected date has changed
		 */
		onChange(date: Date): void;

		/**
		 * May be overridden to disable certain dates in the calendar e.g. `isDisabledDate=dojo.date.locale.isWeekend`
		 */
		isDisabledDate(dateObject: Date, locale?: string): boolean;

		/**
		 * May be overridden to return CSS classes to associate with the date entry for the given dateObject,
		 * for example to indicate a holiday in specified locale.
		 */
		getClassForDate(dateObject: Date, locale?: string): string;

		get(name: 'value'): Date;
		get(name: string): any;

		set(name: 'value', value: number | Date): this;
		set(name: string, value: any): this;
		set(values: Object): this;
	}

	interface CalendarLiteConstructor extends _WidgetBaseConstructor<CalendarLite> {
		_MonthWidget: _MonthWidgetConstructor;
	}

	/* dijit/Destroyable */

	interface Destroyable {
		_destroyed?: true;

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

	/**
	 * Mixin to track handles and release them when instance is destroyed.
	 */
	interface DestroyableConstructor extends dojo._base.DeclareConstructor<Destroyable> { }

	/** dijit/_KeyNavMixin */

	/**
	 * A mixin to allow arrow key and letter key navigation of child or descendant widgets.
	 * It can be used by dijit/_Container based widgets with a flat list of children, or more complex widgets like dijit/Tree.
	 *
	 * To use this mixin, the subclass must:
	 *
	 * 	- Implement  _getNext(), _getFirst(), _getLast(), _onLeftArrow(), _onRightArrow() _onDownArrow(), _onUpArrow() methods to handle home/end/left/right/up/down keystrokes. Next and previous in this context refer to a linear ordering of the descendants used by letter key search.
	 * 	- Set all descendants' initial tabIndex to "-1"; both initial descendants and any descendants added later, by for example addChild()
	 * 	- Define childSelector to a function or string that identifies focusable descendant widgets
	 *
	 * Also, child widgets must implement a focus() method.
	 */
	interface _KeyNavMixin extends _FocusMixin {
		/**
		 * Tab index of the container; same as HTML tabIndex attribute.
		 * Note then when user tabs into the container, focus is immediately moved to the first item in the container.
		 */
		tabIndex: string;

		/**
		 * Selector (passed to on.selector()) used to identify what to treat as a child widget.   Used to monitor focus events and set this.focusedChild.   Must be set by implementing class.   If this is a string (ex: "> *") then the implementing class must require dojo/query.
		 */
		childSelector: string | Function | null;

		/**
		 * Called on left arrow key, or right arrow key if widget is in RTL mode.
		 * Should go back to the previous child in horizontal container widgets like Toolbar.
		 */
		_onLeftArrow(evt?: KeyboardEvent): void;

		/**
		 * Called on right arrow key, or left arrow key if widget is in RTL mode.
		 * Should go to the next child in horizontal container widgets like Toolbar.
		 */
		_onRightArrow(evt?: KeyboardEvent): void;

		/**
		 * Called on up arrow key. Should go to the previous child in vertical container widgets like Menu.
		 */
		_onUpArrow(evt?: KeyboardEvent): void;

		/**
		 * Called on down arrow key. Should go to the next child in vertical container widgets like Menu.
		 */
		_onDownArrow(evt?: KeyboardEvent): void;

		/**
		 * Default focus() implementation: focus the first child.
		 */
		focus(): void;

		/**
		 * Returns first child that can be focused.
		 */
		_getFirstFocusableChild(): _WidgetBase;

		/**
		 * Returns last child that can be focused.
		 */
		_getLastFocusableChild(): _WidgetBase;

		/**
		 * Focus the first focusable child in the container.
		 */
		focusFirstChild(): void;

		/**
		 * Focus the last focusable child in the container.
		 */
		focusLastChild(): void;

		/**
		 * Focus specified child widget.
		 *
		 * @param widget Reference to container's child widget
		 * @param last If true and if widget has multiple focusable nodes, focus the last one instead of the first one
		 */
		focusChild(widget: _WidgetBase, last?: boolean): void;

		/**
		 * Handler for when the container itself gets focus.
		 *
		 * Initially the container itself has a tabIndex, but when it gets focus, switch focus to first child.
		 */
		_onContainerFocus(evt: Event): void;

		/**
		 * Called when a child widget gets focus, either by user clicking it, or programatically by arrow key handling code.
		 *
		 * It marks that the current node is the selected one, and the previously selected node no longer is.
		 */
		_onChildFocus(child?: _WidgetBase): void;

		_searchString: string;

		multiCharSearchDuration: number;

		/**
		 * When a key is pressed that matches a child item, this method is called so that a widget can take appropriate action is necessary.
		 */
		onKeyboardSearch(tem: _WidgetBase, evt: Event, searchString: string, numMatches: number): void;

		/**
		 * Compares the searchString to the widget's text label, returning:
		 *
		 * 	* -1: a high priority match  and stop searching
		 * 	* 0: not a match
		 * 	* 1: a match but keep looking for a higher priority match
		 */
		_keyboardSearchCompare(item: _WidgetBase, searchString: string): -1 | 0 | 1;

		/**
		 * When a key is pressed, if it's an arrow key etc. then it's handled here.
		 */
		_onContainerKeydown(evt: Event): void;

		/**
		 * When a printable key is pressed, it's handled here, searching by letter.
		 */
		_onContainerKeypress(evt: Event): void;

		/**
		 * Perform a search of the widget's options based on the user's keyboard activity
		 *
		 * Called on keypress (and sometimes keydown), searches through this widget's children looking for items that match the user's typed search string.  Multiple characters typed within 1 sec of each other are combined for multicharacter searching.
		 */
		_keyboardSearch(evt: Event, keyChar: string): void;

		/**
		 * Called when focus leaves a child widget to go to a sibling widget.
		 */
		_onChildBlur(widget: _WidgetBase): void;

		/**
		 * Returns the next or previous focusable descendant, compared to "child".
		 * Implements and extends _KeyNavMixin._getNextFocusableChild() for a _Container.
		 */
		_getNextFocusableChild(child: _WidgetBase, dir: 1 | -1): _WidgetBase | null;

		/**
		 * Returns the first child.
		 */
		_getFirst(): _WidgetBase | null;

		/**
		 * Returns the last descendant.
		 */
		_getLast(): _WidgetBase | null;

		/**
		 * Returns the next descendant, compared to "child".
		 */
		_getNext(child: _WidgetBase, dir: 1 | -1): _WidgetBase | null;
	}

	interface _KeyNavMixinConstructor extends dojo._base.DeclareConstructor<_KeyNavMixin> { }

	/* dijit/_KeyNavContainer */

	/**
	 * A _Container with keyboard navigation of its children.
	 *
	 * Provides normalized keyboard and focusing code for Container widgets.
	 * To use this mixin, call connectKeyNavHandlers() in postCreate().
	 * Also, child widgets must implement a focus() method.
	 */
	interface _KeyNavContainer extends _FocusMixin, _KeyNavMixin, _Container {
		/**
		 * Deprecated.  You can call this in postCreate() to attach the keyboard handlers to the container, but the preferred method is to override _onLeftArrow() and _onRightArrow(), or _onUpArrow() and _onDownArrow(), to call focusPrev() and focusNext().
		 *
		 * @param prevKeyCodes Key codes for navigating to the previous child.
		 * @param nextKeyCodes Key codes for navigating to the next child.
		 */
		connectKeyNavHandlers(prevKeyCodes: number[], nextKeyCodes: number[]): void;

		/**
		 * @deprecated
		 */
		startupKeyNavChildren(): void;

		/**
		 * Setup for each child widget.
		 *
		 * Sets tabIndex=-1 on each child, so that the tab key will leave the container rather than visiting each child.
		 *
		 * Note: if you add children by a different method than addChild(), then need to call this manually or at least make sure the child's tabIndex is -1.
		 *
		 * Note: see also _LayoutWidget.setupChild(), which is also called for each child widget.
		 */
		_startupChild(widget: _WidgetBase): void;

		/**
		 * Returns the first child.
		 */
		_getFirst(): _Widget | null;

		/**
		 * Returns the last descendant.
		 */
		_getLast(): _Widget | null;

		/**
		 * Focus the next widget
		 */
		focusNext(): void;

		/**
		 * Focus the last focusable node in the previous widget
		 *
		 * (ex: go to the ComboButton icon section rather than button section)
		 */
		focusPrev(): void;

		/**
		 * Implement _KeyNavMixin.childSelector, to identify focusable child nodes.
		 *
		 * If we allowed a dojo/query dependency from this module this could more simply be a string "> *" instead of this function.
		 */
		childSelector(node: Element | Node): boolean | void | any;
	}

	interface _KeyNavContainerConstructor extends dojo._base.DeclareConstructor<_KeyNavContainer> { }

	/* dijit/_MenuBase */

	/**
	 * Abstract base class for Menu and MenuBar.
	 * Subclass should implement _onUpArrow(), _onDownArrow(), _onLeftArrow(), and _onRightArrow().
	 */
	interface _MenuBase extends _Widget, _TemplatedMixin, _KeyNavContainer, _CssStateMixin {
		selected: MenuItem | null;

		_setSelectedAttr(item?: MenuItem | null): void;

		/**
		 * This Menu has been clicked (mouse or via space/arrow key) or opened as a submenu, so mere mouseover will open submenus.  Focusing a menu via TAB does NOT automatically make it active since TAB is a navigation operation and not a selection one.
		 *
		 * For Windows apps, pressing the ALT key focuses the menubar menus (similar to TAB navigation) but the menu is not active (ie no dropdown) until an item is clicked.
		 */
		activated: boolean;

		_setActivatedAttr(val: boolean): void;

		/**
		 * pointer to menu that displayed me
		 */
		parentMenu: _Widget | null;

		/**
		 * After a menu has been activated (by clicking on it etc.), number of milliseconds before hovering (without clicking) another MenuItem causes that MenuItem's popup to automatically open.
		 */
		popupDelay: number;

		/**
		 * For a passive (unclicked) Menu, number of milliseconds before hovering (without clicking) will cause the popup to open.  Default is Infinity, meaning you need to click the menu to open it.
		 */
		passivePopupDelay: number;

		/**
		 * A toggle to control whether or not a Menu gets focused when opened as a drop down from a MenuBar or DropDownButton/ComboButton.   Note though that it always get focused when opened via the keyboard.
		 */
		autoFocus: boolean;

		/**
		 * Selector (passed to on.selector()) used to identify MenuItem child widgets, but exclude inert children like MenuSeparator.  If subclass overrides to a string (ex: "> *"), the subclass must require dojo/query.
		 */
		childSelector(node: Element | Node): boolean | void | Function;

		/**
		 * Attach point for notification about when a menu item has been executed. This is an internal mechanism used for Menus to signal to their parent to close them, because they are about to execute the onClick handler.  In general developers should not attach to or override this method.
		 */
		onExecute(): void;

		/**
		 * Attach point for notification about when the user cancels the current menu
		 * This is an internal mechanism used for Menus to signal to their parent to close them.  In general developers should not attach to or override this method.
		 */
		onCancel(): void;

		/**
		 * This handles the right arrow key (left arrow key on RTL systems), which will either open a submenu, or move to the next item in the ancestor MenuBar
		 */
		_moveToPopup(evt: Event): void;

		/**
		 * This handler is called when the mouse moves over the popup.
		 */
		_onPopupHover(evt?: MouseEvent): void;

		/**
		 * Called when cursor is over a MenuItem.
		 */
		onItemHover(item: MenuItem): void;

		/**
		 * Called when a child MenuItem becomes deselected.   Setup timer to close its popup.
		 */
		_onChildDeselect(item: MenuItem): void;

		/**
		 * Callback fires when mouse exits a MenuItem
		 */
		onItemUnhover(item: MenuItem): void;

		/**
		 * Cancels the popup timer because the user has stop hovering on the MenuItem, etc.
		 */
		_stopPopupTimer(): void;

		/**
		 * Cancels the pending-close timer because the close has been preempted
		 */
		_stopPendingCloseTimer(): void;

		/**
		 * Returns the top menu in this chain of Menus
		 */
		_getTopMenu(): void;

		/**
		 * Handle clicks on an item.
		 */
		onItemClick(item: _WidgetBase, evt: Event): void;

		/**
		 * Open the popup to the side of/underneath the current menu item, and optionally focus first item
		 */
		_openItemPopup(fromItem: MenuItem, focus: boolean): void;

		/**
		 * Callback when this menu is opened.
		 * This is called by the popup manager as notification that the menu was opened.
		 */
		onOpen(evt?: Event): void;

		/**
		 * Callback when this menu is closed.
		 * This is called by the popup manager as notification that the menu was closed.
		 */
		onClose(): boolean;

		/**
		 * Called when submenu is clicked or focus is lost.  Close hierarchy of menus.
		 */
		_closeChild(): void;
		/**
		 * Called when child of this Menu gets focus from:
		 *
		 *  1. clicking it
		 *  2. tabbing into it
		 *  3. being opened by a parent menu.
		 *
		 * This is not called just from mouse hover.
		 */
		_onItemFocus(item: MenuItem): void;

		/**
		 * Called when focus is moved away from this Menu and it's submenus.
		 */
		_onBlur(): void;

		/**
		 * Called when the user is done with this menu.  Closes hierarchy of menus.
		 */
		_cleanUp(clearSelectedItem?: boolean): void;
	}

	interface _MenuBaseConstructor extends _WidgetBaseConstructor<_MenuBase> { }

	/* dijit/Dialog */

	interface _DialogBase extends _TemplatedMixin, form._FormMixin, _DialogMixin, _CssStateMixin {
		templateString: string;
		baseClass: string;
		cssStateNodes: CSSStateNodes;

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

		destroy(preserveDom?: boolean): void;
	}

	interface _DialogBaseConstructor extends _WidgetBaseConstructor<_DialogBase> { }

	interface Dialog extends layout.ContentPane, _DialogBase {
		/* overrides conflicting methods */
		resize(dim?: dojo.DomGeometryWidthHeight): void;
	}

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

	/* dijit/ConfirmDialog */

	interface ConfirmDialog extends _ConfirmDialogMixin { }

	interface ConfirmDialogConstructor extends DialogConstructor { }

	/* dijit/DropDownMenu */

	/**
	 * A menu, without features for context menu (Meaning, drop down menu)
	 */
	interface DropDownMenu extends _MenuBase { }

	interface DropDownMenuConstructor extends _WidgetBaseConstructor<DropDownMenu> { }

	/* dijit/Fieldset */

	/**
	 * An accessible fieldset that can be expanded or collapsed via
	 * its legend.  Fieldset extends `dijit.TitlePane`.
	 */
	interface Fieldset extends TitlePane {
		open: boolean;
	}

	interface FieldsetConstructor extends _WidgetBaseConstructor<Fieldset> { }

	/* dijit/Menu */

	/**
	 * A context menu you can assign to multiple elements
	 */
	interface Menu extends dijit.DropDownMenu {
		/**
		 * Array of dom node ids of nodes to attach to.
		 * Fill this with nodeIds upon widget creation and it becomes context menu for those nodes.
		 */
		targetNodeIds: string[];

		/**
		 * CSS expression to apply this Menu to descendants of targetNodeIds, rather than to
		 * the nodes specified by targetNodeIds themselves.  Useful for applying a Menu to
		 * a range of rows in a table, tree, etc.
		 *
		 * The application must require() an appropriate level of dojo/query to handle the selector.
		 */
		selector: string;

		/**
		 * If true, right clicking anywhere on the window will cause this context menu to open.
		 * If false, must specify targetNodeIds.
		 */
		contextMenuForWindow: boolean;

		/**
		 * If true, menu will open on left click instead of right click, similar to a file menu.
		 */
		leftClickToOpen: boolean;

		/**
		 * When this menu closes, re-focus the element which had focus before it was opened.
		 */
		refocus: boolean;

		/**
		 * Attach menu to given node
		 */
		bindDomNode(node: string | Node): void;

		/**
		 * Detach menu from given node
		 */
		unBindDomNode(nodeName: string | Node): void;
	}

	interface MenuConstructor extends _WidgetBaseConstructor<Menu> { }

	/* dijit/MenuBar */
	interface MenuBar extends _MenuBase {
		baseClass: 'dijitMenuBar';
		popupDelay: number;
		_isMenuBar: true;
		_orient: string[];
		_moveToPopup(evt: Event): void;
		focusChild(item: _WidgetBase): void;
		_onChildDeselect(item: _WidgetBase): void;
		_onLeftArrow(): void;
		_onRightArrow(): void;
		_onDownArrow(): void;
		_onUpArrow(): void;
		onItemClick(item: _WidgetBase, evt: Event): void;
	}

	interface MenuBarConstructor extends _WidgetBaseConstructor<MenuBar> { }

	/* dijit/MenuBarItem */
	interface MenuBarItem extends MenuItem { }

	interface MenuBarItemConstructor extends _WidgetBaseConstructor<MenuBarItem> { }

	/* dijit/MenuItem */
	interface MenuItem extends _Widget, _TemplatedMixin, _Contained, _CssStateMixin {
		/**
		 * Text for the accelerator (shortcut) key combination, a control, alt, etc. modified keystroke meant to execute the menu item regardless of where the focus is on the page.
		 *
		 * Note that although Menu can display accelerator keys, there is no infrastructure to actually catch and execute those accelerators.
		 */
		accelKey: string;

		/**
		 * If true, the menu item is disabled.
		 * If false, the menu item is enabled.
		 */
		disabled: boolean;

		/** Menu text as HTML */
		label: string;

		/**
		 * Class to apply to DOMNode to make it display an icon.
		 */
		iconClass: string;

		/**
		 * Hook for attr('accelKey', ...) to work.
		 * Set accelKey on this menu item.
		 */
		_setAccelKeyAttr(value: string): void;

		/**
		 * Hook for attr('disabled', ...) to work.
		 * Enable or disable this menu item.
		 */
		_setDisabledAttr(value: boolean): void;

		_setLabelAttr(val: string): void;
		_setIconClassAttr(val: string): void;

		_fillContent(source: Element): void;

		/**
		 * Indicate that this node is the currently selected one
		 */
		_setSelected(selected: boolean): void;

		focus(): void;

		/**
		 * Deprecated.
		 * Use set('disabled', bool) instead.
		 */
		setDisabled(disabled: boolean): void;

		/**
		 * Deprecated.
		 * Use set('label', ...) instead.
		 */
		setLabel(content: string): void;
	}

	interface MenuItemConstructor extends _WidgetBaseConstructor<MenuItem> { }

	/* dijit/MenuSeparator */
	interface MenuSeparator extends _WidgetBase, _TemplatedMixin, _Contained { }

	interface MenuSeparatorConstructor extends _WidgetBaseConstructor<MenuSeparator> { }

	/* dijit/place */

	interface PlacePosition {
		x: number;
		y: number;
	}

	interface PlaceWidthHeight {
		w: number;
		h: number;
	}

	interface PlaceRectangle extends PlacePosition, PlaceWidthHeight { }

	type PlaceCorner = 'BL' | 'TR' | 'BR' | 'TL';

	type PlacePositions = 'before' | 'after' | 'before-centered' | 'after-centered' | 'above-centered' | 'above' | 'above-alt' | 'below-centered' | 'below' | 'below-alt';

	interface PlaceChoice {
		corner: PlaceCorner;
		pos: PlacePosition;
		aroundCorner?: PlaceCorner;
	}

	interface PlaceLocation extends PlaceRectangle {
		corner: PlaceCorner;
		aroundCorner: PlaceCorner;
		overflow: number;
		spaceAvailable: PlaceWidthHeight;
	}

	interface LayoutNodeFunction {
		(node: HTMLElement, aroundCorner: string, corner: string, spaceAvailable: PlaceWidthHeight, aroundNodeCoords: PlaceWidthHeight): number;
	}

	interface Place {
		/**
		 * Positions node kitty-corner to the rectangle centered at (pos.x, pos.y) with width and height of
		 * padding.x * 2 and padding.y * 2, or zero if padding not specified.  Picks first corner in corners[]
		 * where node is fully visible, or the corner where it's most visible.
		 *
		 * Node is assumed to be absolutely or relatively positioned.
		 */
		at(node: Element, pos?: PlacePosition, corners?: PlaceCorner[], padding?: PlacePosition, layoutNode?: LayoutNodeFunction): PlaceLocation;

		/**
		 * Position node adjacent or kitty-corner to anchor
		 * such that it's fully visible in viewport.
		 */
		around(node: Element, anchor: Element | PlaceRectangle, positions: PlacePositions[], leftToRight?: boolean, layoutNode?: LayoutNodeFunction): PlaceLocation;
	}

	/* dijit/popup */

	interface PopupOpenArgs {
		/**
		 * widget to display
		 */
		popup?: _WidgetBase;

		/**
		 * the button etc. that is displaying this popup
		 */
		parent?: _WidgetBase;

		/**
		 * DOM node (typically a button); place popup relative to this node.  (Specify this *or* "x" and "y" parameters.)
		 */
		around?: HTMLElement;

		/**
		 * Absolute horizontal position (in pixels) to place node at.  (Specify this *or* "around" parameter.)
		 */
		x?: number;

		/**
		 * Absolute vertical position (in pixels) to place node at.  (Specify this *or* "around" parameter.)
		 */
		y?: number;

		/**
		 * When the around parameter is specified, orient should be a list of positions to try
		 */
		orient?: string | string[] | { BL?: string; TR?: string; TL?: string; BR?: string; };

		/**
		 * callback when user has canceled the popup by:
		 *
		 * 1. hitting ESC or
		 * 2. by using the popup widget's proprietary cancel mechanism (like a cancel button in a dialog);
		 *    i.e. whenever popupWidget.onCancel() is called, args.onCancel is called
		 */
		onCancel?: () => void;

		/**
		 * callback whenever this popup is closed
		 */
		onClose?: () => void;

		/**
		 * callback when user "executed" on the popup/sub-popup by selecting a menu choice, etc. (top menu only)
		 */
		onExecute?: () => void;

		/**
		 * adding a buffer around the opening position. This is only useful when around is not set.
		 */
		padding?: PlacePosition;

		/**
		 * The max height for the popup.  Any popup taller than this will have scrollbars.
		 * Set to Infinity for no max height.  Default is to limit height to available space in viewport,
		 * above or below the aroundNode or specified x/y position.
		 */
		maxHeight?: number;
	}

	interface PopupManager {
		/**
		 * Stack of currently popped up widgets.
		 * (someone opened _stack[0], and then it opened _stack[1], etc.)
		 */
		_stack: _WidgetBase[];

		/**
		 * Z-index of the first popup.   (If first popup opens other
		 * popups they get a higher z-index.)
		 */
		_beginZIndex: number;

		_idGen: number;

		/**
		 * If screen has been scrolled, reposition all the popups in the stack.
		 * Then set timer to check again later.
		 */
		_repositionAll(): void;

		/**
		 * Initialization for widgets that will be used as popups.
		 * Puts widget inside a wrapper DIV (if not already in one),
		 * and returns pointer to that wrapper DIV.
		 */
		_createWrapper(widget: _WidgetBase): HTMLDivElement;

		/**
		 * Moves the popup widget off-screen.
		 * Do not use this method to hide popups when not in use, because
		 * that will create an accessibility issue: the offscreen popup is
		 * still in the tabbing order.
		 */
		moveOffScreen(widget: _WidgetBase): HTMLDivElement;

		/**
		 * Hide this popup widget (until it is ready to be shown).
		 * Initialization for widgets that will be used as popups
		 *
		 * Also puts widget inside a wrapper DIV (if not already in one)
		 *
		 * If popup widget needs to layout it should
		 * do so when it is made visible, and popup._onShow() is called.
		 */
		hide(widget: _WidgetBase): void;

		/**
		 * Compute the closest ancestor popup that's *not* a child of another popup.
		 * Ex: For a TooltipDialog with a button that spawns a tree of menus, find the popup of the button.
		 */
		getTopPopup(): _WidgetBase;

		/**
		 * Popup the widget at the specified position
		 */
		open(args: PopupOpenArgs): PlaceLocation;

		/**
		 * Close specified popup and any popups that it parented.
		 * If no popup is specified, closes all popups.
		 */
		close(popup?: _WidgetBase): void;
	}

	/* dijit/PopupMenuBarItem */

	interface PopupMenuBarItem extends PopupMenuItem { }

	interface PopupMenuBarItemConstructor extends _WidgetBaseConstructor<PopupMenuBarItem> { }

	/** dijit/PopupMenuItem */

	/**
	 * An item in a Menu that spawn a drop down (usually a drop down menu)
	 */
	interface PopupMenuItem extends MenuItem {
		/**
		 * When Menu is declared in markup, this code gets the menu label and the popup widget from the srcNodeRef.
		 *
		 * srcNodeRef.innerHTML contains both the menu item text and a popup widget
		 * The first part holds the menu item text and the second part is the popup
		 */
		_fillContent(source: Element): void;

		/**
		 * Open the popup to the side of/underneath this MenuItem, and optionally focus first item
		 */
		_openPopup(params: { around?: Element; popup?: Function }, focus?: boolean): void;

		_closePopup(): void;
	}

	interface PopupMenuItemConstructor extends _WidgetBaseConstructor<PopupMenuItem> { }

	/* dijit/registry */

	interface Registry {
		/**
		 * Number of registered widgets
		 */
		length: number;

		/**
		 * Add a widget to the registry. If a duplicate ID is detected, a error is thrown.
		 */
		add(widget: _WidgetBase): void;

		/**
		 * Remove a widget from the registry. Does not destroy the widget; simply
		 * removes the reference.
		 */
		remove(id: string): void;

		/**
		 * Find a widget by it's id.
		 * If passed a widget then just returns the widget.
		 */
		byId(id: string | _WidgetBase): _WidgetBase;

		/**
		 * Returns the widget corresponding to the given DOMNode
		 */
		byNode(node: Element | Node): _WidgetBase;

		/**
		 * Convert registry into a true Array
		 */
		toArray(): _WidgetBase[];

		/**
		 * Generates a unique id for a given widgetType
		 */
		getUniqueId(widgetType: string): string;

		/**
		 * Search subtree under root returning widgets found.
		 * Doesn't search for nested widgets (ie, widgets inside other widgets).
		 */
		findWidgets(root: Node, skipNode?: Node): _WidgetBase[];

		/**
		 * Returns the widget whose DOM tree contains the specified DOMNode, or null if
		 * the node is not contained within the DOM tree of any widget
		 */
		getEnclosingWidget(node: Element | Node): _WidgetBase;
	}

	/* dijit/TitlePane */

	interface TitlePane extends dijit.layout.ContentPane, _TemplatedMixin, _CssStateMixin {
		/**
		 * Whether pane can be opened or closed by clicking the title bar.
		 */
		toggleable: boolean;

		/**
		 * Tabindex setting for the title (so users can tab to the title then use space/enter to open/close the title pane)
		 */
		tabIndex: string;

		/**
		 * Time in milliseconds to fade in/fade out
		 */
		duration: number;

		/**
		 * Don't change this parameter from the default value.
		 *
		 * This ContentPane parameter doesn't make sense for TitlePane, since TitlePane is never a child of a layout container, nor should TitlePane try to control the size of an inner widget.
		 */
		doLayout: boolean;

		/**
		 * Switches between opened and closed state
		 */
		toggle(): void;

		/**
		 * Set the open/close css state for the TitlePane
		 */
		_setCss(): void;

		/**
		 * Handler for when user hits a key
		 */
		_onTitleKey(e: Event): void;

		/**
		 * Handler when user clicks the title bar
		 */
		_onTitleClick(): void;

		/**
		 * Deprecated. Use set('title', ...) instead.
		 */
		setTitle(): void;
	}

	interface TitlePaneConstructor extends _WidgetBaseConstructor<TitlePane> { }

	/* dijit/Toolbar */

	interface Toolbar extends dijit._Widget, dijit._TemplatedMixin, dijit._KeyNavContainer { }

	interface ToolbarConstructor extends _WidgetBaseConstructor<Toolbar> { }

	/* dijit/ToolbarSeparator */

	interface ToolbarSeparator extends dijit._Widget, dijit._TemplatedMixin { }

	interface ToolbarSeparatorConstructor extends _WidgetBaseConstructor<ToolbarSeparator> { }

	/* dijit/Tooltip */

	interface Tooltip extends _Widget {
		/**
		 * HTML to display in the tooltip.
		 * Specified as innerHTML when creating the widget from markup.
		 */
		label: string;

		/**
		 * Number of milliseconds to wait after hovering over/focusing on the object, before
		 * the tooltip is displayed.
		 */
		showDelay: number;

		/**
		 * Number of milliseconds to wait after unhovering the object, before
		 * the tooltip is hidden.  Note that blurring an object hides the tooltip immediately.
		 */
		hideDelay: number;

		/**
		 * Id of domNode(s) to attach the tooltip to.
		 * When user hovers over specified dom node(s), the tooltip will appear.
		 */
		connectId: dojo.NodeOrString | dojo.NodeOrString[];

		/**
		 * See description of `dijit/Tooltip.defaultPosition` for details on position parameter.
		 */
		position: string;

		/**
		 * CSS expression to apply this Tooltip to descendants of connectIds, rather than to
		 * the nodes specified by connectIds themselves.    Useful for applying a Tooltip to
		 * a range of rows in a table, tree, etc.   Use in conjunction with getContent() parameter.
		 * Ex: connectId: myTable, selector: "tr", getContent: function(node){ return ...; }
		 *
		 * The application must require() an appropriate level of dojo/query to handle the selector.
		 */
		selector: string;

		/**
		 * Attach tooltip to specified node if it's not already connected
		 */
		addTarget(node: dojo.NodeOrString): void;

		/**
		 * Detach tooltip from specified node
		 */
		removeTarget(node: dojo.NodeOrString): void;

		/**
		 * User overridable function that return the text to display in the tooltip.
		 */
		getContent(node: Node): Node;

		/**
		 * Display the tooltip; usually not called directly.
		 */
		open(target: Node): void;

		/**
		 * Hide the tooltip or cancel timer for show of tooltip
		 */
		close(): void;

		/**
		 * Called when the tooltip is shown
		 */
		onShow(): void;

		/**
		 * Called when the tooltip is hidden
		 */
		onHide(): void;
	}

	interface TooltipConstructor extends _WidgetBaseConstructor<Tooltip> {
		/**
		 * 	This variable controls the position of tooltips, if the position is not specified to
		 * 	the Tooltip widget or *TextBox widget itself.  It's an array of strings with the values
		 * 	possible for `dijit/place.around()`.   The recommended values are:
		 *
		 * 	- before-centered: centers tooltip to the left of the anchor node/widget, or to the right
		 * 	  in the case of RTL scripts like Hebrew and Arabic
		 * 	- after-centered: centers tooltip to the right of the anchor node/widget, or to the left
		 * 	  in the case of RTL scripts like Hebrew and Arabic
		 * 	- above-centered: tooltip is centered above anchor node
		 * 	- below-centered: tooltip is centered above anchor node
		 *
		 * 	The list is positions is tried, in order, until a position is found where the tooltip fits
		 * 	within the viewport.
		 *
		 * 	Be careful setting this parameter.  A value of "above-centered" may work fine until the user scrolls
		 * 	the screen so that there's no room above the target node.   Nodes with drop downs, like
		 * 	DropDownButton or FilteringSelect, are especially problematic, in that you need to be sure
		 * 	that the drop down and tooltip don't overlap, even when the viewport is scrolled so that there
		 * 	is only room below (or above) the target node, but not both.
		 */
		defaultPosition: [string];

		/**
		 * Static method to display tooltip w/specified contents in specified position.
		 * See description of dijit/Tooltip.defaultPosition for details on position parameter.
		 * If position is not specified then dijit/Tooltip.defaultPosition is used.
		 */
		show(innerHTML: string, aroundNode: PlaceRectangle, position?: [string], rtl?: boolean, textDir?: string, onMouseEnter?: Function, onMouseLeave?: Function): void;

		/**
		 * Hide the tooltip
		 */
		hide(aroundNode: PlaceRectangle): void;
	}

	/* dijit/TooltipDialog */

	interface TooltipDialog extends layout.ContentPane, _TemplatedMixin, form._FormMixin, _DialogMixin {
		/**
		 * Description of tooltip dialog (required for a11y)
		 */
		title: string;

		/**
		 * Don't change this parameter from the default value.
		 * This ContentPane parameter doesn't make sense for TooltipDialog, since TooltipDialog
		 * is never a child of a layout container, nor can you specify the size of
		 * TooltipDialog in order to control the size of an inner widget.
		 */
		doLayout: boolean;

		/**
		 * A Toggle to modify the default focus behavior of a Dialog, which
		 * is to focus on the first dialog element after opening the dialog.
		 * False will disable autofocusing.  Default: true.
		 */
		autofocus: boolean;

		/**
		 * The pointer to the first focusable node in the dialog.
		 */
		_firstFocusItem: any;

		/**
		 * The pointer to which node has focus prior to our dialog.
		 */
		_lastFocusItem: any;

		/**
		 * Configure widget to be displayed in given position relative to the button.
		 *
		 * This is called from the dijit.popup code, and should not be called directly.
		 */
		orient(node: Node | HTMLElement, aroundCorner: PlaceCorner, tooltipCorner: PlaceCorner): void;

		/**
		 * Focus on first field
		 */
		focus(): void;

		/**
		 * Called when dialog is displayed.
		 *
		 * This is called from the dijit.popup code, and should not be called directly.
		 */
		onOpen(pos: {
			aroundCorner: PlaceCorner
			aroundNodePos: PlacePosition
			corner: PlaceCorner
			x: number
			y: number
		}): void;

		/**
		 * Handler for keydown events
		 *
		 * Keep keyboard focus in dialog; close dialog on escape key
		 */
		_onKey(evt: KeyboardEvent): void;
	}

	interface TooltipDialogConstructor extends _WidgetBaseConstructor<TooltipDialog> { }
}
