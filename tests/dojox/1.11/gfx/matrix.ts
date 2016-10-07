/// <reference path="../../../../dojox/1.11/modules.d.ts" />

import * as gfx from 'dojox/gfx';
import * as matrix from 'dojox/gfx/matrix';
import { Matrix2D, MatrixLike } from 'dojox/gfx/matrix';

let matrix1: matrix.Matrix2D;
matrix1 = new matrix.Matrix2D([5, 5]);

let matrix2: Matrix2D;
matrix2 = new Matrix2D(5);

let matrix3: Matrix2D;
matrix3 = {
	dx: 5,
	yy: 5
};

let x: number;
x = matrix1.dx;

let typeTest: matrix.MatrixLike;
typeTest = [5, 5];

let typeTest2: MatrixLike;
typeTest2 = 5;

let flipX: Matrix2D;
flipX = matrix.flipX;

let clone: Matrix2D;
clone = matrix.clone(matrix1);

let point: gfx.Point;
point = matrix.multiplyPoint(5, {x: 1, y: 1});
x = point.x;

point = matrix.multiplyPoint(5, 1, 1);
