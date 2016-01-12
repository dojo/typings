declare namespace dijit {

	namespace form {

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
			destroy(): void;
		}
	}
}
