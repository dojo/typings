/// <reference path="dojo.d.ts" />

declare namespace dojo {
	interface NodeList<T extends Node> {
		/**
		 * builds a new array of possibly differing size based on the input list.
		 * Since the returned array is likely of different size than the input array,
		 * the array's map function cannot be used.
		 */
		_buildArrayFromCallback<U>(callback: (node: T, ary: U[]) => U[]): U[];

		/**
		 * given a list of nodes, make sure only unique
		 * elements are returned as our NodeList object.
		 * Does not call _stash().
		 */
		_getUniqueAsNodeList(nodes: ArrayLike<T>): this;

		/**
		 * gets unique element nodes, filters them further
		 * with an optional query and then calls _stash to track parent NodeList.
		 */
		_getUniqueNodeListWithParent(nodes: ArrayLike<T>, query?: string): this;

		/**
		 * cycles over all the nodes and calls a callback
		 * to collect nodes for a possible inclusion in a result.
		 * The callback will get two args: callback(node, ary),
		 * where ary is the array being used to collect the nodes.
		 */
		_getRelatedUniqueNodes<U extends Node>(query: string, callback: (node: T, ary: U[]) => U[]): NodeList<U>;

		/**
		 * Returns all immediate child elements for nodes in this dojo/NodeList.
		 * Optionally takes a query to filter the child elements.
		 */
		children<U extends Node>(query?: string): NodeList<T>;

		/**
		 * Returns closest parent that matches query, including current node in this
		 * dojo/NodeList if it matches the query.
		 */
		closest<U extends Node>(query: string, root?: NodeOrString): NodeList<U>;

		/**
		 * Returns immediate parent elements for nodes in this dojo/NodeList.
		 * Optionally takes a query to filter the parent elements.
		 */
		parent<U extends Node>(query?: string): NodeList<U>;

		/**
		 * Returns all parent elements for nodes in this dojo/NodeList.
		 * Optionally takes a query to filter the child elements.
		 */
		parents<U extends Node>(query?: string): NodeList<U>;

		/**
		 * Returns all sibling elements for nodes in this dojo/NodeList.
		 * Optionally takes a query to filter the sibling elements.
		 */
		siblings<U extends Node>(query?: string): NodeList<U>;

		/**
		 * Returns the next element for nodes in this dojo/NodeList.
		 * Optionally takes a query to filter the next elements.
		 */
		next<U extends Node>(query?: string): NodeList<U>;

		/**
		 * Returns all sibling elements that come after the nodes in this dojo/NodeList.
		 * Optionally takes a query to filter the sibling elements.
		 */
		nextAll<U extends Node>(query?: string): NodeList<U>;

		/**
		 * Returns the previous element for nodes in this dojo/NodeList.
		 * Optionally takes a query to filter the previous elements.
		 */
		prev<U extends Node>(query?: string): NodeList<U>;

		/**
		 * Returns all sibling elements that come before the nodes in this dojo/NodeList.
		 * Optionally takes a query to filter the sibling elements.
		 */
		prevAll<U extends Node>(query?: string): NodeList<U>;

		/**
		 * Adds the nodes from the previous dojo/NodeList to the current dojo/NodeList.
		 */
		andSelf(): this;

		/**
		 * Returns the first node in this dojo/NodeList as a dojo/NodeList.
		 */
		first(): this;

		/**
		 * Returns the last node in this dojo/NodeList as a dojo/NodeList.
		 */
		last(): this;

		/**
		 * Returns the even nodes in this dojo/NodeList as a dojo/NodeList.
		 */
		even(): this;

		/**
		 * Returns the odd nodes in this dojo/NodeList as a dojo/NodeList.
		 */
		odd(): this;
	}
}

declare module 'dojo/NodeList-traverse' {
	type NodeList<T extends Node> = dojo.NodeList<T>;
	const NodeList: dojo.NodeListConstructor;
	export = NodeList;
}
