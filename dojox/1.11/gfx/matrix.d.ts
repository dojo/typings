declare namespace dojox {
	namespace gfx {
		namespace matrix {
			interface Matrix2D {
				dx?: number;
				dy?: number;
				xx?: number;
				xy?: number;
				yx?: number;
				yy?: number;

				new(x: number): this;
			}

			type MatrixLike = number | [number, number] | Matrix2D;
		}
	}
}

declare module 'dojox/gfx/matrix' {
	type Matrix2D = dojox.gfx.matrix.Matrix2D;
	const Matrix2D: dojox.gfx.matrix.Matrix2D;
	const flipX: dojox.gfx.matrix.Matrix2D;
	const clone: (matrix: dojox.gfx.matrix.Matrix2D) => dojox.gfx.matrix.Matrix2D;
	const invert: (matrix: Matrix2D) => Matrix2D;
}
