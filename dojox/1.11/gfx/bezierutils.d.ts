declare namespace dojox {
	namespace gfx {
		interface BezierUtils {
			computeLength(points: number[]): number;
			distance(x1: number, y1: number, x2: number, y2: number): number;
			splitBezierAtT(points: dojox.gfx.CubicBezierCurve, t: number): [
				dojox.gfx.CubicBezierCurve,
				dojox.gfx.CubicBezierCurve
			];
			splitBezierAtT(points: dojox.gfx.QuadraticBezierCurve, t: number): [
				dojox.gfx.QuadraticBezierCurve,
				dojox.gfx.QuadraticBezierCurve
			];
			splitCBezierAtT(points: dojox.gfx.CubicBezierCurve, t: number): [
				dojox.gfx.CubicBezierCurve,
				dojox.gfx.CubicBezierCurve
			];
			splitQBezierAtT(points: dojox.gfx.QuadraticBezierCurve, t: number): [
				dojox.gfx.QuadraticBezierCurve,
				dojox.gfx.QuadraticBezierCurve
			];
			tAtLength(points: number[], length: number): number;
		}
	}
}

declare module 'dojox/gfx/bezierutils' {
	const bezierutils: dojox.gfx.BezierUtils;
	export = bezierutils;
}
