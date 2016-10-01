/// <reference path="gfx/arc.d.ts" />
/// <reference path="gfx/bezierutils.d.ts" />
/// <reference path="gfx/decompose.d.ts" />
/// <reference path="gfx/filters.d.ts" />
/// <reference path="gfx/matrix.d.ts" />
/// <reference path="gfx/registry.d.ts" />
/// <reference path="gfx/shape.d.ts" />

declare namespace dojox {
	namespace gfx {
		type CubicBezierCurve = [number, number, number, number, number, number, number, number];
		type GfxElement = Group | Shape | Surface;
		type QuadraticBezierCurve = [number, number, number, number, number, number];

		interface FixTarget {
			(event: Event, target: GfxElement): boolean;
		}

		interface Fill {
			color: string | dojo._base.Color;
			type: string; // TODO: enum
		}

		interface Gfx extends Renderer {
			readonly defaultPath: {
				path: string;
				type: string;
			};
			readonly defaultPolyline: Polyline;
			readonly defaultRect: Rectangle;

			fixTarget: FixTarget;

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

		interface Polyline extends Shape {
			points: Point[];

			// setShape(points: Point[] | { points: Point[] }, closed?: boolean): this;
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
			type: string;

			new(): void;
			applyLeftTransform(matrix: dojox.gfx.matrix.MatrixLike): this;
			applyRightTransform(matrix: dojox.gfx.matrix.MatrixLike): this;
			applyTransform(matrix: dojox.gfx.matrix.MatrixLike): this;
			destroy(): void;
			getBoundingBox(): Rectangle;
			getClip(): dojox.gfx.shape.Clip;
			getEventSource(): Node;
			getFill(): dojox.gfx.Fill;
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
