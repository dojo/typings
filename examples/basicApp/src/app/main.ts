import Dialog from './Dialog';
import 'dojo/domReady!';

/* So others can consume our application module better under TypeScript, lets
 * specify an interface for our application and export it
 */
export interface App {
	dialog: Dialog;
}

/* Now we are creating our application object */
const app: App = {
	dialog: new Dialog()
};

/* Following dojo-boilerplate we will perform the same functions, though if you
 * edit this file, you will notice that all the expected code completion will
 * work
 */
app.dialog.placeAt(document.body);

app.dialog.startup();

app.dialog.show();

document.body.className += ' loaded';

/* Again, we are exporting default here, this means we will have to refer to it
 * properly if we were to utilize it elsewhere.
 */
export default app;
