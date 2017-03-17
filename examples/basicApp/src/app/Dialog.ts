import * as DijitDialog from 'dijit/Dialog';
import * as messages from 'dojo/i18n!./nls/main';
import declare from './declareDecorator';

/**
 * `dojo/_base/declare` can infer typings, but since we are generating our declare
 * constructor with a decorator (see below), we need to define our widget interface
 * explicitly.
 */
interface Dialog extends DijitDialog {}

/**
 * By using a decorator to create constructors with `dojo/_base/declare`, we can
 * write our widgets using TypeScript classes. The one caveat is that we are then
 * required to use merged declarations to define our interface, so the widget
 * class has to be declared as the default export in a separate statement.
 */
@declare(DijitDialog)
class Dialog {
	title: string = messages.dialogTitle;
	content: string = messages.dialogContent;
}

/*
 * We are using `export default` here, which is part of the ES6 module format.
 * If other consumers of the module are compatible with default exports, like
 * other modules written in TypeScript, then this is fine, but if someone
 * consumes this module, that insead of this being the return value of the module,
 * it will be located under Dialog.default.
 */
export default Dialog;
