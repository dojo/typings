/// <reference path="../../../../dojox/1.11/modules.d.ts" />

import * as matrix from 'dojox/gfx/matrix';
import { Matrix2D } from 'dojox/gfx/matrix';

let matrix1: matrix.Matrix2D;
matrix1 = new matrix.Matrix2D(5);

let matrix2: Matrix2D;
matrix2 = new Matrix2D(5);

let flipX: Matrix2D;
flipX = matrix.flipX;

let clone: Matrix2D;
clone = matrix.clone(matrix1);
