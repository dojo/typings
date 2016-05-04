/// <reference path="dojo.d.ts" />

declare namespace dojo {
	interface NodeList<T extends Node> {
		/**
		 * see `dojo/html.set()`. Set the content of all elements of this NodeList
		 */
		html(cont?: ContentSetterContent, params?: ContentSetterParams): this;
	}
}

declare module 'dojo/NodeList-html' {
	type NodeList<T extends Node> = dojo.NodeList<T>;
	const NodeList: dojo.NodeListConstructor;
	export = NodeList;
}
