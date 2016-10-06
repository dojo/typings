/// <reference path="../../../../dojox/1.11/modules.d.ts" />

// NOTE: keep all tests in here synced with '_base.ts' as they are testing the same functionality
import * as gfx from 'dojox/gfx';

let node: Node;
let surface: gfx.Surface = gfx.createSurface(node, 100, 100);
surface = gfx.createSurface(node, '100px', '100px');

let poly: gfx.Polyline;
poly = gfx.defaultPolyline;

let curve: gfx.QuadraticBezierCurve;
curve = [1, 1, 1, 2, 2, 2];

let result: boolean;
let myEvent: Event;
result = gfx.fixTarget(myEvent, new gfx.Group());
