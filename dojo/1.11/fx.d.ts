/// <reference path="_base.d.ts" />

/* dojo/fx */

declare namespace dojo {
	namespace _base {

		interface AnimationStartEnd {
			start?: number | string;
			end?: number | string;
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

/* dojo/fx/easing */

declare namespace dojo {
	namespace fx {
		interface Easing {
			linear(n?: number): number;
			quadIn(n?: number): number;
			quadOut(n?: number): number;
			quadInOut(n?: number): number;
			cubicIn(n?: number): number;
			cubicOut(n?: number): number;
			cubicInOut(n?: number): number;
			quartIn(n?: number): number;
			quartOut(n?: number): number;
			quartInOut(n?: number): number;
			quintIn(n?: number): number;
			quintOut(n?: number): number;
			qunitInOut(n?: number): number;
			sineIn(n?: number): number;
			sineOut(n?: number): number;
			sineInOut(n?: number): number;
			expoIn(n?: number): number;
			expoOut(n?: number): number;
			expoInOut(n?: number): number;
			circIn(n?: number): number;
			circOut(n?: number): number;
			circInOut(n?: number): number;

			/**
			 * An easing function that starts away from the target,
			 * and quickly accelerates towards the end value.
			 *
			 * Use caution when the easing will cause values to become
			 * negative as some properties cannot be set to negative values.
			 */
			backIn(n?: number): number;

			/**
			 * An easing function that pops past the range briefly, and slowly comes back.
			 */
			backOut(n?: number): number;

			/**
			 * An easing function combining the effects of `backIn` and `backOut`
			 */
			backInOut(n?: number): number;

			/**
			 * An easing function the elastically snaps from the start value
			 */
			elasticIn(n?: number): number;

			/**
			 * An easing function that elasticly snaps around the target value,
			 * near the end of the Animation
			 */
			elasticOut(n?: number): number;

			/**
			 * An easing function that elasticly snaps around the value, near
			 * the beginning and end of the Animation.
			 */
			elasticInOut(n?: number): number;

			/**
			 * An easing function that 'bounces' near the beginning of an Animation
			 */
			bounceIn(n?: number): number;

			/**
			 * An easing function that 'bounces' near the end of an Animation
			 */
			bounceOut(n?: number): number;

			/**
			 * An easing function that 'bounces' at the beginning and end of the Animation
			 */
			bounceInOut(n?: number): number;
		}
	}
}

declare module 'dojo/fx/easing' {
	const easing: dojo.fx.Easing;
	export = easing;
}

/* dojo/fx/Toggler */

declare namespace dojo {
	namespace fx {

		interface TogglerArguments extends _base.AnimationArguments { }

		interface Toggler {
			_showArgs: TogglerArguments;
			_showAnim: _base.Animation;
			_hideArgs: TogglerArguments;
			_hideAnim: _base.Animation;
			_isShowing: boolean;
			_isHiding: boolean;

			/**
			 * the node to target for the showing and hiding animations
			 */
			node: Node;

			/**
			 * The function that returns the `dojo.Animation` to show the node
			 */
			showFunc: (args: _base.FadeArguments) => _base.Animation;

			/**
			 * The function that returns the `dojo.Animation` to hide the node
			 */
			hideFunc: (args: _base.FadeArguments) => _base.Animation;

			/**
			 * Time in milliseconds to run the show Animation
			 */
			showDuration: number;

			/**
			 * Time in milliseconds to run the hide Animation
			 */
			hideDuration: number;

			/**
			 * Toggle the node to showing
			 */
			show(delay?: number): _base.Animation;

			/**
			 * Toggle the node to hidden
			 */
			hide(delay?: number): _base.Animation;
		}

		interface TogglerConstructor {
			/**
			 * A simple `dojo.Animation` toggler API.
			 */
			new (args: TogglerArguments): Toggler;
			prototype: Toggler;
		}
	}
}
