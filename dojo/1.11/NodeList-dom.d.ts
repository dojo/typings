/// <reference path="dojo.d.ts" />

declare namespace dojo {
	interface NormalizeObject {
		[prop: string]: any;
		parse?: boolean;
		template?: string;
		templateFunc?: Function;
	}

	interface NodeList<T extends Node> {
		/**
		 * normalizes data to an array of items to insert.
		 */
		_normalize(content: string | number | Node | ArrayLike<Node> | NormalizeObject, refNode?: Node): any[];

		/**
		 * private utility to clone a node. Not very interesting in the vanilla
		 * dojo/NodeList case, but delegates could do interesting things like
		 * clone event handlers if that is derivable from the node.
		 */
		_cloneNode<T extends Node>(node: T): T;

		/**
		 * private utility to handle placing an array of nodes relative to another node.
		 */
		_place(ary: ArrayLike<Node>, refNode: Node, position: string, useClone?: boolean): void;

		/**
		 * Returns border-box objects (x/y/w/h) of all elements in a node list
		 * as an Array (*not* a NodeList). Acts like `dojo/dom-geometry-position`, though
		 * assumes the node passed is each node in this list.
		 */
		position(): DomGeometryXYBox[];

		/**
		 * gets or sets the DOM attribute for every element in the
		 * NodeList. See also `dojo/dom-attr`
		 */
		attr(property: string): any[];
		attr(property: Object): this;
		attr(property: string, value: any): this;

		/**
		 * gets or sets the CSS property for every element in the NodeList
		 */
		style(property: string): (string | number)[];
		style(property: Object): this;
		style(property: string, value: string): this;

		/**
		 * adds the specified class to every node in the list
		 */
		addClass(className: string | string[]): this;

		/**
		 * removes the specified class from every node in the list
		 */
		removeClass(className: string | string[]): this;

		/**
		 * Adds a class to node if not present, or removes if present.
		 * Pass a boolean condition if you want to explicitly add or remove.
		 */
		toggleClass(className: string | string[], condition?: boolean): this;

		/**
		 * Replaces one or more classes on a node if not present.
		 * Operates more quickly than calling `removeClass()` and `addClass()`
		 */
		replaceClass(addClassStr: string | string[], removeClassStr?: string | string[]): this;

		/**
		 * clears all content from each node in the list. Effectively
		 * equivalent to removing all child nodes from every item in
		 * the list.
		 */
		empty(): this;

		/**
		 * Removes an attribute from each node in the list.
		 */
		removeAttr(name: string): this;

		/**
		 * Returns margin-box size of nodes
		 */
		marginBox(): DomGeometryBox[];

		/**
		 * destroys every item in the list.
		 */
		destroy(): void;

		/**
		 * places elements of this node list relative to the first element matched
		 * by queryOrNode. Returns the original NodeList. See: `dojo/dom-construct.place`
		 */
		place(queryOrNode: NodeOrString, position?: string /* PosString */ | number): this;

		/**
		 * removes elements in this list that match the filter
		 * from their parents and returns them as a new NodeList.
		 */
		orphan(filter?: string | NodeListFilterCallback<T>): this;

		/**
		 * places any/all elements in queryOrListOrNode at a
		 * position relative to the first element in this list.
		 * Returns a dojo/NodeList of the adopted elements.
		 */
		adopt<Q extends Node>(queryOrListOrNode: string | Node | NodeList<Node>, position?: string /* PosString */ | number): NodeList<Q>;

		/**
		 * Returns a new list whose members match the passed query,
		 * assuming elements of the current NodeList as the root for
		 * each search.
		 */
		query<Q extends Node>(queryStr: string): NodeList<Q>;

		/**
		 * "masks" the built-in javascript filter() method (supported
		 * in Dojo via `dojo.filter`) to support passing a simple
		 * string filter in addition to supporting filtering function
		 * objects.
		 */
		filter(filter: string | NodeListFilterCallback<T>): this;

		/**
		 * creates node clones of each element of this list
		 * and returns a new list containing the clones
		 */
		clone(): this;

		/**
		 * add a node, NodeList or some HTML as a string to every item in the
		 * list.  Returns the original list.
		 */
		addContent(content: string | number | Node | ArrayLike<Node> | NormalizeObject, position?: string /* PosString */ | number): this;
	}
}

declare module 'dojo/NodeList-dom' {
	type NodeList<T extends Node> = dojo.NodeList<T>;
	const NodeList: dojo.NodeListConstructor;
	export = NodeList;
}
