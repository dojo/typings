/// <reference path="dojo.d.ts" />
/// <reference path="_base.d.ts" />
/// <reference path="fx.d.ts" />

declare namespace dojo {

	interface NodeListAnimationArgs extends _base.AnimationArguments {
		auto?: boolean;
	}

	interface NodeList<T extends Node> {
		_anim(obj: any, method: string, args?: NodeListAnimationArgs): _base.Animation | this;

		/**
		 * wipe in all elements of this NodeList via `dojo/fx.wipeIn()`
		 */
		wipeIn(args: NodeListAnimationArgs): _base.Animation | this;

		/**
		 * wipe out all elements of this NodeList via `dojo/fx.wipeOut()`
		 */
		wipeOut(args: NodeListAnimationArgs): _base.Animation | this;

		/**
		 * slide all elements of the node list to the specified place via `dojo/fx.slideTo()`
		 */
		slideTo(args: NodeListAnimationArgs): _base.Animation | this;

		/**
		 * fade in all elements of this NodeList via `dojo.fadeIn`
		 */
		fadeIn(args: NodeListAnimationArgs): _base.Animation | this;

		/**
		 * fade out all elements of this NodeList via `dojo.fadeOut`
		 */
		fadeOut(args: NodeListAnimationArgs): _base.Animation | this;

		/**
		 * Animate all elements of this NodeList across the properties specified.
		 * syntax identical to `dojo.animateProperty`
		 */
		animateProperty(args: NodeListAnimationArgs): _base.Animation | this;

		/**
		 * Animate one or more CSS properties for all nodes in this list.
		 * The returned animation object will already be playing when it
		 * is returned. See the docs for `dojo.anim` for full details.
		 */
		anim(properties: _base.AnimationArgumentsProperties, duration?: number, easing?: (n?: number) => number, onEnd?: Function, delay?: number): _base.Animation;
	}
}

declare module 'dojo/NodeList-fx' {
	type NodeList<T extends Node> = dojo.NodeList<T>;
	const NodeList: dojo.NodeListConstructor;
	export = NodeList;
}
