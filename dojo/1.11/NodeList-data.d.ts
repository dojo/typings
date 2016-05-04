/// <reference path="dojo.d.ts" />

declare namespace dojo {
	interface NodeList<T extends Node> {

		/**
		 * An alias to the private dataCache for NodeList-data. NEVER USE THIS!
		 * This private is only exposed for the benefit of unit testing, and is
		 * removed during the build process.
		 */
		_nodeDataCache: { [id: string]: { [key: string]: any } };

		/**
		 * super expensive: GC all data in the data for nodes that no longer exist in the dom.
		 */
		_gcNodeData(): void;

		/**
		 * stash or get some arbitrary data on/from these nodes.
		 */
		data(): any[];
		data(key: string): any[];
		data(key: Object): this;
		data(key: string, value: any): this;
	}
}

declare module 'dojo/NodeList-data' {
	type NodeList<T extends Node> = dojo.NodeList<T>;
	const NodeList: dojo.NodeListConstructor;
	export = NodeList;
}
