interface OpenAjaxLibrary {
	prefix: string;
	namespaceURI: string;
	version: string;
	extraData: any;
}

interface OpenAjaxHub {
	implementer: string;
	implVersion: string;
	specVersion: string;
	implExtraData: { [prop: string]: any };
	libraries: { [name: string]: OpenAjaxLibrary };
	registerLibrary(prefix: string, nsURL: string, extra: any): void;
	unregisterLibrary(prefix: string): void;

	_subscriptions: { c: Object; s: any[]; };
	_cleanup: any[];
	_subIndex: number;
	_pubDepth: number;

	subscribe(name: string, callback: (name: string, msg: any, d: any) => void, scope?: Object, subscriberData?: any, filter?: (name: string, msg: any, d: any) => boolean): string;
	publish(name: string, message: any): void;
	unsubscribe(sub: string): void;

	_subscribe(tree: { c: Object; s: any[]; }, path: string[], index: number, sub: Object): void;
	_publish(tree: { c: Object; s: any[]; }, path: string[], index: number, name: string, msg: any): void;
	_unsubscribe(tree: { c: Object; s: any[]; }, path: string[], index: number, sid: number): void;

	/**
	 * The following function is provided for automatic testing purposes.
	 * It is not expected to be deployed in run-time OpenAjax Hub implementations.
	 */
	reinit(): void;
}

interface OpenAjax {
	new (): OpenAjax;
	hub: OpenAjaxHub;
}

declare var OpenAjax: OpenAjax;
