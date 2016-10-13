/// <reference path="../../../../dojox/1.11/modules.d.ts" />

import * as gfx from 'dojox/gfx';
import { project, rescale } from 'dojox/gfx/gradient';
import * as matrix from 'dojox/gfx/matrix';

let gradient: gfx.LinearGradient;
gradient = project(
	new matrix.Matrix2D(5),
	gfx.defaultLinearGradient,
	{ x: 1, y: 1 },
	{ x: 1, y: 1 },
	{ x: 1, y: 1 },
	{ x: 1, y: 1 }
);

let offsets: gfx.GradientOffsetColor[];
offsets = rescale([
	{ color: 'green', offset: 1 }
], 5, 5);
