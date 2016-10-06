declare namespace dojox {
	namespace gfx {
		namespace shape {
			type Clip = EllipseClip | PathClip | PolylineClip | RectangleClip;

			type EllipseClip = {
				cx: number;
				cy: number;
				rx: number;
				ry: number;
			}

			type PathClip = {
				d: string;
			}

			type PolylineClip = {
				points: Point[];
			}

			type RectangleClip = {
				height: number;
				width: number;
				x: number;
				y: number;
			}

			interface Container {
				add(shape: Shape): this;
				clear(destroy?: boolean): this;
				closeBatch(): this;
				getBoundingBox(): Rectangle;
				openBatch(): this;
				remove(shape: Shape, silently?: boolean): this;
			}

			interface Creator {
				createCircle(): Circle;
				createEllipse(): Ellipse;
				createGroup(): Group;
				createImage(): Image;
				createLine(): Line;
				createObject(constructor: ShapeConstructor, simpleShape?: SimpleShape): Shape;
				createPath(): Path;
				createPolyLine(): PolyLine;
				createRect(): Rect;
				createShape(shape: Shape | dojox.gfx.SimpleShape): Shape;
				createText(): Text;
				createTextPath(): TextPath;
			}

			interface EventsProcessing {
				connect(event: string, listener: dojo.EventListener): dojo.Handle;
				connect(event: string, context: Object, listener: string | dojo.EventListener): dojo.Handle;
				disconnect(handle: dojo.Handle): void;
				on(event: string, listener: dojo.EventListener): dojo.Handle;
			}

			interface Circle extends Shape {}
			interface CircleConstructor extends ShapeConstructor {
				prototype: Circle;
			}
			interface Ellipse extends Shape {}
			interface EllipseConstructor extends ShapeConstructor {
				prototype: Ellipse;
			}
			interface Image extends Shape {}
			interface ImageConstructor extends ShapeConstructor {
				prototype: Image;
			}
			interface Line extends Shape {}
			interface LineConstructor extends ShapeConstructor {
				prototype: Line;
			}
			interface Path extends Shape {}
			interface PathConstructor extends ShapeConstructor {
				prototype: Path;
			}
			interface PolyLine extends Shape {}
			interface PolyLineConstructor extends ShapeConstructor {
				prototype: PolyLine;
			}
			interface Rect extends Shape {}
			interface RectConstructor extends ShapeConstructor {
				prototype: Rect;
			}
			interface Text extends Shape {}
			interface TextConstructor extends ShapeConstructor {
				prototype: Text;
			}

			interface Shape extends EventsProcessing {
				bbox: Rectangle;
				fillStyle: dojox.gfx.Fill;
				matrix: dojox.gfx.matrix.Matrix2D;
				parent: Surface;
				parentMatrix: dojox.gfx.matrix.Matrix2D;
				rawNode: Node;
				shape: dojox.gfx.SimpleShape;
				strokeStyle: Stroke;
				type: string; // TODO: enum

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
				getShape(): dojox.gfx.SimpleShape;
				getStroke(): Stroke;
				getTransform(): dojox.gfx.matrix.Matrix2D;
				getTransformedBoundingBox(): [number, number, number, number];
				getUid(): number;
				moveToBack(): this;
				moveToFront(): this;
				removeShape(silently?: boolean): this;
				setClip(clip: dojox.gfx.shape.Clip): void;
				setFill(fill: dojox.gfx.Fill): this;
				setShape(shape: dojox.gfx.SimpleShape): this;
				// for Path
				setShape(shape: string | dojox.gfx.path.Path): this;
				// for Polyline
				setShape(points: Point[] | { points: Point[] }, closed?: boolean): this;
				setStroke(stroke: Stroke): this;
				setTransform(matrix: dojox.gfx.matrix.Matrix2D): this;
			}

			interface ShapeConstructor extends dojo._base.DeclareConstructor<Shape> {
				new(rawNode?: Node): Shape;
				prototype: Shape;
			}

			interface Surface extends EventsProcessing {
				isLoaded: boolean;
				rawNode: Node;

				destroy(): void;
				getEventSource(): Node;
				onLoad(surface: Surface): void;
				whenLoaded(callback: SurfaceCallback): void;
				whenLoaded(context: Object, callback: string | SurfaceCallback): void;
			}

			interface SurfaceCallback {
				(surface: Surface): any;
			}

			interface SurfaceConstructor extends dojo._base.DeclareConstructor<Surface> {
				new (): this;
				prototype: Surface;
			}
		}
	}
}

declare module 'dojox/gfx/shape' {
	type Circle = dojox.gfx.shape.Circle;
	const Circle: dojox.gfx.shape.CircleConstructor;
	type Clip = dojox.gfx.shape.Clip;
	const Container: dojox.gfx.shape.Container;
	const Creator: dojox.gfx.shape.Creator;
	type Ellipse = dojox.gfx.shape.Ellipse;
	const Ellipse: dojox.gfx.shape.EllipseConstructor;
	type EllipseClip = dojox.gfx.shape.EllipseClip;
	type Image = dojox.gfx.shape.Image;
	const Image: dojox.gfx.shape.ImageConstructor;
	type Line = dojox.gfx.shape.Line;
	const Line: dojox.gfx.shape.LineConstructor;
	type Path = dojox.gfx.shape.Path;
	const Path: dojox.gfx.shape.PathConstructor;
	type PathClip = dojox.gfx.shape.PathClip;
	type PolyLine = dojox.gfx.shape.PolyLine;
	const PolyLine: dojox.gfx.shape.PolyLineConstructor;
	type PolyLineClip = dojox.gfx.shape.PolylineClip;
	type Rect = dojox.gfx.shape.Rect;
	const Rect: dojox.gfx.shape.RectConstructor;
	type RectangleClip = dojox.gfx.shape.RectangleClip;
	type Shape = dojox.gfx.shape.Shape;
	const Shape: dojox.gfx.shape.ShapeConstructor;
	type Surface = dojox.gfx.shape.Surface;
	const Surface: dojox.gfx.shape.SurfaceConstructor;
	type Text = dojox.gfx.shape.Text;
	const Text: dojox.gfx.shape.TextConstructor;

	const fixCallback: (
		element: dojox.gfx.GfxElement,
		fixFunction: Function,
		scope: Object,
		method: string | Function
	) => dojox.gfx.FixTarget;
}
