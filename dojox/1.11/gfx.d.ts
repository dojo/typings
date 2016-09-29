/// <reference path="gfx/matrix.d.ts" />
/// <reference path="gfx/shape.d.ts" />

declare namespace dojox {
	namespace gfx {
		interface Fill {
			color: string | dojo._base.Color;
			type: string; // TODO: enum
		}

		interface Gfx extends Renderer {
			Matrix2D: dojox.gfx.matrix.Matrix2D;
		}

		interface GradientOffsetColor {
			color: string;
			offset: number;
		}

		interface LinearGradient {
			colors: GradientOffsetColor[];
			type: string; // TODO: enum
			x1: number;
			x2: number;
			y1: number;
			y2: number;
		}

		interface Pattern {
			height: number;
			src: string;
			type: string; // TODO: enum
			width: number;
			x: number;
			y: number;
		}

		interface Point {
			x: number;
			y: number;
		}

		interface RadialGradient {
			colors: GradientOffsetColor[];
			cx: number;
			cy: number;
			r: number;
			type: string; // TODO: enum
		}

		interface Rectangle {
			height: number;
			width: number;
			x: number;
			y: number;
		}

		interface Renderer {
			createSurface(parentNode: Node, width: number | string, height: number | string): dojox.gfx.Surface;
		}

		interface Stroke {
			cap: string; // TODO: enum
			color: string;
			join: number;
			style: string; // TODO: enum
			width: number;
		}

		interface Surface {}

		interface Text {
			align: string; // TODO: enum
			decoration: string;
			fitting: number; // TODO: enum
			height: number;
			leading: number;
			text: string;
			width: number;
			x: number;
			y: number;
		}
	}
}

declare module 'dojox/gfx' {
	const gfx: dojox.gfx.Gfx;
	export = gfx;
}

declare module 'dojox/gfx/_base' {
	const gfxBase: dojox.gfx.Gfx;
	export = gfxBase;
}
