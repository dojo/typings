declare namespace dojox {
	namespace gfx {
		namespace utils {
			interface ShapeDescriptor {
				children: dojox.gfx.shape.Shape[];
				fill: dojox.gfx.Fill;
				font: dojox.gfx.Font;
				shape: dojox.gfx.shape.Shape;
				stroke: dojox.gfx.Stroke;
				transform: dojox.gfx.matrix.Matrix2D;
			}

			interface Utils {
				forEach(
					shape: dojox.gfx.shape.Shape | dojox.gfx.shape.Surface,
					callback: Function, context?: Object
				): void;
				deserialize(
					parent: dojox.gfx.shape.Shape | dojox.gfx.shape.Surface,
					shape: ShapeDescriptor
				): dojox.gfx.shape.Shape;
				deserialize(
					parent: dojox.gfx.shape.Shape | dojox.gfx.shape.Surface,
					shape: ShapeDescriptor[]
				): dojox.gfx.shape.Shape[];
				fromJson(
					parent: dojox.gfx.shape.Shape | dojox.gfx.shape.Surface,
					shape: string
				): dojox.gfx.shape.Shape | dojox.gfx.shape.Shape[];
				serialize(shape: dojox.gfx.shape.Shape): ShapeDescriptor;
				serialize(shape: dojox.gfx.shape.Surface): ShapeDescriptor[];
				toJson(shape: dojox.gfx.shape.Shape | dojox.gfx.shape.Surface): string;
				toSvg(surface: dojox.gfx.shape.Surface): dojo.Deferred<string>;
			}
		}
	}
}

declare module 'dojox/gfx/utils' {
	const utils: dojox.gfx.utils.Utils;
	export = utils;
}
