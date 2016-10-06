/// <reference path="../../../../dojox/1.11/modules.d.ts" />

import * as gfx from 'dojox/gfx';
import * as arc from 'dojox/gfx/arc';

let arc1: arc.Arc;
arc1 = arc.curvePI4;
arc1 = arc.unitArcAsBezier(5);

let curve: gfx.QuadraticBezierCurve;
curve = arc.arcAsBezier({x: 1, y: 1}, 1, 1, 5, false, false, 1, 1);
