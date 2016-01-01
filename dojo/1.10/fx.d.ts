/// <reference path="_base" />

declare namespace dojo {
	namespace _base {

		interface AnimationStartEnd {
			start?: number;
			end?: number;
		}

		interface AnimationArgumentsProperties {
			top?: number | AnimationStartEnd;
			left?: number | AnimationStartEnd;
			height?: number | AnimationStartEnd;
		}

		interface Fx {
			/**
			 * Chain a list of `dojo/_base/fx.Animation`s to run in sequence
			 */
			chain(animations: Animation[]): Animation;
			chain(...animations: Animation[]): Animation;

			/**
			 * Combine a list of `dojo/_base/fx.Animation`s to run in parallel
			 */
			combine(animations: Animation[]): Animation;
			combine(...animations: Animation[]): Animation;

			/**
			 * Expand a node to it's natural height.
			 */
			wipeIn(args: AnimationArguments): Animation;

			/**
			 * Shrink a node to nothing and hide it.
			 */
			wipeOut(args: AnimationArguments): Animation;

			/**
			 * Slide a node to a new top/left position
			 */
			slideTo(args: AnimationArguments): Animation;
		}
	}
}

declare module 'dojo/fx' {
	const coreFx: dojo._base.Fx;
	export = coreFx;
}
