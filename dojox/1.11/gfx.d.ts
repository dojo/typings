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
		type Fill = dojo._base.Color | LinearFill | RadialFill | Pattern;
		type GfxElement = Group | dojox.gfx.shape.Shape | dojox.gfx.shape.Surface;
		type QuadraticBezierCurve = [number, number, number, number, number, number];

		interface CreateSurface {
			(parentNode: Node, width: number | string, height: number | string): dojox.gfx.shape.Surface;
		}

		interface FixTarget {
			(event: Event, target: GfxElement): boolean;
		}

		interface Circle extends SimpleShape {
			cx: number,
			cy: number,
			r: number
		}

		interface SimpleEllipse extends SimpleShape {
			cx: number,
			cy: number,
			rx: number,
			ry: number
		}

		interface Font extends SimpleShape {
			family: string;
			size: string;
			style: string; // TODO: enum
			variant: string; // TODO: enum
			weight: string; // TODO: enum
		}

		interface GradientOffsetColor {
			color: string;
			offset: number;
		}

		interface Group extends dojox.gfx.shape.ShapeConstructor {
			nodeType: string;

			setRawNode(node: Node): void;
		}

		interface Image extends SimpleShape {
			height: number;
			src: string;
			width: number;
			x: number;
			y: number;
		}

		interface Line extends SimpleShape {
			x1: number;
			x2: number;
			y1: number;
			y2: number;
		}

		interface LinearFill {
			colors: string[] | dojo._base.Color[];
			type: string; // TODO: enum
			x1: number;
			x2: number;
			y1: number;
			y2: number;
		}

		interface LinearGradient extends SimpleShape {
			angle?: number;
			colors: GradientOffsetColor[];
			x1: number;
			x2: number;
			y1: number;
			y2: number;
		}

		interface Path extends SimpleShape {
			path: string
		}

		interface Pattern extends SimpleShape {
			height: number;
			src: string;
			width: number;
			x: number;
			y: number;
		}

		interface Polyline extends SimpleShape {
			points: Point[];
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

		interface RadialGradient extends SimpleShape {
			colors: GradientOffsetColor[];
			cx: number;
			cy: number;
			r: number;
		}

		interface Rectangle extends SimpleShape {
			height: number;
			r: number;
			width: number;
			x: number;
			y: number;
		}

		interface Renderer {
			createSurface: CreateSurface;
			fixTarget: FixTarget;
		}

		interface SimpleShape {
			type: string; // TODO: enum
		}

		interface Stroke extends SimpleShape {
			cap: string; // TODO: enum
			color: string;
			join: number;
			style: string; // TODO: enum
			width: number;
		}

		interface Text extends SimpleShape {
			align: string; // TODO: enum
			decoration: string;
			fitting?: number; // TODO: enum
			height?: number;
			kerning: boolean;
			leading?: number;
			rotated: boolean;
			text: string;
			width?: number;
			x: number;
			y: number;
		}

		interface TextPath extends SimpleShape {
			align: string;
			decoration: string;
			kerning: boolean;
			rotated: boolean;
			text: string;
		}

		interface Translation {
			dx: number;
			dy: number;
		}
	}
}

declare module 'dojox/gfx' {
	type Circle = dojox.gfx.Circle;
	type CubicBezierCurve = dojox.gfx.CubicBezierCurve;
	type Ellipse = dojox.gfx.shape.Ellipse;
	type Fill = dojox.gfx.Fill;
	type GfxElement = dojox.gfx.GfxElement;
	type Group = dojox.gfx.Group;
	const Group: dojox.gfx.Group;
	type Path = dojox.gfx.Path;
	type Polyline = dojox.gfx.Polyline;
	type QuadraticBezierCurve = dojox.gfx.QuadraticBezierCurve;
	type Rect = dojox.gfx.shape.Rect;
	type Rectangle = dojox.gfx.Rectangle;
	type SimpleEllipse = dojox.gfx.SimpleEllipse;
	type SimpleShape = dojox.gfx.SimpleShape;
	type Surface = dojox.gfx.shape.Surface;

	const cm_in_pt: number;
	const defaultCircle: dojox.gfx.Circle;
	const defaultEllipse: dojox.gfx.SimpleEllipse;
	const defaultFont: dojox.gfx.Font;
	const defaultImage: dojox.gfx.Image;
	const defaultLine: dojox.gfx.Line;
	const defaultLinearGradient: dojox.gfx.LinearGradient;
	const defaultPath: dojox.gfx.Path;
	const defaultPattern: dojox.gfx.Pattern;
	const defaultPolyline: dojox.gfx.Polyline;
	const defaultRadialGradient: dojox.gfx.RadialGradient;
	const defaultRect: dojox.gfx.Rectangle;
	const defaultStroke: dojox.gfx.Stroke;
	const defaultText: dojox.gfx.Text;
	const defaultTextPath: dojox.gfx.TextPath;
	const mm_in_pt: number;
	const pathSvgRegExp: RegExp;
	const pathVmlRegExp: RegExp;

	const createSurface: dojox.gfx.CreateSurface;
	const equalSources: (a: any, b: any) => boolean;
	const fixTarget: dojox.gfx.FixTarget;
	const formatNumber: (number: number, addSpace: boolean) => string;
	const getDefault: (shapeType: string) => dojox.gfx.SimpleShape;
	const makeFontString: (font: dojox.gfx.Font) => string;
	const makeParameters: (defaults: Object, options: Object) => Object;
	const normalizeColor: (color: dojo._base.ColorValue | dojo._base.ColorValueAlpha | dojo._base.ColorObject | string) => dojo._base.Color;
	const normalizedLength: (cssLengthString: string) => number;
	const normalizeParameters: (target: Object, source: Object) => Object;
	const pt2px: (points: number) => number;
	const px2pt: (pixels: number) => number;
	const px_in_pt: () => number;
	const splitFontString: (fontString: string) => dojox.gfx.Font;
	const switchTo: (renderer: string | dojox.gfx.Renderer) => void;
}

declare module 'dojox/gfx/_base' {
	export * from 'dojox/gfx';
}
