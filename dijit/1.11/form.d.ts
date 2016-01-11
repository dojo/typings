declare namespace dijit {
	namespace form {

		/* dijit/form/_FormMixin */
		interface OnValidStateChange {
			(isValid?: boolean): void;
		}

		/* tslint:disable:class-name */
		export interface _FormMixin {
			state: string;
			reset(): void;
			validate(): boolean;
			setValues(val: any): _FormMixin;
			getValues(): any;
			isValid(): boolean;
			onValidStateChange: OnValidStateChange;
			disconnectChildren(): void;
			connectChildren(inStartup?: boolean): void;
			startup(): void;
			destory(): void;
		}
	}

	namespace layout {
		/* dijit/ContentPane */
		export interface ContentPane extends _Widget, _Container, _ContentPaneResizeMixin {
			href: string;
			content: string;
			extractContent: boolean;
			parseOnLoad: boolean;
			parserScope: string;
			preventCache: boolean;
			preload: boolean;
			refreshOnShow: boolean;
			loadingMessage: string;
			errorMessage: string;
			isLoaded: boolean;
			baseClass: string;
			ioArgs: { [arg: string]: string|number };
			onLoadDeferred: dojo.Deferred<any>;
			stopParser: boolean;
			template: boolean;
			markupFactory<T>(params: any, node: HTMLElement, ctor: dojo.GenericConstructor<T>): T;
			create(params: any, srcNodeRef: HTMLElement): void;
			postMixInProperties(): void;
			buildRendering(): void;
			startup(): void;
			setHref(href: string|URL): ContentPane;
			setContent(data: string|HTMLElement|NodeList): ContentPane;
			cancel(): void;
			destroy(): void;
			destroyRecursive(): void;
			refresh(): dojo.Deferred<any>;
			destroyDescendants(preserveDom?: boolean): void;
			onLoad(data?: any): void;
			onUnload(): void;
			onDownloadStart(): string;
			onContentError(error: Error): void;
			onDownloadError(error: Error): void;
			onDownloadEnd(): void;
		}

		export interface ChangeSizeObject {
			w?: number;
			h?: number;
			l?: number;
			t?: number;
		}

		export interface ResultSizeObject {
			w: number;
			h: number;
		}

		/* dijit/layout/_ContentPaneResizeMixin */
		export interface _ContentPaneResizeMixin {
			doLayout: boolean;
			isLayoutContainer: boolean;
			startup(): void;
			resize(changeSize?: ChangeSizeObject, resultSize?: ResultSizeObject): void;
		}
	}
}
