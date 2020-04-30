declare namespace dijit {

	namespace form {

		/* implied */

		interface Constraints {
			[prop: string]: any;
		}

		interface ConstrainedValueFunction<V, C extends Constraints, T> {
			/**
			 * Returns a value that has been constrained by the constraints
			 * @param   value       The value to constrain
			 * @param   constraints The constraints to use
			 * @returns             The constrained value
			 */
			(value: V, constraints: C): T;
		}

		interface ConstrainedValidFunction<C extends Constraints> {
			/**
			 * Returns true if the value is valid based on the constraints, otherwise
			 * returns false.
			 * @param   value       The value to check
			 * @param   constraints The constraints to use
			 * @returns             true if valid, otherwise false
			 */
			(value: any, constraints: C): boolean;
		}

		interface ConstraintsToRegExpString<C extends Constraints> {
			/**
			 * Takes a set of constraints and returns a RegExpString that can be used
			 * to match values against
			 * @param   constraints The constraints to use
			 * @returns             The RegExpString that represents the constraints
			 */
			(constraints: C): string;
		}

		interface SerializationFunction {
			(val: any, options?: Object): string;
		}

		/* dijit/form/_AutoCompleterMixin */

		/* tslint:disable:class-name */
		interface _AutoCompleterMixin<T extends Object, Q extends dojo.store.api.BaseQueryType, O extends dojo.store.api.QueryOptions> extends _SearchMixin<T, Q, O> {
			/**
			 * This is the item returned by the dojo/store/api/Store implementation that
			 * provides the data for this ComboBox, it's the currently selected item.
			 */
			item: T;

			/**
			 * If user types in a partial string, and then tab out of the `<input>` box,
			 * automatically copy the first entry displayed in the drop down list to
			 * the `<input>` field
			 */
			autoComplete: boolean;

			/**
			 * One of: "first", "all" or "none".
			 */
			highlightMatch: string;
			/* TODO: Uncomment for TS 1.8 and remove above */
			/* highlightMatch: 'fisrt' | 'all' | 'none'; */

			/**
			 * The entries in the drop down list come from this attribute in the
			 * dojo.data items.
			 * If not specified, the searchAttr attribute is used instead.
			 */
			labelAttr: string;

			/**
			 * Specifies how to interpret the labelAttr in the data store items.
			 * Can be "html" or "text".
			 */
			labelType: string;

			/**
			 * Flags to _HasDropDown to limit height of drop down to make it fit in viewport
			 */
			maxHeight: number;

			/**
			 * For backwards compatibility let onClick events propagate, even clicks on the down arrow button
			 */
			_stopClickEvents: boolean;

			_getCaretPos(element: HTMLElement): number;
			_setCaretPos(element: HTMLElement, location: number): void;

			/**
			 * Overrides _HasDropDown.loadDropDown().
			 */
			loadDropDown(loadCallback: () => void): void;

			/**
			 * signal to _HasDropDown that it needs to call loadDropDown() to load the
			 * drop down asynchronously before displaying it
			 */
			isLoaded(): boolean;

			/**
			 * Overrides _HasDropDown.closeDropDown().  Closes the drop down (assuming that it's open).
			 * This method is the callback when the user types ESC or clicking
			 * the button icon while the drop down is open.  It's also called by other code.
			 */
			closeDropDown(focus?: boolean): void;

			postMixInProperties(): void;
			postCreate(): void;

			/**
			 * Highlights the string entered by the user in the menu.  By default this
			 * highlights the first occurrence found. Override this method
			 * to implement your custom highlighting.
			 */
			doHighlight(label: string, find: string): string;
			reset(): void;
			labelFunc(item: T, store: dojo.store.api.Store<T, Q, O>): string;

			set(name: 'value', value: string): this;
			set(name: 'item', value: T): this;
			set(name: 'disabled', value: boolean): this;
			set(name: string, value: any): this;
			set(values: Object): this;
		}

		/* dijit/form/_ButtonMixin */

		interface _ButtonMixin {
			/**
			 * A mixin to add a thin standard API wrapper to a normal HTML button
			 */
			label: string;

			/**
			 * Type of button (submit, reset, button, checkbox, radio)
			 */
			type: string;
			postCreate(): void;

			/**
			 * Callback for when button is clicked.
			 * If type="submit", return true to perform submit, or false to cancel it.
			 */
			onClick(e: DocumentEvent): boolean;
			onSetLabel(e: DocumentEvent): void;
		}

		/* dijit/form/_CheckBoxMixin */

		interface _CheckBoxMixin {
			/**
			 * type attribute on `<input>` node.
			 * Overrides `dijit/form/Button.type`.  Users should not change this value.
			 */
			type: string;

			/**
			 * As an initialization parameter, equivalent to value field on normal checkbox
			 * (if checked, the value is passed as the value when form is submitted).
			 */
			value: string;

			/**
			 * Should this widget respond to user input?
			 * In markup, this is specified as "readOnly".
			 * Similar to disabled except readOnly form values are submitted.
			 */
			readOnly: boolean;

			reset: () => void;
		}

		/* dijit/form/_ComboBoxMenu */

		interface _ComboBoxMenu<T> extends _WidgetBase, _TemplatedMixin, _ListMouseMixin, _ComboBoxMenuMixin<T> {
			templateString: string;
			baseClass: string;

			/**
			 * Add hover CSS
			 */
			onHover(node: HTMLElement): void;

			/**
			 * Remove hover CSS
			 */
			onUnhover(node: HTMLElement): void;

			/**
			 * Add selected CSS
			 */
			onSelect(node: HTMLElement): void;

			/**
			 * Remove selected CSS
			 */
			onDeselect(node: HTMLElement): void;

			/**
			 * Handles page-up and page-down keypresses
			 */
			_page(up?: boolean): void;

			/**
			 * Handle keystroke event forwarded from ComboBox, returning false if it's
			 * a keystroke I recognize and process, true otherwise.
			 */
			handleKey(evt: KeyboardEvent): boolean;

			set(name: string, value: any): this;
			set(values: Object): this;
		}

		interface _ComboBoxMenuConstructor extends _WidgetBaseConstructor<_ComboBoxMenu<any>> {
			new <T>(params: Object, srcNodeRef: dojo.NodeOrString): _ComboBoxMenu<T>;
		}

		/* dijit/form/_ComboBoxMenuMixin */

		interface _ComboBoxMenuMixin<T> {
			/**
			 * Holds "next" and "previous" text for paging buttons on drop down
			 */
			_messages: { next: string; previous: string; };

			onClick(node: HTMLElement): void;

			/**
			 * Notifies ComboBox/FilteringSelect that user selected an option.
			 */
			onChange(direction: number): void;

			/**
			 * Notifies ComboBox/FilteringSelect that user clicked to advance to next/previous page.
			 */
			onPage(direction: number): void;

			/**
			 * Callback from dijit.popup code to this widget, notifying it that it closed
			 */
			onClose(): void;

			/**
			 * Fills in the items in the drop down list
			 */
			createOptions(results: T[], options: dojo.store.api.QueryOptions, labelFunc: (item: T) => { html: boolean; label: string; }): void;

			/**
			 * Clears the entries in the drop down list, but of course keeps the previous and next buttons.
			 */
			clearResultList(): void;

			/**
			 * Highlight the first real item in the list (not Previous Choices).
			 */
			highlightFirstOption(): void;

			/**
			 * Highlight the last real item in the list (not More Choices).
			 */
			highlightLastOption(): void;

			selectFirstNode(): void;
			selectLastNode(): void;
			getHighlightedOption(): HTMLElement;

			set(name: 'value', value: Object): this;
			set(name: string, value: any): this;
			set(values: Object): this;
		}

		/* dijit/form/_DateTimeTextBox */

		interface DateTimeConstraints extends Constraints, dojo.date.DateLocaleFormatOptions { }

		interface _DateTimeTextBox<T extends _WidgetBase> extends RangeBoundTextBox, _HasDropDown<T> {
			templateString: string;

			/**
			 * Set this textbox to display a down arrow button, to open the drop down list.
			 */
			hasDownArrow: boolean;
			cssStateNodes: CSSStateNodes;

			/**
			 * Despite the name, this parameter specifies both constraints on the input
			 * (including starting/ending dates/times allowed) as well as
			 * formatting options like whether the date is displayed in long (ex: December 25, 2005)
			 * or short (ex: 12/25/2005) format.  See `dijit/form/_DateTimeTextBox.__Constraints` for details.
			 */
			constraints: DateTimeConstraints;

			/**
			 * The constraints without the min/max properties. Used by the compare() method
			 */
			_unboundedConstraints: DateTimeConstraints;

			pattern: (options?: dojo.date.DateLocaleFormatOptions | RangeBoundTextBoxConstraints) => string;

			/**
			 * JavaScript namespace to find calendar routines.	 If unspecified, uses Gregorian calendar routines
			 * at dojo/date and dojo/date/locale.
			 */
			datePackage: string;

			postMixInProperties(): void;
			compare(val1: Date, val2: Date): number;
			autoWidth: boolean;

			/**
			 * Formats the value as a Date, according to specified locale (second argument)
			 */
			format: ConstrainedValueFunction<Date, DateTimeConstraints, string>;

			/**
			 * Parses as string as a Date, according to constraints
			 */
			parse: ConstrainedValueFunction<string, DateTimeConstraints, Date>;

			serialize(val: any, options?: dojo.date.StampFormatOptions): string;

			/**
			 * The default value to focus in the popupClass widget when the textbox value is empty.
			 */
			dropDownDefaultValue: Date;

			/**
			 * The value of this widget as a JavaScript Date object.  Use get("value") / set("value", val) to manipulate.
			 * When passed to the parser in markup, must be specified according to `dojo/date/stamp.fromISOString()`
			 */
			value: Date;

			_blankValue: string;

			/**
			 * Name of the popup widget class used to select a date/time.
			 * Subclasses should specify this.
			 */
			popupClass: string | _WidgetBaseConstructor<T>;

			/**
			 * Specifies constraints.selector passed to dojo.date functions, should be either
			 * "date" or "time".
			 * Subclass must specify this.
			 */
			_selector: string;
			/* TODO: uncomment for TS 1.8 */
			/* _selector: 'data' | 'time'; */

			buildRendering(): void;

			/**
			 * Runs various tests on the value, checking for invalid conditions
			 */
			_isInvalidDate(value: Date): boolean;

			get(name: 'displayedValue'): string;
			get(name: string): any;

			set(name: 'displayedValue', value: string): this;
			set(name: 'dropDownDefaultValue', value: Date): this;
			set(name: 'value', value: Date | string): this;
			set(name: 'constraints', value: DateTimeConstraints): this;
			set(name: string, value: any): this;
			set(values: Object): this;
		}

		interface _DateTimeTextBoxConstructor<T extends _WidgetBase> extends _WidgetBaseConstructor<_DateTimeTextBox<T>> { }

		/* dijit/form/_ExpandingTextAreaMixin */

		interface _ExpandingTextAreaMixin {
			postCreate(): void;
			startup(): void;
			resize(): void;
		}

		/* dijit/form/_FormMixin */

		interface OnValidStateChange {
			(isValid?: boolean): void;
		}

		interface _FormMixin {

			/**
			 * Will be "Error" if one or more of the child widgets has an invalid value,
			 * "Incomplete" if not all of the required child widgets are filled in.  Otherwise, "",
			 * which indicates that the form is ready to be submitted.
			 */
			state: '' | 'Error' | 'Incomplete';

			/**
			 * Returns all form widget descendants, searching through non-form child widgets like BorderContainer
			 */
			_getDescendantFormWidgets(children?: _WidgetBase[]): _FormWidget[];

			reset(): void;

			/**
			 * returns if the form is valid - same as isValid - but
			 * provides a few additional (ui-specific) features:
			 *
			 * 1. it will highlight any sub-widgets that are not valid
			 * 2. it will call focus() on the first invalid sub-widget
			 */
			validate(): boolean;

			setValues(val: any): _FormMixin;
			getValues(): any;

			/**
			 * Returns true if all of the widgets are valid.
			 * Deprecated, will be removed in 2.0.  Use get("state") instead.
			 */
			isValid(): boolean;

			/**
			 * Stub function to connect to if you want to do something
			 * (like disable/enable a submit button) when the valid
			 * state changes on the form as a whole.
			 *
			 * Deprecated.  Will be removed in 2.0.  Use watch("state", ...) instead.
			 */
			onValidStateChange: OnValidStateChange;

			/**
			 * Compute what this.state should be based on state of children
			 */
			_getState(): '' | 'Error' | 'Incomplete';

			/**
			 * Deprecated method.   Applications no longer need to call this.   Remove for 2.0.
			 */
			disconnectChildren(): void;

			/**
			 * You can call this function directly, ex. in the event that you
			 * programmatically add a widget to the form *after* the form has been
			 * initialized.
			 */
			connectChildren(inStartup?: boolean): void;

			/**
			 * Called when child's value or disabled state changes
			 */
			_onChildChange(attr?: string): void;

			startup(): void;
			destroy(preserveDom?: boolean): void;
		}

		interface _FormMixinConstructor extends dojo._base.DeclareConstructor<_FormMixin> { }

		/* dijit/form/_FormSelectWidget */

		interface SelectOption {
			value?: string;
			label: string;
			selected?: boolean;
			disabled?: boolean;
		}

		interface _FormSelectWidget<T extends Object, Q extends dojo.store.api.BaseQueryType, O extends dojo.store.api.QueryOptions> extends _FormValueWidget {
			/**
			 * Whether or not we are multi-valued
			 */
			multiple: boolean;

			/**
			 * The set of options for our select item.  Roughly corresponds to
			 * the html `<option>` tag.
			 */
			options: SelectOption[];

			/**
			 * A store to use for getting our list of options - rather than reading them
			 * from the `<option>` html tags.   Should support getIdentity().
			 * For back-compat store can also be a dojo/data/api/Identity.
			 */
			store: dojo.store.api.Store<T, Q, O>;

			/**
			 * A query to use when fetching items from our store
			 */
			query: Q;

			/**
			 * Query options to use when fetching from the store
			 */
			queryOptions: O;

			/**
			 * The entries in the drop down list come from this attribute in the dojo.store items.
			 * If ``store`` is set, labelAttr must be set too, unless store is an old-style
			 * dojo.data store rather than a new dojo/store.
			 */
			labelAttr: string;

			/**
			 * A callback to do with an onFetch - but before any items are actually
			 * iterated over (i.e. to filter even further what you want to add)
			 */
			onFetch: (items: T[]) => void;

			/**
			 * Flag to sort the options returned from a store by the label of
			 * the store.
			 */
			sortByLabel: boolean;

			/**
			 * By default loadChildren is called when the items are fetched from the
			 * store.  This property allows delaying loadChildren (and the creation
			 * of the options/menuitems) until the user clicks the button to open the
			 * dropdown.
			 */
			loadChildrenOnOpen: boolean;

			/**
			 * This is the `dojo.Deferred` returned by setStore().
			 * Calling onLoadDeferred.then() registers your
			 * callback to be called only once, when the prior setStore completes.
			 */
			onLoadDeferred: dojo.Deferred<void>;

			/**
			 * Returns a given option (or options).
			 */
			getOptions(valueOrIdx: string): SelectOption;
			getOptions(valueOrIdx: number): SelectOption;
			getOptions(valueOrIdx: SelectOption): SelectOption;
			getOptions(valueOrIdx: (string | number | SelectOption)[]): SelectOption[];
			getOptions(): SelectOption[];

			/**
			 * Adds an option or options to the end of the select.  If value
			 * of the option is empty or missing, a separator is created instead.
			 * Passing in an array of options will yield slightly better performance
			 * since the children are only loaded once.
			 */
			addOption(option: SelectOption | SelectOption[]): void;

			/**
			 * Removes the given option or options.  You can remove by string
			 * (in which case the value is removed), number (in which case the
			 * index in the options array is removed), or select option (in
			 * which case, the select option with a matching value is removed).
			 * You can also pass in an array of those values for a slightly
			 * better performance since the children are only loaded once.
			 * For numeric option values, specify {value: number} as the argument.
			 */
			removeOption(option: string | number | SelectOption | (string | number | SelectOption)[]): void;

			/**
			 * Updates the values of the given option.  The option to update
			 * is matched based on the value of the entered option.  Passing
			 * in an array of new options will yield better performance since
			 * the children will only be loaded once.
			 */
			updateOption(newOption: SelectOption | SelectOption[]): void;

			/**
			 * Deprecated!
			 */
			setStore(store: dojo.store.api.Store<T, Q, O>, selectedValue?: T, fetchArgs?: {
				query: Q;
				queryOptions: O;
				onFetch: (items: T[], fetchArgs?: any) => void;
			}): dojo.store.api.Store<T, Q, O>;

			/**
			 * Sets the store you would like to use with this select widget.
			 * The selected value is the value of the new store to set.  This
			 * function returns the original store, in case you want to reuse
			 * it or something.
			 */
			_deprecatedSetStore(store: dojo.store.api.Store<T, Q, O>, selectedValue?: T, fetchArgs?: {
				query: Q;
				queryOptions: O;
				onFetch: (items: T[], fetchArgs?: any) => void;
			}): dojo.store.api.Store<T, Q, O>;

			/**
			 * Loads the children represented by this widget's options.
			 * reset the menu to make it populatable on the next click
			 */
			_loadChildren(): void;

			/**
			 * Sets the "selected" class on the item for styling purposes
			 */
			_updateSelection(): void;

			/**
			 * Returns the value of the widget by reading the options for
			 * the selected flag
			 */
			_getValueFromOpts(): string;

			buildRendering(): void;

			/**
			 * Loads our options and sets up our dropdown correctly.  We
			 * don't want any content, so we don't call any inherit chain
			 * function.
			 */
			_fillContent(): void;

			/**
			 * sets up our event handling that we need for functioning
			 * as a select
			 */
			postCreate(): void;

			startup(): void;

			/**
			 * Clean up our connections
			 */
			destroy(preserveDom?: boolean): void;

			/**
			 * User-overridable function which, for the given option, adds an
			 * item to the select.  If the option doesn't have a value, then a
			 * separator is added in that place.  Make sure to store the option
			 * in the created option widget.
			 */
			_addOptionItem(option: SelectOption): void;

			/**
			 * User-overridable function which, for the given option, removes
			 * its item from the select.
			 */
			_removeOptionItem(option: SelectOption): void;

			/**
			 * Overridable function which will set the display for the
			 * widget.  newDisplay is either a string (in the case of
			 * single selects) or array of strings (in the case of multi-selects)
			 */
			_setDisplay(newDisplay: string | string[]): void;

			/**
			 * Overridable function to return the children that this widget contains.
			 */
			_getChildren(): any[];

			/**
			 * hooks into this.attr to provide a mechanism for getting the
			 * option items for the current value of the widget.
			 */
			_getSelectedOptionsAttr(): SelectOption[];

			/**
			 * a function that will "fake" loading children, if needed, and
			 * if we have set to not load children until the widget opens.
			 */
			_pseudoLoadChildren(items: T[]): void;

			/**
			 * a function that can be connected to in order to receive a
			 * notification that the store has finished loading and all options
			 * from that store are available
			 */
			onSetStore(): void;
		}

		/* dijit/form/_FormValueMixin */

		interface _FormValueMixin extends _FormWidgetMixin {

			/**
			 * Should this widget respond to user input?
			 * In markup, this is specified as "readOnly".
			 * Similar to disabled except readOnly form values are submitted.
			 */
			readOnly: boolean;

			postCreate(): void;

			/**
			 * Restore the value to the last value passed to onChange
			 */
			undo(): void;

			/**
			 * Reset the widget's value to what it was at initialization time
			 */
			reset(): void;

			_hasBeenBlurred?: boolean;
		}

		/* dijit/form/_FormValueWidget */

		interface _FormValueWidget extends _FormWidget, _FormValueMixin {
			/**
			 * Work around table sizing bugs on IE7 by forcing redraw
			 */
			_layoutHackIE7(): void;

			set(name: string, value: any): this;
			set(values: Object): this;
		}

		interface _FormValueWidgetConstructor extends _WidgetBaseConstructor<_FormValueWidget> { }

		/* dijit/form/_FormWidget */

		interface _FormWidget extends _Widget, _TemplatedMixin, _CssStateMixin, _FormWidgetMixin {
			setDisabled(disabled: boolean): void;
			setValue(value: string): void;
			postMixInProperties(): void;

			set(name: 'value', value: string): this;
			set(name: string, value: any): this;
			set(values: Object): this;
		}

		interface _FormWidgetConstructor extends _WidgetBaseConstructor<_FormWidget> { }

		/* dijit/form/_FormWidgetMixin */

		interface _FormWidgetMixin {
			/**
			 * Name used when submitting form; same as "name" attribute or plain HTML elements
			 */
			name: string;

			/**
			 * Corresponds to the native HTML `<input>` element's attribute.
			 */
			alt: string;

			/**
			 * Corresponds to the native HTML `<input>` element's attribute.
			 */
			value: any;

			/**
			 * Corresponds to the native HTML `<input>` element's attribute.
			 */
			type: string;

			/**
			 * Apply aria-label in markup to the widget's focusNode
			 */
			'aria-label': string;

			/**
			 * Order fields are traversed when user hits the tab key
			 */
			tabIndex: number;

			/**
			 * Should this widget respond to user input?
			 * In markup, this is specified as "disabled='disabled'", or just "disabled".
			 */
			disabled: boolean;

			/**
			 * Fires onChange for each value change or only on demand
			 */
			intermediateChanges: boolean;

			/**
			 * On focus, should this widget scroll into view?
			 */
			scrollOnFocus: boolean;

			/**
			 * Tells if this widget is focusable or not.  Used internally by dijit.
			 */
			isFocusable(): boolean;

			/**
			 * Put focus on this widget
			 */
			focus(): void;

			/**
			 * Compare 2 values (as returned by get('value') for this widget).
			 */
			compare(val1: any, val2: any): number;

			/**
			 * Callback when this widget's value is changed.
			 */
			onChange(value: string): void;

			/**
			 * Overrides _Widget.create()
			 */
			create(params?: any, srcNodeRef?: HTMLElement): void;

			destroy(preserveDom?: boolean): void;

			set(name: 'disabled', value: boolean): this;
			set(name: string, value: any): this;
			set(values: Object): this;
		}

		/* dijit/form/_ListBase */

		interface _ListBase {
			/**
			 * currently selected node
			 */
			selected: HTMLElement;

			/**
			 * Select the first displayed item in the list.
			 */
			selectFirstNode(): void;

			/**
			 * Select the last displayed item in the list
			 */
			selectLastNode(): void;

			/**
			 * Select the item just below the current selection.
			 * If nothing selected, select first node.
			 */
			selectNextNode(): void;

			/**
			 * Select the item just above the current selection.
			 * If nothing selected, select last node (if
			 * you select Previous and try to keep scrolling up the list).
			 */
			selectPreviousNode(): void;

			set(name: 'selected', value: HTMLElement): this;
			set(name: string, value: any): this;
			set(values: Object): this;
		}

		/* dijit/form/_ListMouseMixin */

		interface _ListMouseMixin extends _ListBase {
			postCreate(): void;
		}

		/* dijit/form/_RadioButtonMixin */

		interface _RadioButtonMixin {
			/**
			 * type attribute on `<input>` node.
			 * Users should not change this value.
			 */
			type: string;
		}

		/* dijit/form/_SearchMixin */

		interface _SearchMixin<T extends Object, Q extends dojo.store.api.BaseQueryType, O extends dojo.store.api.QueryOptions> {
			/**
			 * Argument to data provider.
			 * Specifies maximum number of search results to return per query
			 */
			pageSize: number;

			/**
			 * Reference to data provider object used by this ComboBox.
			 * The store must accept an object hash of properties for its query. See `query` and `queryExpr` for details.
			 */
			store: dojo.store.api.Store<T, Q, O>;

			/**
			 * Mixin to the store's fetch.
			 * For example, to set the sort order of the ComboBox menu, pass:
			 * { sort: [{attribute:"name",descending: true}] }
			 * To override the default queryOptions so that deep=false, do:
			 * { queryOptions: {ignoreCase: true, deep: false} }
			 */
			fetchProperties: { [property: string]: any };

			/**
			 * A query that can be passed to `store` to initially filter the items.
			 * ComboBox overwrites any reference to the `searchAttr` and sets it to the `queryExpr` with the user's input substituted.
			 */
			query: Q;

			/**
			 * Alternate to specifying a store.  Id of a dijit/form/DataList widget.
			 */
			list: string;

			/**
			 * Delay in milliseconds between when user types something and we start
			 * searching based on that value
			 */
			searchDelay: number;

			/**
			 * Search for items in the data store where this attribute (in the item)
			 * matches what the user typed
			 */
			searchAttr: string;

			/**
			 * This specifies what query is sent to the data store,
			 * based on what the user has typed.  Changing this expression will modify
			 * whether the results are only exact matches, a "starting with" match,
			 * etc.
			 * `${0}` will be substituted for the user text.
			 * `*` is used for wildcards.
			 * `${0}*` means "starts with", `*${0}*` means "contains", `${0}` means "is"
			 */
			queryExpr: string;

			/**
			 * Set true if the query should ignore case when matching possible items
			 */
			ignoreCase: boolean;

			/**
			 * Helper function to convert a simple pattern to a regular expression for matching.
			 */
			_patternToRegExp(pattern: string): RegExp;

			_abortQuery(): void;

			/**
			 * Handles input (keyboard/paste) events
			 */
			_processInput(e: KeyboardEvent): void;

			/**
			 * Callback when a search completes.
			 */
			onSearch(results: T[], query: Q, options: O): void;

			_startSearchFromInput(): void;

			/**
			 * Starts a search for elements matching text (text=="" means to return all items
			 * and calls onSearch(...) when the search completes, to display the results.
			 */
			_startSearch(text: string): void;

			postMixInProperties(): void;

			set(name: 'list', value: string): this;
			set(name: string, value: any): this;
			set(values: Object): this;
		}

		/* dijit/form/_Spinner */

		interface AdjustFunction {
			(val: any, delta: number): any;
		}

		interface _Spinner extends RangeBoundTextBox {
			/**
			 * Number of milliseconds before a held arrow key or up/down button becomes typematic
			 */
			defaultTimeout: number;

			/**
			 * minimum number of milliseconds that typematic event fires when held key or button is held
			 */
			minimumTimeout: number;

			/**
			 * Fraction of time used to change the typematic timer between events.
			 * 1.0 means that each typematic event fires at defaultTimeout intervals.
			 * Less than 1.0 means that each typematic event fires at an increasing faster rate.
			 */
			timeoutChangeRate: number;

			/**
			 * Adjust the value by this much when spinning using the arrow keys/buttons
			 */
			smallDelta: number;

			/**
			 * Adjust the value by this much when spinning using the PgUp/Dn keys
			 */
			largeDelta: number;

			templateString: string;
			baseClass: string;
			cssStateNodes: CSSStateNodes;

			/**
			 * Overridable function used to adjust a primitive value(Number/Date/...) by the delta amount specified.
			 * The val is adjusted in a way that makes sense to the object type.
			 */
			adjust: AdjustFunction;

			postCreate(): void;
		}

		interface _SpinnerConstrctor extends _WidgetBaseConstructor<_Spinner> { }

		/* dijit/form/_TextBoxMixin */

		interface _TextBoxMixin<C extends Constraints> {
			/**
			 * Removes leading and trailing whitespace if true.  Default is false.
			 */
			trim: boolean;

			/**
			 * Converts all characters to uppercase if true.  Default is false.
			 */
			uppercase: boolean;

			/**
			 * Converts all characters to lowercase if true.  Default is false.
			 */
			lowercase: boolean;

			/**
			 * Converts the first character of each word to uppercase if true.
			 */
			propercase: boolean;

			/**
			 * HTML INPUT tag maxLength declaration.
			 */
			maxLength: string;

			/**
			 * If true, all text will be selected when focused with mouse
			 */
			selectOnClick: boolean;

			/**
			 * Defines a hint to help users fill out the input field (as defined in HTML 5).
			 * This should only contain plain text (no html markup).
			 */
			placeHolder: string;

			/**
			 * For subclasses like ComboBox where the displayed value
			 * (ex: Kentucky) and the serialized value (ex: KY) are different,
			 * this represents the displayed value.
			 *
			 * Setting 'displayedValue' through set('displayedValue', ...)
			 * updates 'value', and vice-versa.  Otherwise 'value' is updated
			 * from 'displayedValue' periodically, like onBlur etc.
			 */
			displayedValue: string;

			/**
			 * Replaceable function to convert a value to a properly formatted string.
			 */
			format: ConstrainedValueFunction<any, C, any>;

			/**
			 * Replaceable function to convert a formatted string to a value
			 */
			parse: ConstrainedValueFunction<any, C, any>;

			/**
			 * Connect to this function to receive notifications of various user data-input events.
			 * Return false to cancel the event and prevent it from being processed.
			 * Note that although for historical reasons this method is called `onInput()`, it doesn't
			 * correspond to the standard DOM "input" event, because it occurs before the input has been processed.
			 */
			onInput(e: DocumentEvent): void;

			postCreate(): void;

			/**
			 * if the textbox is blank, what value should be reported
			 */
			_blankValue: string;

			/**
			 * Auto-corrections (such as trimming) that are applied to textbox
			 * value on blur or form submit.
			 */
			filter<T>(val: T): T;
			filter<T extends number>(value: T): T;

			_setBlurValue(): void;

			reset(): void;
		}

		/* dijit/form/_ToggleButtonMixin */

		interface _ToggleButtonMixin {
			/**
			 * Corresponds to the native HTML `<input>` element's attribute.
			 * In markup, specified as "checked='checked'" or just "checked".
			 * True if the button is depressed, or the checkbox is checked,
			 * or the radio button is selected, etc.
			 */
			checked: boolean;

			postCreate(): void;

			/**
			 * Reset the widget's value to what it was at initialization time
			 */
			reset(): void;

			_hasBeenBlurred?: boolean;
		}

		/* dijit/form/Button */

		interface Button extends _FormWidget, _ButtonMixin {
			/**
			 * Set this to true to hide the label text and display only the icon.
			 * (If showLabel=false then iconClass must be specified.)
			 * Especially useful for toolbars.
			 * If showLabel=true, the label will become the title (a.k.a. tooltip/hint)
			 */
			showLabel: boolean;

			/**
			 * Class to apply to DOMNode in button to make it display an icon
			 */
			iconClass: string;

			baseClass: string;
			templateString: string;
			postCreate(): void;
			setLabel(content: string): void;
			onLabelSet(e: DocumentEvent): void;

			onClick(e: DocumentEvent): boolean;

			set(name: 'showLabel', value: boolean): this;
			set(name: 'value', value: string): this;
			set(name: 'name', value: string): this;
			set(name: 'label', value: string): this;
			set(name: string, value: any): this;
			set(values: Object): this;
		}

		interface ButtonConstructor extends _WidgetBaseConstructor<Button> { }

		/* dijit/form/CheckBox */

		interface CheckBox extends ToggleButton, _CheckBoxMixin {
			templateString: string;
			baseClass: string;
			postMixInProperties(): void;
			value: string;

			set(name: 'value', value: string | boolean): this;
			set(name: string, value: any): this;
			set(values: Object): this;
		}

		interface CheckBoxConstructor extends _WidgetBaseConstructor<CheckBox> { }

		/* dijit/form/ComboBox */

		interface ComboBox<T extends Object, Q extends dojo.store.api.BaseQueryType, O extends dojo.store.api.QueryOptions, C extends Constraints> extends ValidationTextBox<C>, ComboBoxMixin<T, Q, O> {
			set(name: string, value: any): this;
			set(values: Object): this;
		}

		interface ComboBoxConstructor extends _WidgetBaseConstructor<ComboBox<any, any, any, any>> {
			new <T extends Object, Q extends dojo.store.api.BaseQueryType, O extends dojo.store.api.QueryOptions, C extends Constraints>(params: Object, srcNodeRef: dojo.NodeOrString): ComboBox<T, Q, O, C>;
		}

		/* dijit/form/ComboBoxMixin */

		interface ComboBoxMixin<T extends Object, Q extends dojo.store.api.BaseQueryType, O extends dojo.store.api.QueryOptions> extends _HasDropDown<_ComboBoxMenu<T>>, _AutoCompleterMixin<T, Q, O> {

			/**
			 * Dropdown widget class used to select a date/time.
			 * Subclasses should specify this.
			 */
			dropDownClass: _ComboBoxMenu<T>;

			/**
			 * Set this textbox to have a down arrow button, to display the drop down list.
			 * Defaults to true.
			 */
			hasDownArrow: boolean;

			templateString: string;
			baseClass: string;

			/**
			 * Reference to data provider object used by this ComboBox.
			 *
			 * Should be dojo/store/api/Store, but dojo/data/api/Read supported
			 * for backwards compatibility.
			 */
			store: dojo.store.api.Store<T, Q, O>;

			cssStateNodes: CSSStateNodes;
			postMixInProperties(): void;
			buildRendering(): void;
		}

		interface ComboBoxMixinConstructor<T, U, V> extends _WidgetBaseConstructor<ComboBoxMixin<T, U, V>> { }

		/* dijit/form/CurrencyTextBox */

		interface CurrencyTextBoxConstraints extends NumberTextBoxConstraints, dojo.CurrencyFormatOptions, dojo.CurrencyParseOptions {
		}

		interface CurrencyTextBox extends NumberTextBox {
			/**
			 * the [ISO4217](http://en.wikipedia.org/wiki/ISO_4217) currency code, a three letter sequence like "USD"
			 */
			currency: string;

			/**
			 * Despite the name, this parameter specifies both constraints on the input
			 * (including minimum/maximum allowed values) as well as
			 * formatting options.  See `dijit/form/CurrencyTextBox.__Constraints` for details.
			 */
			constraints: CurrencyTextBoxConstraints;

			baseClass: string;

			_formatter: (value: number, options?: dojo.CurrencyFormatOptions) => string;
			_parser: (expression: string, options?: dojo.CurrencyParseOptions) => number;
			_regExpGenerator: (options?: dojo.NumberRegexpOptions) => string;

			/**
			 * Parses string value as a Currency, according to the constraints object
			 */
			parse(value: string, constraints: CurrencyTextBoxConstraints): string;
		}

		interface CurrencyTextBoxConstructor extends _WidgetBaseConstructor<CurrencyTextBox> { }

		/* dijit/form/DataList */

		interface DataList<T extends Object> extends dojo.store.Memory<T> {
			/**
			 * Get the option marked as selected, like `<option selected>`.
			 * Not part of dojo.data API.
			 */
			fetchSelectedItem(): T;
		}

		interface DataListConstructor {
			new <T extends Object>(params: Object, srcNodeRef: dojo.NodeOrString): DataList<T>;
		}

		/* dijit/form/DateTextBox */

		interface DateTextBox extends _DateTimeTextBox<Calendar> {
			baseClass: string;
			popupClass: CalendarConstructor;
			_selector: string;
			maxHeight: number;

			/**
			 * The value of this widget as a JavaScript Date object, with only year/month/day specified.`
			 */
			value: Date;
		}

		interface DateTextBoxConstructor extends _WidgetBaseConstructor<DateTextBox> { }

		/* dijit/form/DropDownButton */

		interface DropDownButton<T extends _WidgetBase> extends Button, _Container, _HasDropDown<T> {
			baseClass: string;
			templateString: string;

			/**
			 * Overrides _TemplatedMixin#_fillContent().
			 * My inner HTML possibly contains both the button label and/or a drop down widget, like
			 * <DropDownButton>  <span>push me</span>  <Menu> ... </Menu> </DropDownButton>
			 */
			_fillContent(): void;
			startup(): void;

			/**
			 * Returns whether or not we are loaded - if our dropdown has an href,
			 * then we want to check that.
			 */
			isLoaded(): boolean;

			/**
			 * Default implementation assumes that drop down already exists,
			 * but hasn't loaded it's data (ex: ContentPane w/href).
			 * App must override if the drop down is lazy-created.
			 */
			loadDropDown(callback: () => void): void;

			/**
			 * Overridden so that focus is handled by the _HasDropDown mixin, not by
			 * the _FormWidget mixin.
			 */
			isFocusable(): boolean;
		}

		interface DropDownButtonConstructor extends _WidgetBaseConstructor<DropDownButton<any>> {
			new <T extends _WidgetBase>(params: Object, srcNodeRef: dojo.NodeOrString): DropDownButton<T>;
		}

		/* dijit/form/FilteringSelect */

		interface FilteringSelect<C extends Constraints, T extends Object, Q extends string | Object | Function, O extends dojo.store.api.QueryOptions> extends MappedTextBox<C>, ComboBoxMixin<T, Q, O> {
			/**
			 * True (default) if user is required to enter a value into this field.
			 */
			required: boolean;

			_lastDisplayedValue: string;
			_isValidSubset(): boolean;
			isValid(): boolean;
			_refreshState(): void;

			/**
			 * Callback from dojo.store after lookup of user entered value finishes
			 */
			_callbackSetLabel(result: T[], query: Q, options: O, priorityChange?: boolean): void;

			_openResultList(results: T[], query: Q, options: O): void;
			undo(): void;

			set(name: 'displayedValue', value: string): this;
			set(name: 'item', value: T): this;
			set(name: string, value: any): this;
			set(values: Object): this;
		}

		interface FilteringSelectConstructor extends _WidgetBaseConstructor<FilteringSelect<any, any, any, any>> {
			new <C extends Constraints, T extends Object, Q extends string | Object | Function, O extends dojo.store.api.QueryOptions>(params: Object, srcNodeRef: dojo.NodeOrString): FilteringSelect<C, T, Q, O>;
		}

		/* dijit/form/Form */

		interface Form extends _Widget, _TemplatedMixin, _FormMixin, layout._ContentPaneResizeMixin {
			name?: string;
			action?: string;
			method?: string;
			encType?: string;
			'accept-charset'?: string;
			accept?: string;
			target?: string;
			templateString: string;

			/**
			 * Deprecated: use submit()
			 */
			execute(formContents: Object): void;

			/**
			 * Deprecated: use onSubmit()
			 */
			onExecute(): void;

			/**
			 * restores all widget values back to their init values,
			 * calls onReset() which can cancel the reset by returning false
			 */
			reset(e?: Event): void;

			/**
			 * Callback when user resets the form. This method is intended
			 * to be over-ridden. When the `reset` method is called
			 * programmatically, the return value from `onReset` is used
			 * to compute whether or not resetting should proceed
			 */
			onReset(e?: Event): boolean;

			/**
			 * Callback when user submits the form.
			 */
			onSubmit(e?: Event): boolean;

			/**
			 * programmatically submit form if and only if the `onSubmit` returns true
			 */
			submit(): void;
		}

		interface FormConstructor extends _WidgetBaseConstructor<Form> { }

		/* dijit/form/HorizontalRule */

		/**
		 * Hash marks for `dijit/form/HorizontalSlider`
		 */
		interface HorizontalRule extends _Widget, _TemplatedMixin {
			/**
			 * Number of hash marks to generate
			 */
			count: number;

			/**
			 * For HorizontalSlider, this is either "topDecoration" or "bottomDecoration", and indicates whether this rule goes above or below the slider.
			 */
			container: string;

			/**
			 * CSS style to apply to individual hash marks
			 */
			ruleStyle: string;

			_positionPrefix: string;
			_positionSuffix: string;
			_suffix: string;

			_genHTML(pos: number): string;

			/**
			 * VerticalRule will override this...
			 */
			_isHorizontal: boolean;
		}

		interface HorizontalRuleConstructor extends _WidgetBaseConstructor<HorizontalRule> { }

		/* dijit/form/HorizontalRuleLabels */

		/**
		 * Labels for `dijit/form/HorizontalSlider`
		 */
		interface HorizontalRuleLabels extends HorizontalRule {
			/**
			 * CSS style to apply to individual text labels
			 */
			labelStyle: string;

			/**
			 * Array of text labels to render - evenly spaced from left-to-right or bottom-to-top.
			 * Alternately, minimum and maximum can be specified, to get numeric labels.
			 */
			labels: string[];

			/**
			 * Number of generated numeric labels that should be rendered as '' on the ends when labels[] are not specified
			 */
			numericMargin: number;

			/**
			 * Leftmost label value for generated numeric labels when labels[] are not specified
			 */
			minimum: number;

			/**
			 * Rightmost label value for generated numeric labels when labels[] are not specified
			 */
			maximum: number;

			/**
			 * pattern, places, lang, et al (see dojo.number) for generated numeric labels when labels[] are not specified
			 */
			constraints: { pattern: string };

			/**
			 * Returns the value to be used in HTML for the label as part of the left: attribute
			 */
			_calcPosition(pos: number): number;

			_genHTML(pos: number, ndx?: number): string;

			/**
			 * extension point for bidi code
			 */
			_genDirectionHTML(label: string): string;

			/**
			 * Overridable function to return array of labels to use for this slider.
			 * Can specify a getLabels() method instead of a labels[] array, or min/max attributes.
			 */
			getLabels(): string[];
		}

		interface HorizontalRuleLabelsConstructor extends _WidgetBaseConstructor<HorizontalRuleLabels> { }

		/* dijit/form/HorizontalSlider */

		interface _SliderMover extends dojo.dnd.Mover { }

		/**
		 * A form widget that allows one to select a value with a horizontally draggable handle
		 */
		interface HorizontalSlider extends _FormValueWidget, _Container {
			/**
			 * Show increment/decrement buttons at the ends of the slider?
			 */
			showButtons: boolean;

			/**
			 * The minimum value the slider can be set to.
			 */
			minimum: number;

			/**
			 * The maximum value the slider can be set to.
			 */
			maximum: number;

			/**
			 * If specified, indicates that the slider handle has only 'discreteValues' possible positions, and that after dragging the handle, it will snap to the nearest possible position.
			 * Thus, the slider has only 'discreteValues' possible values.
			 *
			 * For example, if minimum=10, maxiumum=30, and discreteValues=3, then the slider handle has three possible positions, representing values 10, 20, or 30.
			 *
			 * If discreteValues is not specified or if it's value is higher than the number of pixels in the slider bar, then the slider handle can be moved freely, and the slider's value will be computed/reported based on pixel position (in this case it will likely be fractional, such as 123.456789).
			 */
			discreteValues: number;

			/**
			 * If discreteValues is also specified, this indicates the amount of clicks (ie, snap positions) that the slider handle is moved via pageup/pagedown keys.
			 * If discreteValues is not specified, it indicates the number of pixels.
			 */
			pageIncrement: number;

			/**
			 * If clicking the slider bar changes the value or not
			 */
			clickSelect: boolean;

			/**
			 * The time in ms to take to animate the slider handle from 0% to 100%, when clicking the slider bar to make the handle move.
			 */
			slideDuration: number;

			_mousePixelCoord: string;
			_pixelCount: string;
			_startingPixelCoord: string;
			_handleOffsetCoord: string;
			_progressPixelSize: string;

			_onKeyUp(e: Event): void;
			_onKeyDown(e: Event): void;
			_onHandleClick(e: Event): void;

			/**
			 * Returns true if direction is from right to left
			 */
			_isReversed(): boolean;

			_onBarClick(e: Event): void;

			_setPixelValue(pixelValue: number, maxPixels: number, priorityChange?: boolean): void;

			_setValueAttr(value: number, priorityChange?: boolean): void;

			_bumpValue(signedChange: number, priorityChange: boolean): void;

			_onClkBumper(val: any): void;
			_onClkIncBumper(): void;
			_onClkDecBumper(): void;

			decrement(e: Event): void;
			increment(e: Event): void;

			_mouseWheeled(evt: Event): void;

			_typematicCallback(count: number, button: Element, e: Event): void;
		}

		interface HorizontalSliderConstructor extends _WidgetBaseConstructor<HorizontalSlider> {
			/**
			 * for monkey patching
			 */
			_Mover: _SliderMover;
		}

		/* dijit/form/MappedTextBox */

		interface MappedTextBox<C extends Constraints> extends ValidationTextBox<C> {
			postMixInProperties(): void;
			serialize: SerializationFunction;
			toString(): string;
			validate(isFocused?: boolean): boolean;
			buildRendering(): void;
			reset(): void;
		}

		interface MappedTextBoxConstructor extends _WidgetBaseConstructor<MappedTextBox<Constraints>> {
			new <C extends Constraints>(params: Object, srcNodeRef: dojo.NodeOrString): MappedTextBox<C>;
		}

		/* dijit/form/NumberSpinner */

		interface NumberSpinner extends _Spinner, NumberTextBoxMixin {
			constraints: NumberTextBoxConstraints;
			baseClass: string;
			adjust(val: any, delta: number): any;

			/* overrides */
			pattern: ConstraintsToRegExpString<NumberTextBoxConstraints>;
			parse(value: string, constraints: NumberTextBoxConstraints): string;
			format(value: number, constraints: NumberTextBoxConstraints): string;
			filter(value: number): number;
			value: number;
		}

		interface NumberSpinnerConstructor extends _WidgetBaseConstructor<NumberSpinner> { }

		/* dijit/form/NumberTextBox */

		interface NumberTextBoxConstraints extends RangeBoundTextBoxConstraints, dojo.NumberFormatOptions, dojo.NumberParseOptions { }

		interface NumberTextBoxMixin {
			pattern: ConstraintsToRegExpString<NumberTextBoxConstraints>;
			constraints: NumberTextBoxConstraints;
			value: number;
			editOptions: { pattern: string };
			_formatter: (value: number, options?: dojo.NumberFormatOptions) => string;
			_regExpGenerator: (options?: dojo.NumberRegexpOptions) => string;
			_decimalInfo: (constraints: Constraints) => { sep: string; places: number; };
			postMixInProperties(): void;
			format(value: number, constraints: NumberTextBoxConstraints): string;
			_parser: (expression: string, options?: dojo.NumberParseOptions) => number;
			parse(value: string, constraints: dojo.NumberParseOptions): string;
			filter(value: number): number;
			serialize: SerializationFunction;
			isValid(isFocused: boolean): boolean;
		}

		interface NumberTextBoxMixinConstructor extends _WidgetBaseConstructor<NumberTextBoxMixin> { }

		interface NumberTextBox extends RangeBoundTextBox, NumberTextBoxMixin {
			constraints: NumberTextBoxConstraints;
			pattern: ConstraintsToRegExpString<NumberTextBoxConstraints>;
			parse(value: string, constraints: dojo.NumberParseOptions): string;
			format(value: number, constraints: dojo.NumberFormatOptions): string;
			value: number;
			filter(value: number): number;
		}

		interface NumberTextBoxConstructor extends _WidgetBaseConstructor<NumberTextBox> {
			Mixin: NumberTextBoxMixinConstructor;
		}

		/* dijit/form/RadioButton */

		interface RadioButton extends CheckBox, _RadioButtonMixin {
			baseClass: string;
		}

		interface RadioButtonConstructor extends _WidgetBaseConstructor<RadioButton> { }

		/* dijit/form/RangeBoundTextBox */

		interface RangeBoundTextBoxConstraints extends Constraints {
			min?: number;
			max?: number;
		}

		interface RangeBoundTextBox extends MappedTextBox<RangeBoundTextBoxConstraints> {
			/**
			 * The message to display if value is out-of-range
			 */
			rangeMessage: string;

			/**
			 * Overridable function used to validate the range of the numeric input value.
			 */
			rangeCheck(primative: number, constraints: RangeBoundTextBoxConstraints): boolean;

			/**
			 * Tests if the value is in the min/max range specified in constraints
			 */
			isInRange(isFocused: boolean): boolean;

			/**
			 * Returns true if the value is out of range and will remain
			 * out of range even if the user types more characters
			 */
			_isDefinitelyOutOfRange(): boolean;

			isValid(isFocused: boolean): boolean;
			getErrorMessage(isFocused: boolean): string;
			postMixInProperties(): void;
		}

		interface RangeBoundTextBoxConstructor extends _WidgetBaseConstructor<RangeBoundTextBox> { }

		/* dijit/form/Select */

		interface Select<T extends Object, Q extends dojo.store.api.BaseQueryType, O extends dojo.store.api.QueryOptions, U extends dijit._WidgetBase> extends _FormSelectWidget<T, Q, O>, _HasDropDown<U>, _KeyNavMixin {
			baseClass: string;

			/**
			 * What to display in an "empty" drop down.
			 */
			emptyLabel: string;

			/**
			 * Specifies how to interpret the labelAttr in the data store items.
			 */
			labelType: string;

			/**
			 * Currently displayed error/prompt message
			 */
			message: string;

			/**
			 * Can be true or false, default is false.
			 */
			required: boolean;

			/**
			 * "Incomplete" if this select is required but unset (i.e. blank value), "" otherwise
			 */
			state: string;

			/**
			 * Order fields are traversed when user hits the tab key
			 */
			tabIndex: any;
			templateString: any;

			/**
			 * See the description of dijit/Tooltip.defaultPosition for details on this parameter.
			 */
			tooltipPosition: any;

			childSelector(node: Element | Node): boolean;
			destroy(preserveDom: boolean): void;
			focus(): void;

			/**
			 * Sets the value to the given option, used during search by letter.
			 * @param widget Reference to option's widget
			 */
			focusChild(widget: dijit._WidgetBase): void;
			isLoaded(): boolean;

			/**
			 * Whether or not this is a valid value.
			 * @param isFocused
			 */
			isValid(isFocused: boolean): boolean;

			/**
			 * populates the menu
			 * @param loadCallback
			 */
			loadDropDown(loadCallback: () => any): void;
			postCreate(): void;

			/**
			 * set the missing message
			 */
			postMixInProperties(): void;

			/**
			 * Overridden so that the state will be cleared.
			 */
			reset(): void;
			startup(): void;

			/**
			 * Called by oninit, onblur, and onkeypress, and whenever required/disabled state changes
			 * @param isFocused
			 */
			validate(isFocused: boolean): boolean;

			/**
			 * When a key is pressed that matches a child item,
			 * this method is called so that a widget can take
			 * appropriate action is necessary.
			 * @param item
			 * @param evt
			 * @param searchString
			 * @param numMatches
			 */
			onKeyboardSearch(item: dijit._WidgetBase, evt: Event, searchString: string, numMatches: number): void;
		}

		interface SelectConstructor extends _WidgetBaseConstructor<Select<any, any, any, any>> { }

		/* dijit/form/SimpleTextarea */

		interface SimpleTextarea extends TextBox {
			baseClass: string;
			rows: string;
			cols: string;
			templateString: string;
			postMixInProperties(): void;
			buildRendering(): void;
			filter(value: string): string;
		}

		interface SimpleTextareaConstructor extends _WidgetBaseConstructor<SimpleTextarea> {
			new (params: Object, srcNodeRef: dojo.NodeOrString): SimpleTextarea;
		}

		/* dijit/form/Textarea */

		interface Textarea extends SimpleTextarea, _ExpandingTextAreaMixin {
			baseClass: string;
			cols: string;
			buildRendering(): void;
		}

		interface TextareaConstructor extends _WidgetBaseConstructor<Textarea> { }

		/* dijit/form/TextBox */

		interface TextBox extends _FormValueWidget, _TextBoxMixin<Constraints> {
			set(name: 'displayedValue', value: string): this;
			set(name: 'disabled', value: boolean): this;
			set(name: 'value', value: string): this;
			set(name: string, value: any): this;
			set(values: Object): this;

			get(name: 'displayedValue'): string;
			get(name: 'value'): string;
			get(name: string): any;
		}

		interface TextBoxConstructor extends _WidgetBaseConstructor<TextBox> { }

		/* dijit/form/ToggleButton */

		interface ToggleButton extends Button, _ToggleButtonMixin {
			baseClass: string;

			setChecked(checked: boolean): void;

			set(name: 'checked', value: boolean): this;
			set(name: string, value: any): this;
			set(values: Object): this;
		}

		interface ToggleButtonConstructor extends _WidgetBaseConstructor<ToggleButton> { }

		/* dijit/form/ValidationTextBox */

		interface IsValidFunction {
			(isFocused?: boolean): boolean;
		}

		interface ValidationTextBox<C extends Constraints> extends TextBox {
			templateString: string;
			required: boolean;
			promptMessage: string;
			invalidMessage: string;
			missingMessage: string;
			message: string;
			constraints: C;
			pattern: string | ConstraintsToRegExpString<C>;
			regExp: string;
			regExpGen(constraints: C): void;
			state: string;
			tooltipPosition: string[];
			validator: ConstrainedValidFunction<C>;
			isValid: IsValidFunction;
			getErrorMessage(isFocused: boolean): string;
			getPromptMessage(isFocused: boolean): string;
			validate(isFocused: boolean): boolean;
			displayMessage(message: string): void;

			startup(): void;
			postMixInProperties(): void;

			reset(): void;

			destroy(preserveDom?: boolean): void;

			set(name: 'constraints', value: Constraints): this;
			set(name: 'disabled', value: boolean): this;
			set(name: 'message', value: string): this;
			set(name: 'pattern', value: string | ConstraintsToRegExpString<C>): this;
			set(name: 'regExp', value: string): this;
			set(name: 'regExpGen', value: Constraints): this;
			set(name: 'required', value: boolean): this;
			set(name: 'value', value: string): this;
			set(name: string, value: any): this;
			set(values: Object): this;

			get(name: 'pattern'): string | ConstraintsToRegExpString<C>;
			get(name: string): any;
		}

		interface ValidationTextBoxConstructor extends _WidgetBaseConstructor<ValidationTextBox<Constraints>> {
			new <C extends Constraints>(params: Object, srcNodeRef: dojo.NodeOrString): ValidationTextBox<C>;
		}
	}
}
