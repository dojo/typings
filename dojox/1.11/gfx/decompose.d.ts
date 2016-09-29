declare namespace dojox {
	namespace gfx {
		interface Decompose {
			(matrix: dojox.gfx.matrix.MatrixLike): MatrixDescriptor;
		}

		interface MatrixDescriptor {
			dx: number;
			dy: number;
			sx: number;
			sy: number;
			angle1: number;
			angle2: number;
		}
	}
}

declare module 'dojox/gfx/decompose' {
	const decompose: dojox.gfx.Decompose;
	export = decompose;
}
