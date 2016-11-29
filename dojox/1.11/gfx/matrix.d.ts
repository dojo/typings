declare namespace dojox {
	namespace gfx {
		namespace matrix {
			type MatrixLike = number | [number, number] | Matrix2D;

			interface Matrix2D {
				dx?: number;
				dy?: number;
				xx?: number;
				xy?: number;
				yx?: number;
				yy?: number;
			}

			interface Matrix2DConstructor {
				new(matrix: MatrixLike): Matrix2D;
				prototype: Matrix2D;
			}

			// TS does not allow overloaded method signatures within the module declaration,
			// so we need to define the interfaces here
			interface MultiplyPoint {
				(matrix: MatrixLike, point: dojox.gfx.Point): dojox.gfx.Point;
				(matrix: MatrixLike, x: number, y: number): dojox.gfx.Point;
			}

			interface Project {
				(point: dojox.gfx.Point): Matrix2D;
				(x: number, y: number): Matrix2D;
			}

			interface Reflect {
				(point: dojox.gfx.Point): Matrix2D;
				(x: number, y: number): Matrix2D;
			}

			interface RotateAt {
				(radians: number, point: dojox.gfx.Point): Matrix2D;
				(radians: number, x: number, y: number): Matrix2D;
			}

			interface RotategAt {
				(degrees: number, point: dojox.gfx.Point): Matrix2D;
				(degrees: number, x: number, y: number): Matrix2D;
			}

			interface Scale {
				(x: number, y: number): Matrix2D;
				(point: dojox.gfx.Point): Matrix2D;
			}

			interface ScaleAt {
				(factor: number | dojox.gfx.Point, point: dojox.gfx.Point): Matrix2D;
				(factor: number | dojox.gfx.Point, x: number, y: number): Matrix2D;
				(factorX: number, factorY: number, point: dojox.gfx.Point): Matrix2D;
				(factorX: number, factorY: number, x: number, y: number): Matrix2D;
			}

			interface SkewXAt {
				(radians: number, point: dojox.gfx.Point): Matrix2D;
				(radians: number, x: number, y: number): Matrix2D;
			}

			interface SkewXgAt {
				(degrees: number, point: dojox.gfx.Point): Matrix2D;
				(degrees: number, x: number, y: number): Matrix2D;
			}

			interface SkewYAt {
				(radians: number, point: dojox.gfx.Point): Matrix2D;
				(radians: number, x: number, y: number): Matrix2D;
			}

			interface SkewYgAt {
				(degrees: number, point: dojox.gfx.Point): Matrix2D;
				(degrees: number, x: number, y: number): Matrix2D;
			}

			interface Translate {
				(point: dojox.gfx.Point): Matrix2D;
				(x: number, y: number): Matrix2D;
			}
		}
	}
}

declare module 'dojox/gfx/matrix' {
	/* tslint:disable:no-unused-variable */
	type MatrixLike = dojox.gfx.matrix.MatrixLike;
	type Matrix2D = dojox.gfx.matrix.Matrix2D;
	const Matrix2D: dojox.gfx.matrix.Matrix2DConstructor;

	const flipX: Matrix2D;
	const flipY: Matrix2D;
	const flipXY: Matrix2D;
	const identity: Matrix2D;

	const clone: (matrix: Matrix2D) => Matrix2D;
	const invert: (matrix: Matrix2D) => Matrix2D;
	const isIdentity: (matrix: Matrix2D) => boolean;
	const multiply: (...matrices: MatrixLike[]) => Matrix2D;
	const multiplyPoint: dojox.gfx.matrix.MultiplyPoint;
	const multiplyRectangle: (matrix: MatrixLike, rectangle: dojox.gfx.SimpleRectangle) => dojox.gfx.SimpleRectangle;
	const normalize: (matrix: MatrixLike) => Matrix2D;
	const project: dojox.gfx.matrix.Project;
	const reflect: dojox.gfx.matrix.Reflect;
	const rotate: (radians: number) => Matrix2D;
	const rotateAt: dojox.gfx.matrix.RotateAt;
	const rotateg: (degrees: number) => Matrix2D;
	const rotategAt: dojox.gfx.matrix.RotategAt;
	const scale: dojox.gfx.matrix.Scale;
	const scaleAt: dojox.gfx.matrix.ScaleAt;
	const skewX: (radians: number) => Matrix2D;
	const skewXAt: dojox.gfx.matrix.SkewXAt;
	const skewXg: (degrees: number) => Matrix2D;
	const skewXgAt: dojox.gfx.matrix.SkewXgAt;
	const skewY: (radians: number) => Matrix2D;
	const skewYAt: dojox.gfx.matrix.SkewYAt;
	const skewYg: (degrees: number) => Matrix2D;
	const skewYgAt: dojox.gfx.matrix.SkewYgAt;
	const translate: dojox.gfx.matrix.Translate;
	/* tslint:enable */
}
