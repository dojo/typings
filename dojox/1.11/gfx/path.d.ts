declare namespace dojox {
	namespace gfx {
		namespace path {
			interface Path extends Shape {
				absolute: boolean;
				last: Point;
				segmented: boolean;
				segments: Segment[];
				shape: Path;
				tbbox: [Point, Point, Point, Point];

				arcTo(
					rx: number,
					ry: number,
					x_axis_rotation: number,
					large_arc_flag: number,
					sweep_flag: number,
					x: number,
					y: number
				): this;
				closePath(): this;
				curveTo(x1: number, y1: number, x2: number, y2: number, x: number, y: number): this;
				getAbsoluteMode(): boolean;
				getBoundingBox(): Rectangle;
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

			interface PathModule {
				Path: Path;
				TextPath: TextPath;
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
		}
	}
}

declare module 'dojox/gfx/path' {
	const path: dojox.gfx.path.PathModule;
	export = path;
}
