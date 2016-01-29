declare namespace dijit {

	namespace form {

		/* implied */

		interface Constraints {
			[prop: string]: any;
			locale?: string;
			min?: number;
			max?: number;
		}

		interface ConstrainedValueFunction {
			/**
			 * Returns a value that has been constrained by the constraints
			 * @param   value       The value to constrain
			 * @param   constraints The constraints to use
			 * @returns             The constrained value
			 */
			(value: any, constraints: Constraints): string;
		}

		interface ConstrainedValidFunction {
			/**
			 * Returns true if the value is valid based on the constraints, otherwise
			 * returns false.
			 * @param   value       The value to check
			 * @param   constraints The constraints to use
			 * @returns             true if valid, otherwise false
			 */
			(value: any, constraints: Constraints): boolean;
		}

		interface ConstraintsToRegExpString {
			/**
			 * Takes a set of constraints and returns a RegExpString that can be used
			 * to match values against
			 * @param   constraints The constraints to use
			 * @returns             The RegExpString that represents the constraints
			 */
			(constraints: Constraints): string;
		}

		interface SerializationFunction {
			(val: any, options?: Object): string;
		}

		/* dojo/form/_CheckBoxMixin */

		/* tslint:disable:class-name */
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

		/* dojo/form/_ButtonMixin */

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

		/* dojo/form/_ExpandingTextAreaMixin */

		interface _ExpandingTextAreaMixin {
			postCreate(): void;
			startup(): void;
			resize(): void;
		}

		/* dijit/form/_FormMixin */

		interface OnValidStateChange {
			(isValid?: boolean): void;
		}

		/* tslint:disable:class-name */
		interface _FormMixin {

			/**
			 * Will be "Error" if one or more of the child widgets has an invalid value,
			 * "Incomplete" if not all of the required child widgets are filled in.  Otherwise, "",
			 * which indicates that the form is ready to be submitted.
			 */
			state: string;

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
			 * Deprecated method.   Applications no longer need to call this.   Remove for 2.0.
			 */
			disconnectChildren(): void;

			/**
			 * You can call this function directly, ex. in the event that you
			 * programmatically add a widget to the form *after* the form has been
			 * initialized.
			 */
			connectChildren(inStartup?: boolean): void;

			startup(): void;
			destroy(preserveDom?: boolean): void;
		}

		/* dojo/form/_FormValueMixin */

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
		}

		/* dojo/form/_FormValueWidget */

		interface _FormValueWidget extends _FormWidget, _FormValueMixin {
			/**
			 * Work around table sizing bugs on IE7 by forcing redraw
			 */
			_layoutHackIE7(): void;

			set(name: string, value: any): this;
			set(values: Object): this;
		}

		interface _FormValueWidgetConstructor extends _WidgetBaseConstructor<_FormValueWidget> { }

		/* dojo/form/_FormWidget */

		interface _FormWidget extends _Widget, _TemplatedMixin, _CssStateMixin, _FormWidgetMixin {
			setDisabled(disabled: boolean): void;
			setValue(value: string): void;
			postMixInProperties(): void;

			set(name: 'value', value: string): this;
			set(name: string, value: any): this;
			set(values: Object): this;
		}

		interface _FormWidgetConstructor extends _WidgetBaseConstructor<_FormWidget> { }

		/* dojo/form/_FormWidgetMixin */

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

		/* dojo/form/_RadioButtonMixin */

		interface _RadioButtonMixin {
			/**
			 * type attribute on `<input>` node.
			 * Users should not change this value.
			 */
			type: string;
		}

		/* dojo/form/_Spinner */

		interface CSSStateNodes {
			[node: string]: string;
		}

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

		/* dojo/form/_TextBoxMixin */

		interface _TextBoxMixin {
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
			format: ConstrainedValueFunction;

			/**
			 * Replaceable function to convert a formatted string to a value
			 */
			parse: ConstrainedValueFunction;

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

			_setBlurValue(): void;

			reset(): void;
		}

		/* dojo/form/_ToggleButtonMixin */

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
		}

		/* dojo/form/Button */

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

		/* dojo/form/CheckBox */

		interface CheckBox extends ToggleButton, _CheckBoxMixin {
			templateString: string;
			baseClass: string;
			postMixInProperties(): void;
			value: string;
		}

		interface CheckBoxConstructor extends _WidgetBaseConstructor<CheckBox> { }

		/* dojo/form/Form */

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

		/* dojo/form/MappedTextBox */

		interface MappedTextBox extends ValidationTextBox {
			postMixInProperties(): void;
			serialize: SerializationFunction;
			toString(): string;
			validate(isFocused: boolean): boolean;
			buildRendering(): void;
			reset(): void;
		}

		interface MappedTextBoxConstructor extends _WidgetBaseConstructor<MappedTextBoxConstructor> { }

		/* dojo/form/NumberSpinner */

		interface NumberSpinner extends _Spinner, NumberTextBoxMixin {
			baseClass: string;
			adjust(val: any, delta: number): any;

			/* overrides */
			pattern: ConstraintsToRegExpString;
			parse(value: string, constraints: dojo.NumberParseOptions): string;
			format(value: number, constraints: dojo.NumberFormatOptions): string;
			filter(value: number): number;
			value: number;
		}

		interface NumberSpinnerConstructor extends _WidgetBaseConstructor<NumberSpinner> { }

		/* dojo/form/NumberTextBox */

		interface NumberTextBoxMixin {
			pattern: ConstraintsToRegExpString;
			constraints: Constraints;
			value: number;
			editOptions: { pattern: string };
			_formatter: (value: number, options?: dojo.NumberFormatOptions) => string;
			_regExpGenerator: (options?: dojo.NumberRegexpOptions) => string;
			_decimalInfo: (constraints: Constraints) => { sep: string; places: number; };
			postMixInProperties(): void;
			format(value: number, constraints: dojo.NumberFormatOptions): string;
			_parser: (expression: string, options?: dojo.NumberParseOptions) => number;
			parse(value: string, constraints: dojo.NumberParseOptions): string;
			filter(value: number): number;
			serialize: SerializationFunction;
			isValid(isFocused: boolean): boolean;
		}

		interface NumberTextBoxMixinConstructor extends _WidgetBaseConstructor<NumberTextBoxMixin> {
			new (params: Object, srcNodeRef: dojo.NodeOrString): NumberTextBoxMixin;
		}

		interface NumberTextBox extends RangeBoundTextBox, NumberTextBoxMixin {
			pattern: ConstraintsToRegExpString;
			parse(value: string, constraints: dojo.NumberParseOptions): string;
			format(value: number, constraints: dojo.NumberFormatOptions): string;
			value: number;
			filter(value: number): number;
		}

		interface NumberTextBoxConstructor extends _WidgetBaseConstructor<NumberTextBox> {
			Mixin: NumberTextBoxMixinConstructor;
		}

		/* dojo/form/RadioButton */

		interface RadioButton extends CheckBox, _RadioButtonMixin {
			baseClass: string;
		}

		interface RadioButtonConstructor extends _WidgetBaseConstructor<RadioButton> { }

		/* dojo/form/RangeBoundTextBox */

		interface RangeBoundTextBox extends MappedTextBox {
			/**
			 * The message to display if value is out-of-range
			 */
			rangeMessage: string;

			/**
			 * Overridable function used to validate the range of the numeric input value.
			 */
			rangeCheck(primative: number, constraints: Constraints): boolean;

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

		/* dojo/form/SimpleTextarea */

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

		/* dojo/form/Textarea */

		interface Textarea extends SimpleTextarea, _ExpandingTextAreaMixin {
			baseClass: string;
			cols: string;
			buildRendering(): void;
		}

		interface TextareaConstructor extends _WidgetBaseConstructor<Textarea> { }

		/* dojo/form/TextBox */

		interface TextBox extends _FormValueWidget, _TextBoxMixin {
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

		/* dojo/form/ToggleButton */

		interface ToggleButton extends Button, _ToggleButtonMixin {
			baseClass: string;

			setChecked(checked: boolean): void;

			set(name: 'checked', value: boolean): this;
			set(name: string, value: any): this;
			set(values: Object): this;
		}

		interface ToggleButtonConstructor extends _WidgetBaseConstructor<ToggleButton> { }

		/* dojo/form/ValidationTextBox */

		interface IsValidFunction {
			(isFocused?: boolean): boolean;
		}

		interface ValidationTextBox extends TextBox {
			templateString: string;
			required: boolean;
			promptMessage: string;
			invalidMessage: string;
			missingMessage: string;
			message: string;
			constraints: Constraints;
			pattern: string | ConstraintsToRegExpString;
			regExp: string;
			regExpGen(constraints: Constraints): void;
			state: string;
			tooltipPosition: string[];
			validator: ConstrainedValidFunction;
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
			set(name: 'pattern', value: string | ConstraintsToRegExpString): this;
			set(name: 'regExp', value: string): this;
			set(name: 'regExpGen', value: Constraints): this;
			set(name: 'required', value: boolean): this;
			set(name: 'value', value: string): this;
			set(name: string, value: any): this;
			set(values: Object): this;

			get(name: 'pattern'): string | ConstraintsToRegExpString;
			get(name: string): any;
		}

		interface ValidationTextBoxConstructor extends _WidgetBaseConstructor<ValidationTextBox> { }
	}
}

