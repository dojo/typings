declare namespace dojox {
	namespace gfx {
		namespace matrix {
			interface Matrix {
				flipX: Matrix2D;
				flipY: Matrix2D;
				flipXY: Matrix2D;
				identity: Matrix2D;

				clone(matrix: Matrix2D): Matrix2D;
				invert(matrix: Matrix2D): Matrix2D;
				isIdentity(matrix: Matrix2D): boolean;
				multiply(...matrices: MatrixLike[]): Matrix2D;
				multiplyPoint(matrix: MatrixLike, point: dojox.gfx.Point): dojox.gfx.Point;
				multiplyPoint(matrix: MatrixLike, x: number, y: number): dojox.gfx.Point;
				multiplyRectangle(matrix: MatrixLike, rectangle: dojox.gfx.Rectangle): dojox.gfx.Rectangle;
				normalize(matrix: MatrixLike): Matrix2D;
				project(point: dojox.gfx.Point): Matrix2D;
				project(x: number, y: number): Matrix2D;
				reflect(point: dojox.gfx.Point): Matrix2D;
				reflect(x: number, y: number): Matrix2D;
				rotate(radians: number): Matrix2D;
				rotateAt(radians: number, point: dojox.gfx.Point): Matrix2D;
				rotateAt(radians: number, x: number, y: number): Matrix2D;
				rotateg(degrees: number): Matrix2D;
				rotategAt(degrees: number, point: dojox.gfx.Point): Matrix2D;
				rotategAt(degrees: number, x: number, y: number): Matrix2D;
				scale(x: number, y: number): Matrix2D;
				scale(point: dojox.gfx.Point): Matrix2D;
				scaleAt(factor: dojox.gfx.Point, point: dojox.gfx.Point): Matrix2D;
				scaleAt(factor: number | dojox.gfx.Point, point: dojox.gfx.Point): Matrix2D;
				scaleAt(factor: number | dojox.gfx.Point, x: number, y: number): Matrix2D;
				scaleAt(factorX: number, factorY: number, x: number, y: number): Matrix2D;
				skewX(radians: number): Matrix2D;
				skewXAt(radians: number, point: dojox.gfx.Point): Matrix2D;
				skewXAt(radians: number, x: number, y: number): Matrix2D;
				skewXg(degrees: number): Matrix2D;
				skewXgAt(degrees: number, point: dojox.gfx.Point): Matrix2D;
				skewXgAt(degrees: number, x: number, y: number): Matrix2D;
				skewY(radians: number): Matrix2D;
				skewYAt(radians: number, point: dojox.gfx.Point): Matrix2D;
				skewYAt(radians: number, x: number, y: number): Matrix2D;
				skewYg(degrees: number): Matrix2D;
				skewYgAt(degrees: number, point: dojox.gfx.Point): Matrix2D;
				skewYgAt(degrees: number, x: number, y: number): Matrix2D;
				translate(point: dojox.gfx.Point): Matrix2D;
				translate(x: number, y: number): Matrix2D;

				Matrix2D: Matrix2D;
			}

			type MatrixLike = number | [number, number] | Matrix2D;

			interface Matrix2D {
				dx?: number;
				dy?: number;
				xx?: number;
				xy?: number;
				yx?: number;
				yy?: number;

				new(matrix: MatrixLike): Matrix2D;
			}
		}
	}
}

declare module 'dojox/gfx/matrix' {
	const matrix: dojox.gfx.matrix.Matrix;
	export = matrix;
}
