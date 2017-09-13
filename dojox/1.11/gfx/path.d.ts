declare namespace dojox {
	namespace gfx {
		namespace path {
			interface Path extends dojox.gfx.shape.Shape {
				absolute: boolean;
				last: Point;
				segmented: boolean;
				segments: Segment[];
				shape: Path;
				tbbox: [Point, Point, Point, Point];

				arcTo(
					rx: number,
					ry: number,
					/* tslint:disable:variable-name */
					x_axis_rotation: number,
					large_arc_flag: number,
					sweep_flag: number,
					/* tslint:enable */
					x: number,
					y: number
				): this;
				closePath(): this;
				curveTo(x1: number, y1: number, x2: number, y2: number, x: number, y: number): this;
				getAbsoluteMode(): boolean;
				getBoundingBox(): SimpleRectangle;
				getLastPosition(): Point;
				hLineTo(x: number): this;
				lineTo(x: number, y: number): this;
				moveTo(x: number, y: number): this;
				qCurveTo(x1: number, y1: number, x: number, y: number): this;
				setAbsoluteMode(mode: boolean | string): void; // TODO: enum
				// setShape(shape: string | dojox.gfx.path.Path): this;
				smoothCurveTo(x2: number, y2: number, x: number, y: number): void;
				vLineTo(y: number): this;
			}

			interface PathConstructor extends dojox.gfx.shape.ShapeConstructor {
				new(): Path;
				prototype: Path;
			}

			interface Segment {
				action: string;
				args: any[];
			}

			interface TextPath extends Path {
				fontStyle: Font;
				text: TextPath;

				getFont(): Font;
				getText(): TextPath;
				setFont(font: string | Font): this;
				setText(text: string | TextPath): this;
			}

			interface TextPathConstructor extends PathConstructor {
				new(): TextPath;
				prototype: TextPath;
			}
		}
	}
}

declare module 'dojox/gfx/path' {
	/* tslint:disable:no-unused-variable */
	type Path = dojox.gfx.path.Path;
	const Path: dojox.gfx.path.PathConstructor;
	type TextPath = dojox.gfx.path.TextPath;
	const TextPath: dojox.gfx.path.TextPathConstructor;
	/* tslint:enable */
}
