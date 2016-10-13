declare namespace dojox {
	namespace gfx {
		namespace arc {
			interface Arc {
				c1: Point;
				c2: Point;
				e: Point;
				s: Point;
			}
		}
	}
}

declare module 'dojox/gfx/arc' {
	type Arc = dojox.gfx.arc.Arc;

	/* tslint:disable:no-unused-variable */
	const curvePI4: Arc;

	const arcAsBezier: (
		last: dojox.gfx.Point,
		rx: number,
		ry: number,
		xRotG: number,
		large: boolean,
		sweep: boolean,
		x: number,
		y: number
	) => dojox.gfx.QuadraticBezierCurve;
	const unitArcAsBezier: (radians: number) => Arc;
	/* tslint:enable */
}
