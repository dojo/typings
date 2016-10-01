declare namespace dojox {
	namespace gfx {
		interface Arc {
			c1: Point;
			c2: Point;
			e: Point;
			s: Point;
		}

		interface ArcModule {
			curvePI4: Arc;

			arcAsBezier(
				last: Point,
				rx: number,
				ry: number,
				xRotG: number,
				large: boolean,
				sweep: boolean,
				x: number,
				y: number
			): dojox.gfx.QuadraticBezierCurve;

			unitArcAsBezier(radians: number): Arc;
		}

		interface Gfx extends ArcModule {}
	}
}

declare module 'dojox/gfx/arc' {
	const arc: dojox.gfx.ArcModule;
	export = arc;
}
