/// <reference path="index.d.ts" />

declare module 'dijit/_WidgetBase' {
	type _WidgetBase = dijit._WidgetBase;
	const _WidgetBase: dijit._WidgetBaseConstructor<any>;
	export = _WidgetBase;
}

declare module 'dijit/_TemplatedMixin' {
	type _TemplatedMixin = dijit._TemplatedMixin;
	const _TemplatedMixin: dijit._TemplatedMixinConstructor;
	export = _TemplatedMixin;
}

declare module 'dijit/_WidgetsInTemplateMixin' {
	type _WidgetsInTemplateMixin = dijit._WidgetsInTemplateMixin
	const _WidgetsInTemplateMixin: dijit._WidgetsInTemplateMixinConstructor;
	export = _WidgetsInTemplateMixin;
}

declare module 'dijit/ConfirmDialog' {
	type ConfirmDialog = dijit.ConfirmDialog;
	const ConfirmDialog: dijit.ConfirmDialogConstructor;
	export = ConfirmDialog;
}

declare module 'dijit/Calendar' {
	type Calendar = dijit.Calendar;
	const Calendar: dijit.CalendarConstructor;
	export = Calendar;
}

declare module 'dijit/CalendarLite' {
	type CalendarLite = dijit.CalendarLite;
	const CalendarLite: dijit.CalendarLiteConstructor;
	export = CalendarLite;
}

declare module 'dijit/Dialog' {
	type Dialog = dijit.Dialog;
	const Dialog: dijit.DialogConstructor;
	export = Dialog;
}

declare module 'dijit/place' {
	const place: dijit.Place;
	export = place;
}

declare module 'dijit/popup' {
	const popup: dijit.PopupManager;
	export = popup;
}

declare module 'dijit/form/_FormMixin' {
	const _FormMixin: dijit.form._FormMixin;
	export = _FormMixin;
}

declare module 'dijit/form/Button' {
	type Button = dijit.form.Button;
	const Button: dijit.form.ButtonConstructor;
	export = Button;
}

declare module 'dijit/form/CheckBox' {
	type CheckBox = dijit.form.CheckBox;
	const CheckBox: dijit.form.CheckBoxConstructor;
	export = CheckBox;
}

declare module 'dijit/form/ComboBox' {
	type ComboBox = dijit.form.TextBox;
	const ComboBox: dijit.form.ComboBoxConstructor;
	export = ComboBox;
}

declare module 'dijit/form/CurrencyTextBox' {
	type CurrencyTextBox = dijit.form.CurrencyTextBox;
	const CurrencyTextBox: dijit.form.CurrencyTextBoxConstructor;
	export = CurrencyTextBox;
}

declare module 'dijit/form/DataList' {
	type DataList<T> = dijit.form.DataList<T>;
	const DataList: dijit.form.DataListConstructor;
	export = DataList;
}

declare module 'dijit/form/DateTextBox' {
	type DateTextBox = dijit.form.DateTextBox;
	const DateTextBox: dijit.form.DateTextBoxConstructor;
	export = DateTextBox;
}

declare module 'dijit/form/DropDownButton' {
	type DropDownButton<T extends dijit._WidgetBase> = dijit.form.DropDownButton<T>;
	const DropDownButton: dijit.form.DropDownButtonConstructor;
	export = DropDownButton;
}

declare module 'dijit/form/FilteringSelect' {
	type FilteringSelect<C extends dijit.form.Constraints, T extends Object, Q extends string | Object | Function, O extends dojo.store.api.QueryOptions> = dijit.form.FilteringSelect<C, T, Q, O>;
	const FilteringSelect: dijit.form.FilteringSelectConstructor;
	export = FilteringSelect;
}

declare module 'dijit/form/Form' {
	type Form = dijit.form.Form;
	const Form: dijit.form.FormConstructor;
	export = Form;
}

declare module 'dijit/form/MappedTextBox' {
	type MappedTextBox<C extends dijit.form.Constraints> = dijit.form.MappedTextBox<C>;
	const MappedTextBox: dijit.form.MappedTextBoxConstructor;
	export = MappedTextBox;
}

declare module 'dijit/form/NumberSpinner' {
	type NumberSpinner = dijit.form.NumberSpinner;
	const NumberSpinner: dijit.form.NumberSpinnerConstructor;
	export = NumberSpinner;
}

declare module 'dijit/form/NumberTextBox' {
	type NumberTextBox = dijit.form.NumberTextBox;
	const NumberTextBox: dijit.form.NumberTextBoxConstructor;
	export = NumberTextBox;
}

declare module 'dijit/form/RadioButton' {
	type RadioButton = dijit.form.RadioButton;
	const RadioButton: dijit.form.RadioButtonConstructor;
	export = RadioButton;
}

declare module 'dijit/form/RangeBoundTextBox' {
	type RangeBoundTextBox = dijit.form.RangeBoundTextBox;
	const RangeBoundTextBox: dijit.form.RangeBoundTextBoxConstructor;
	export = RangeBoundTextBox;
}

declare module 'dijit/form/Simpconstextarea' {
	type SimpleTextarea = dijit.form.SimpleTextarea;
	const SimpleTextarea: dijit.form.SimpleTextareaConstructor;
	export = SimpleTextarea;
}

declare module 'dijit/form/Textarea' {
	type Textarea = dijit.form.Textarea;
	const Textarea: dijit.form.TextareaConstructor;
	export = Textarea;
}

declare module 'dijit/form/TextBox' {
	type TextBox = dijit.form.TextBox;
	const TextBox: dijit.form.TextBoxConstructor;
	export = TextBox;
}

declare module 'dijit/form/ToggleButton' {
	type ToggleButton = dijit.form.ToggleButton;
	const ToggleButton: dijit.form.ToggleButtonConstructor;
	export = ToggleButton;
}

declare module 'dijit/form/ValidationTextBox' {
	type ValidationTextBox<C extends dijit.form.Constraints> = dijit.form.ValidationTextBox<C>;
	const ValidationTextBox: dijit.form.ValidationTextBoxConstructor;
	export = ValidationTextBox;
}

declare module 'dijit/layout/_LayoutWidget' {
	type _LayoutWidget = dijit.layout._LayoutWidget;
	const _LayoutWidget: dijit.layout._LayoutWidgetConstructor;
	export = _LayoutWidget;
}

declare module 'dijit/layout/AccordionContainer' {
	type AccordionContainer = dijit.layout.AccordionContainer;
	const AccordionContainer: dijit.layout.AccordionContainerConstructor;
	export = AccordionContainer;
}

declare module 'dijit/layout/AccordionPane' {
	type AccordionPane = dijit.layout.AccordionPane;
	const AccordionPane: dijit.layout.AccordionPaneConstructor;
	export = AccordionPane;
}

declare module 'dijit/layout/ContentPane' {
	type ContentPane = dijit.layout.ContentPane;
	const ContentPane: dijit.layout.ContentPaneConstructor;
	export = ContentPane;
}

declare module 'dijit/layout/BorderContainer' {
	type BorderContainer = dijit.layout.BorderContainer;
	const BorderContainer: dijit.layout.BorderContainerConstructor;
	export = BorderContainer;
}

declare module 'dijit/layout/LayoutContainer' {
	type LayoutContainer = dijit.layout.LayoutContainer;
	const LayoutContainer: dijit.layout.LayoutContainerConstructor;
	export = LayoutContainer;
}

declare module 'dijit/layout/LinkPane' {
	type LinkPane = dijit.layout.LinkPane;
	const LinkPane: dijit.layout.LinkPaneConstructor;
	export = LinkPane;
}

declare module 'dijit/layout/ScrollingTabController' {
	type ScrollingTabController = dijit.layout.ScrollingTabController;
	const ScrollingTabController: dijit.layout.ScrollingTabControllerConstructor;
	export = ScrollingTabController;
}

declare module 'dijit/layout/StackContainer' {
	type StackContainer = dijit.layout.StackContainer;
	const StackContainer: dijit.layout.StackContainerConstructor;
	export = StackContainer;
}

declare module 'dijit/layout/StackController' {
	type StackController = dijit.layout.StackController;
	const StackController: dijit.layout.StackControllerConstructor;
	export = StackController;
}

declare module 'dijit/layout/TabContainer' {
	type TabContainer = dijit.layout.TabContainer;
	const TabContainer: dijit.layout.TabContainerConstructor;
	export = TabContainer;
}

declare module 'dijit/layout/TabController' {
	type TabController = dijit.layout.TabController;
	const TabController: dijit.layout.TabControllerConstructor;
	export = TabController;
}
