/// <reference path="../../../../dojox/1.11/modules.d.ts" />

import * as gfx from 'dojox/gfx';
import * as bezierutils from 'dojox/gfx/bezierutils';

let num: number;
num = bezierutils.computeLength([1, 1, 1]);

let cubicCurves: gfx.CubicBezierCurve[];
cubicCurves = bezierutils.splitBezierAtT([1, 1, 2, 2, 3, 3, 4, 4], 5);

let quadraticCurves: gfx.QuadraticBezierCurve[];
quadraticCurves = bezierutils.splitQBezierAtT([1, 1, 2, 2, 3, 3], 5);
