/// <reference path="gfx/arc.d.ts" />
/// <reference path="gfx/bezierutils.d.ts" />
/// <reference path="gfx/decompose.d.ts" />
/// <reference path="gfx/filters.d.ts" />
/// <reference path="gfx/fx.d.ts" />
/// <reference path="gfx/gradient.d.ts" />
/// <reference path="gfx/gradutils.d.ts" />
/// <reference path="gfx/matrix.d.ts" />
/// <reference path="gfx/Moveable.d.ts" />
/// <reference path="gfx/Mover.d.ts" />
/// <reference path="gfx/path.d.ts" />
/// <reference path="gfx/registry.d.ts" />
/// <reference path="gfx/shape.d.ts" />
/// <reference path="gfx/utils.d.ts" />
/// <reference path="gfx/VectorText.d.ts" />

declare namespace dojox {
	namespace gfx {
		type CubicBezierCurve = [number, number, number, number, number, number, number, number];
		type GfxElement = Group | Shape | Surface;
		type QuadraticBezierCurve = [number, number, number, number, number, number];

		interface FixTarget {
			(event: Event, target: GfxElement): boolean;
		}

		type Fill = dojo._base.Color | LinearFill | RadialFill | Pattern;

		interface Font {
			family: string;
			size: string;
			style: string; // TODO: enum
			type: string; // TODO: enum
			variant: string; // TODO: enum
			weight: string; // TODO: enum
		}

		interface Gfx extends Renderer {
			readonly defaultPath: {
				path: string;
				type: string;
			};
			readonly defaultPolyline: Polyline;
			readonly defaultRect: Rectangle;

			fixTarget: FixTarget;
			splitFontString(font: string): Font;

			Matrix2D: dojox.gfx.matrix.Matrix2D;
		}

		interface GradientOffsetColor {
			color: string;
			offset: number;
		}

		interface Group extends Shape {
			nodeType: string;

			new(): void;
			setRawNode(node: Node): void;
		}

		interface LinearFill {
			colors: string[] | dojo._base.Color[];
			type: string; // TODO: enum
			x1: number;
			x2: number;
			y1: number;
			y2: number;
		}

		interface LinearGradient {
			angle?: number;
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

		interface Polyline extends Shape {
			points: Point[];

			// setShape(points: Point[] | { points: Point[] }, closed?: boolean): this;
		}

		interface Point {
			x: number;
			y: number;
		}

		interface RadialFill {
			colors: string[] | dojo._base.Color[];
			cx: number;
			cy: number;
			r: number;
			type: string; // TODO: enum
		}

		interface RadialGradient {
			colors: GradientOffsetColor[];
			cx: number;
			cy: number;
			r: number;
			type: string; // TODO: enum
		}

		interface Rect extends Shape, Rectangle {}

		interface Rectangle {
			height: number;
			width: number;
			x: number;
			y: number;
		}

		interface Renderer {
			createSurface(parentNode: Node, width: number | string, height: number | string): dojox.gfx.Surface;
		}

		interface Shape {
			bbox: Rectangle;
			fillStyle: dojox.gfx.Fill;
			matrix: dojox.gfx.matrix.Matrix2D;
			parent: Surface;
			parentMatrix: dojox.gfx.matrix.Matrix2D;
			rawNode: Node;
			shape: Shape;
			strokeStyle: Stroke;
			type: string; // TODO: enum

			new(): void;
			applyLeftTransform(matrix: dojox.gfx.matrix.MatrixLike): this;
			applyRightTransform(matrix: dojox.gfx.matrix.MatrixLike): this;
			applyTransform(matrix: dojox.gfx.matrix.MatrixLike): this;
			destroy(): void;
			getBoundingBox(): Rectangle;
			getClip(): dojox.gfx.shape.Clip;
			getEventSource(): Node;
			getFill(): Fill;
			getNode(): Node;
			getParent(): Surface;
			getShape(): Shape;
			getStroke(): Stroke;
			getTransform(): dojox.gfx.matrix.Matrix2D;
			getTransformedBoundingBox(): [number, number, number, number];
			moveToBack(): this;
			moveToFront(): this;
			removeShape(silently?: boolean): this;
			setClip(clip: dojox.gfx.shape.Clip): void;
			setFill(fill: dojox.gfx.Fill): this;
			setShape(shape: Shape): this;
			// for Path
			setShape(shape: string | dojox.gfx.path.Path): this;
			// for Polyline
			setShape(points: Point[] | { points: Point[] }, closed?: boolean): this;
			setStroke(stroke: Stroke): this;
			setTransform(matrix: dojox.gfx.matrix.Matrix2D): this;
		}

		interface Stroke {
			cap: string; // TODO: enum
			color: string;
			join: number;
			style: string; // TODO: enum
			width: number;
		}

		interface Surface {
			isLoaded: boolean;
			rawNode: Node;

			new(): Surface;
			destroy(): void;
			getEventSource(): Node;
			onLoad(surface: Surface): void;
			whenLoaded(context: Object, method: string | Function): void;
		}

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

		interface Translation {
			dx: number;
			dy: number;
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
