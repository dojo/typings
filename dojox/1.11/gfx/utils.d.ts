declare namespace dojox {
	namespace gfx {
		namespace utils {
			interface ShapeDescriptor {
				children: Shape[];
				fill: Fill;
				font: Font;
				shape: Shape;
				stroke: Stroke;
				transform: dojox.gfx.matrix.Matrix2D;
			}

			interface Utils {
				forEach(shape: Shape | Surface, callback: Function, context?: Object): void;
				deserialize(parent: Shape | Surface, shape: ShapeDescriptor | ShapeDescriptor[]): Shape | Shape[];
				fromJson(parent: Shape | Surface, shape: string): Shape | Shape[];
				serialize(shape: Shape | Surface): ShapeDescriptor | ShapeDescriptor[];
				toJson(shape: Shape | Surface): string;
				toSvg(surface: Surface): dojo.Deferred<string>;
			}
		}
	}
}

declare module 'dojox/gfx/utils' {
	const utils: dojox.gfx.utils.Utils;
	export = utils;
}
