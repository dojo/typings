/// <reference path="dojo" />

declare namespace dojo {
	interface NodeList<T extends Node> {
		/**
		 * see `dojo/html.set()`. Set the content of all elements of this NodeList
		 */
		html(cont?: ContentSetterContent, params?: ContentSetterParams): this;
	}
}

declare module 'dojo/NodeList-html' {
	const NodeList: dojo.NodeListConstructor;
	export = NodeList;
}
