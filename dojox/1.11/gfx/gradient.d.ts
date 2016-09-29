declare namespace dojox {
	namespace gfx {
		namespace gradient {
			interface GradientModule {
				project(
					matrix: dojox.gfx.matrix.Matrix2D,
					gradient: LinearGradient,
					topLeft: Point,
					bottomRight: Point,
					transformTopLeft: Point,
					transformBottomRight: Point
				): LinearGradient;
				rescale(stops: GradientOffsetColor[], from: number, to: number): GradientOffsetColor[];
			}
		}
	}
}

declare module 'dojox/gfx/gradient' {
	const gradient: dojox.gfx.gradient.GradientModule;
	export = gradient;
}
