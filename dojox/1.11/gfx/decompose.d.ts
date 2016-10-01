declare namespace dojox {
	namespace gfx {
		interface Decompose {
			(matrix: dojox.gfx.matrix.MatrixLike): {
				dx: number,
				dy: number,
				sx: number,
				sy: number,
				angle1: number,
				angle2: number
			};
		}

		interface Gfx {
			decompose: Decompose;
		}
	}
}

declare module 'dojox/gfx/decompose' {
	const decompose: dojox.gfx.Decompose;
	export = decompose;
}
