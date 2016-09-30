declare namespace dojox {
	namespace gfx {
		namespace shape {
			type Clip = EllipseClip | PathClip | PolylineClip | RectangleClip;

			interface Container {
				add(shape: Shape): this;
				clear(destroy?: boolean): this;
				closeBatch(): this;
				getBoundingBox(): Rectangle;
				openBatch(): this;
				remove(shape: Shape, silently?: boolean): this;
			}

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

			// TODO: is this the best way to expose the same interface in multiple namespaces?
			interface Shape extends dojox.gfx.Shape {}
			// TODO: is this the best way to expose the same interface in multiple namespaces?
			interface Surface extends dojox.gfx.Surface {}

			// TODO: is this the best way to do this?
			interface ShapeModule {
				fixCallback(element: GfxElement, fixFunction: Function, scope: Object, method: string | Function): fixTarget;
			}
		}
	}
}

declare module 'dojox/gfx/shape' {
	const shape: dojox.gfx.shape.ShapeModule;
	export = shape;
}
