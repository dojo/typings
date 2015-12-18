/// <reference path="../../dojo/1.10/index.d.ts" />

declare namespace dijit {
	/* Global Dijit Interface */
	interface Dijit {}

	/* dijit/a11yclick */
	export interface A11yClick {
		(node: HTMLElement, listener: Function): dojo.Handle;
		press: dojo.ExtensionEvent;
		release: dojo.ExtensionEvent;
		move: dojo.ExtensionEvent;
	}

	/* dijit/Destroyable */
	export interface Destroyable {
		destroy(preserveDom?: boolean): void;
		own(...args: any[]): any[];
	}

	/* dijit/Dialog */
	/* tslint:disable:class-name */
	interface _DialogBase extends _TemplatedMixin, form._FormMixin, _DialogMixin, _CssStatefulMixin {
		templateString: string;
		baseClass: string;
		cssStateNodes: { closeButtonNode: string };
		open: boolean;
		duration: number;
		refocus: boolean;
		autofocus: boolean;
		draggable: boolean;
		maxRatio: number;
		closable: boolean;
		postMixInProperties(): void;
		postCreate(): void;
		onLoad(data?: any): void;
		focus(): void;
		/* Not entirely sure of the resolution type of these promises */
		show(): dojo.promise.Promise<any>;
		hide(): dojo.promise.Promise<any>;
		resize(dim?: { w: number, h: number }): void;
		destroy(): void;
	}

	/* We have to manually override API extension conflicts with TypeScript */
	interface DialogContentPane extends layout.ContentPane {
		resize(dim?: { w: number, h: number }): void;
	}

	export interface Dialog extends DialogContentPane, _DialogBase {}

	export interface DialogConstructor extends _WidgetBaseConstructor<Dialog> {
		new (params: any[], srcNodeRef?: HTMLElement): Dialog;
	}

	/* dijit/_AttachMixin */
	export interface _WidgetBase extends dojo.Stateful, Destroyable {
		dojoAttachEvent: string;
		dojoAttachPoint: string;
	}

	export interface _AttachMixin {}

	/* dijit/_BidiMixin */
	export interface _WidgetBase extends dojo.Stateful, Destroyable {
		getTextDir(text: string): string;
		applyTextDir(element: HTMLElement, text?: string): void;
		enforceTextDirWithUcc(option: HTMLOptionElement, text: string): string;
		restoreOriginalText(origObj: HTMLOptionElement): HTMLOptionElement;
	}

	/* dijit/_Container */
	export interface _Container {
		buildRendering(): void;
		addChild<T extends _WidgetBase>(widget: T, insertIndex?: number): void;
		removeChild<T extends _WidgetBase>(widget: T): void;
		removeChild(widget: number): void;
		hasChildren(): boolean;
		getIndexOfChild<T extends _WidgetBase>(widget: T): number;
	}

	/* dijit/_CssStatefulMixin */
	export interface _CssStatefulMixin {
		hovering: boolean;
		active: boolean;
	}

	/* dijit/_DialogMixin */
	export interface _DialogMixin {
		execute(formContents?: any): void;
		onCancel(): void;
		onExecute(): void;
	}

	/* dijit/_OnDijitClickMixin */

	export interface _OnDijitClickMixin {
		connect(obj: any, event: string|Function, method: string|Function): dojo.WatchHandle;
	}

	export interface _OnDijitClickMixinConstructor {
		a11yclick: A11yClick;
	}

	/* dijit/_FocusMixin */
	export interface _FocusMixin {}

	export interface _WidgetBase extends dojo.Stateful, Destroyable {
		onFocus(): void;
		onBlur(): void;
	}

	/* dijit/_TemplatedMixin */
	export interface _TemplatedMixin extends _AttachMixin {
		templateString: string;
		templatePath: string;
		searchContainerNode: boolean;
		buildRendering(): void;
	}

	export interface _TemplatedMixinConstructor {
		new (params: any[], srcNodeRef: HTMLElement): _TemplatedMixin;
		getCachedTemplate(templateString: string, alwaysUseString: string, doc?: Document): string|HTMLElement;
	}

	/* dijit/_Widget */
	export interface _Widget extends _WidgetBase, _OnDijitClickMixin, _FocusMixin {
		onClick(event: DocumentEvent): void;
		onDblClick(event: DocumentEvent): void;
		onKeyDown(event: DocumentEvent): void;
		onKeyPress(event: DocumentEvent): void;
		onKeyUp(event: DocumentEvent): void;
		onMouseDown(event: DocumentEvent): void;
		onMouseMove(event: DocumentEvent): void;
		onMouseOut(event: DocumentEvent): void;
		onMouseOver(event: DocumentEvent): void;
		onMouseLeave(event: DocumentEvent): void;
		onMouseEnter(event: DocumentEvent): void;
		onMouseUp(event: DocumentEvent): void;
		postCreate(): void;
		on(type: string|dojo.ExtensionEvent, func: Function): dojo.WatchHandle;
		setAttribute(attr: string, value: any): void;
		attr(name: string|{ [attr: string]: any }, value?: any): any;
		getDescendants(): _Widget[];
		onShow(): void;
		onHide(): void;
		onClose(): boolean;
	}

	/* dijit/_WidgetBase */
	export interface _WidgetBase extends dojo.Stateful, Destroyable {
		id: string;
		lang: string;
		dir: string;
		class: string;
		style: string;
		title: string;
		tooltip: string;
		baseClass: string;
		srcNodeRef: HTMLElement;
		domNode: HTMLElement;
		containerNode: HTMLElement;
		ownerDocument: HTMLElement;
		attributeMap: { [attribute: string]: any };
		textDir: string;
		postscript(params?: any, srcNodeRef?: HTMLElement): void;
		postMixInProperties(): void;
		buildRendering(): void;
		postCreate(): void;
		startup(): void;
		destroyRecursive(preserveDom?: boolean): void;
		destroyRendering(preserveDom?: boolean): void;
		destroyDescendants(preserveDom?: boolean): void;
		uninitialize(): boolean;
		emit(type: string, eventObj: any, callbackArgs: any[]): any;
		on(type: string|Function, func: Function): dojo.WatchHandle;
		toString(): string;
		getChildren<T extends _WidgetBase>(): T[];
		getParent<T extends _WidgetBase>(): T;
		connect(obj: any, event: string|Function, method: string|Function): dojo.WatchHandle;
		disconnect(handle: dojo.WatchHandle): void;
		subscribe(t: string, method: Function): dojo.WatchHandle;
		unsubscribe(handle: dojo.WatchHandle): void;
		isLeftToRight(): boolean;
		isFocusable(): boolean;
		placeAt<T extends _WidgetBase>(reference: string|HTMLElement|DocumentFragment|T, position?: string|number): _WidgetBase;
		defer(fcn: Function, delay?: number): dojo.Handle;
	}

	export interface _WidgetBaseConstructor<T> extends dojo._base.DeclareConstructor<T> {
		new (params: any[], srcNodeRef: HTMLElement): T;
	}
}
