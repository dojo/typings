/// <reference path="../../../../dojox/1.11/modules.d.ts" />

// NOTE: keep all tests in here synced with '_base.ts' as they are testing the same functionality
import * as gfx from 'dojox/gfx';
import { CubicBezierCurve, defaultCircle, Group } from 'dojox/gfx';
import * as shape from 'dojox/gfx/shape';

let node: Node;
let surface: gfx.Surface = gfx.createSurface(node, 100, 100);
surface = gfx.createSurface(node, '100px', '100px');

let poly: gfx.SimplePolyline;
poly = gfx.defaultPolyline;

let curve1: CubicBezierCurve;
curve1 = [1, 2, 3, 4, 5, 6, 7, 8];

let curve2: gfx.QuadraticBezierCurve;
curve2 = [1, 1, 1, 2, 2, 2];

let group: Group;
group = new Group();
group.add(new shape.Circle(defaultCircle));
group.add(group.createEllipse());

let nodeType: string;
nodeType = Group.nodeType;

let result: boolean;
let myEvent: Event;
result = gfx.fixTarget(myEvent, new gfx.Group());
