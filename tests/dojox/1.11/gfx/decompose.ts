/// <reference path="../../../../dojox/1.11/modules.d.ts" />

import * as decompose from 'dojox/gfx/decompose';
import { MatrixLike } from 'dojox/gfx/matrix';

let matrix: MatrixLike;
matrix = 5;

let descriptor: dojox.gfx.MatrixDescriptor;
descriptor = decompose(matrix);

let x: number;
x = descriptor.dx;
