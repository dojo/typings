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
		type ColorLike = dojo._base.ColorValue | dojo._base.ColorValueAlpha | dojo._base.ColorObject | string;
		type CubicBezierCurve = [number, number, number, number, number, number, number, number];
		type Fill = ColorLike | LinearFill | RadialFill | Pattern;
		type GfxElement = Group | dojox.gfx.shape.Shape | dojox.gfx.shape.Surface;
		type QuadraticBezierCurve = [number, number, number, number, number, number];

		interface CreateSurface {
			(parentNode: Node, width: number | string, height: number | string): dojox.gfx.shape.Surface;
		}

		interface FixTarget {
			(event: Event, target: GfxElement): boolean;
		}

		interface Font extends SimpleShape {
			family?: string;
			size?: string;
			style?: string; // TODO: enum
			variant?: string; // TODO: enum
			weight?: string; // TODO: enum
		}

		interface GradientOffsetColor {
			color: string;
			offset: number;
		}

		interface Group extends dojox.gfx.shape.Shape, dojox.gfx.shape.Container, dojox.gfx.shape.Creator {
			setRawNode(node: Node): void;
		}

		interface GroupConstructor extends dojox.gfx.shape.ShapeConstructor {
			new(): Group;
			prototype: Group;
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
			colors?: GradientOffsetColor[];
			x1: number;
			x2: number;
			y1: number;
			y2: number;
		}

		interface Pattern extends SimpleShape {
			height?: number;
			src: string;
			width?: number;
			x?: number;
			y?: number;
		}

		interface Point {
			x: number;
			y: number;
		}

		// TODO: is this type necessary? It only matches the logic in 'dojox/gfx/gradutils.getColor',
		// which itself is not actually called anywhere within 'dojox/gfx'.
		interface RadialFill {
			colors?: string[] | dojo._base.Color[];
			cx?: number;
			cy?: number;
			r?: number;
			type?: string; // TODO: enum
		}

		interface RadialGradient extends SimpleShape {
			colors?: GradientOffsetColor[];
			cx: number;
			cy: number;
			r: number;
		}

		// TODO: maybe complete this? (probably not important)
		// Missing methods: look in 'dojox/gfx/svg.js'
		// These methods are all defined in each specific renderer, but copied to the base module by
		// 'dojox/gfx/_base.switchTo', so the typings have been defined in this file (e.g. Group, Rect, Ellipse).
		interface Renderer {
			createSurface: CreateSurface;
			fixTarget: FixTarget;
		}

		interface SimpleCircle extends SimpleShape {
			cx: number;
			cy: number;
			r: number;
		}

		interface SimpleEllipse extends SimpleShape {
			cx: number;
			cy: number;
			rx: number;
			ry: number;
		}

		interface SimpleImage extends SimpleShape {
			height?: number;
			src: string;
			width?: number;
			x?: number;
			y?: number;
		}

		interface SimpleLine extends SimpleShape {
			x1: number;
			x2: number;
			y1: number;
			y2: number;
		}

		interface SimplePath extends SimpleShape {
			path: string;
		}

		interface SimplePolyline extends SimpleShape {
			points: Point[];
		}

		interface SimpleRectangle extends SimpleShape {
			height: number;
			r?: number;
			width: number;
			x: number;
			y: number;
		}

		interface SimpleShape {
			type?: string; // TODO: enum
		}

		interface SimpleText extends SimpleShape {
			align?: string; // TODO: enum
			decoration?: string;
			fitting?: number; // TODO: enum
			height?: number;
			kerning: boolean;
			leading?: number;
			rotated?: boolean;
			text: string;
			width?: number;
			x?: number;
			y?: number;
		}

		interface SimpleTextPath extends SimpleShape {
			align?: string;
			decoration?: string;
			kerning?: boolean;
			rotated?: boolean;
			text: string;
		}

		interface Stroke extends SimpleShape {
			cap?: string; // TODO: enum
			color?: ColorLike;
			join?: number | string;
			style?: string; // TODO: enum
			width?: number;
		}

		interface Translation {
			dx: number;
			dy: number;
		}
	}
}

declare module 'dojox/gfx' {
	/* tslint:disable:no-unused-variable */
	type Circle = dojox.gfx.shape.Circle;
	const Circle: dojox.gfx.shape.CircleConstructor;
	type ColorLike = dojox.gfx.ColorLike;
	type CubicBezierCurve = dojox.gfx.CubicBezierCurve;
	type Ellipse = dojox.gfx.shape.Ellipse;
	const Ellipse: dojox.gfx.shape.EllipseConstructor;
	type Fill = dojox.gfx.Fill;
	type Font = dojox.gfx.Font;
	type GfxElement = dojox.gfx.GfxElement;
	type GradientOffsetColor = dojox.gfx.GradientOffsetColor;
	type Group = dojox.gfx.Group;
	const Group: dojox.gfx.GroupConstructor;
	type Image = dojox.gfx.shape.Image;
	const Image: dojox.gfx.shape.ImageConstructor;
	type Line = dojox.gfx.shape.Line;
	const Line: dojox.gfx.shape.LineConstructor;
	type LinearFill = dojox.gfx.LinearFill;
	type LinearGradient = dojox.gfx.LinearGradient;
	type Path = dojox.gfx.path.Path;
	const Path: dojox.gfx.path.PathConstructor;
	type Pattern = dojox.gfx.Pattern;
	type Point = dojox.gfx.Point;
	type PolyLine = dojox.gfx.shape.PolyLine;
	const PolyLine: dojox.gfx.shape.PolyLineConstructor;
	type QuadraticBezierCurve = dojox.gfx.QuadraticBezierCurve;
	type RadialFill = dojox.gfx.RadialFill;
	type RadialGradient = dojox.gfx.RadialGradient;
	type Rect = dojox.gfx.shape.Rect;
	const Rect: dojox.gfx.shape.RectConstructor;
	type Renderer = dojox.gfx.Renderer;
	type SimpleCircle = dojox.gfx.SimpleCircle;
	type SimpleEllipse = dojox.gfx.SimpleEllipse;
	type SimpleImage = dojox.gfx.SimpleImage;
	type SimpleLine = dojox.gfx.SimpleLine;
	type SimplePath = dojox.gfx.SimplePath;
	type SimplePolyline = dojox.gfx.SimplePolyline;
	type SimpleRectangle = dojox.gfx.SimpleRectangle;
	type SimpleShape = dojox.gfx.SimpleShape;
	type SimpleText = dojox.gfx.SimpleText;
	type SimpleTextPath = dojox.gfx.SimpleTextPath;
	type Stroke = dojox.gfx.Stroke;
	type Surface = dojox.gfx.shape.Surface;
	const Surface: dojox.gfx.shape.SurfaceConstructor;
	type Text = dojox.gfx.shape.Text;
	const Text: dojox.gfx.shape.TextConstructor;
	type TextPath = dojox.gfx.path.TextPath;
	const TextPath: dojox.gfx.path.TextPathConstructor;

	/* tslint:disable-next-line:variable-name */
	const cm_in_pt: number;
	const defaultCircle: dojox.gfx.SimpleCircle;
	const defaultEllipse: dojox.gfx.SimpleEllipse;
	const defaultFont: dojox.gfx.Font;
	const defaultImage: dojox.gfx.SimpleImage;
	const defaultLine: dojox.gfx.SimpleLine;
	const defaultLinearGradient: dojox.gfx.LinearGradient;
	const defaultPath: dojox.gfx.SimplePath;
	const defaultPattern: dojox.gfx.Pattern;
	const defaultPolyline: dojox.gfx.SimplePolyline;
	const defaultRadialGradient: dojox.gfx.RadialGradient;
	const defaultRect: dojox.gfx.SimpleRectangle;
	const defaultStroke: dojox.gfx.Stroke;
	const defaultText: dojox.gfx.SimpleText;
	const defaultTextPath: dojox.gfx.SimpleTextPath;
	const defaultVectorFont: dojox.gfx.VectorFont; // from dojox/gfx/VectorText
	const defaultVectorText: dojox.gfx.VectorText; // from dojox/gfx/VectorText
	/* tslint:disable-next-line:variable-name */
	const mm_in_pt: number;
	const pathSvgRegExp: RegExp;
	const pathVmlRegExp: RegExp;
	const vectorFontFitting: {
		NONE: string;
		FLOW: string;
		FIT: string;
	}; // from dojox/gfx/VectorText

	const createSurface: dojox.gfx.CreateSurface;
	const equalSources: (a: any, b: any) => boolean;
	const fixTarget: dojox.gfx.FixTarget;
	const formatNumber: (value: number, addSpace: boolean) => string;
	const getDefault: (shapeType: string) => dojox.gfx.SimpleShape;
	const getVectorFont: (url: string) => dojox.gfx.VectorText; // from dojox/gfx/VectorText
	const makeFontString: (font: dojox.gfx.Font) => string;
	const makeParameters: (defaults: Object, options: Object) => Object;
	const normalizeColor: (color: dojox.gfx.ColorLike) => dojo._base.Color;
	const normalizedLength: (cssLengthString: string) => number;
	const normalizeParameters: (target: Object, source: Object) => Object;
	const pt2px: (points: number) => number;
	const px2pt: (pixels: number) => number;
	/* tslint:disable-next-line:variable-name */
	const px_in_pt: () => number;
	const splitFontString: (fontString: string) => dojox.gfx.Font;
	const switchTo: (renderer: string | dojox.gfx.Renderer) => void;
	/* tslint:enable */
}

declare module 'dojox/gfx/_base' {
	export * from 'dojox/gfx';
}
