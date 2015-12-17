import * as declare from 'dojo/_base/declare';
import * as Dialog from 'dijit/Dialog';

/* We are using the ES6 module format here, as it is more forward compatible */

/* While type inference works with declare, if you want to refer to the type at
 * some other point, you cannot easily extract the type.  Therefore we will do
 * essentially what the dojo.declare typings will do and create type reference.
 * This does not emit anything, but it allows others using this module in
 * TypeScript to have a clear reference to the type we are creating here */
export type DialogType = dijit.Dialog & {
	title: string;
	content: string;
};

/* dojo.declare can infer the typings here, but as explained above, we want to
 * specfically assert the type, so we are providing it as a generic argument
 * for decalare
 *
 * In addition, we are using `export default` here, which is part of the ES6
 * module format.  If other consumers of the module are compatible with default
 * exports, like other modules written in TypeScript, then this is fine, but if
 * someone consumes this module, that insead of this being the return value of
 * the module, it will be located under Dialog.default.
 */
export default declare<DialogType>(Dialog, {
	title: 'Hello World',
	content: 'Loaded successfully!'
});
