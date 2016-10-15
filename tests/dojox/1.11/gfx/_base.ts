/// <reference path="../../../../dojox/1.11/modules.d.ts" />

// NOTE: keep all tests in here synced with 'gfx.ts' as they are testing the same functionality
import * as gfx from 'dojox/gfx/_base';
import { CubicBezierCurve, defaultCircle, Group } from 'dojox/gfx/_base';
import * as shape from 'dojox/gfx/shape';
import SimpleEllipse = dojox.gfx.SimpleEllipse;

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
const options: SimpleEllipse = {
	cx: 1,
	cy: 1,
	rx: 10,
	ry: 10
};
group.add(group.createEllipse(options));

let nodeType: string;
nodeType = Group.nodeType;

let result: boolean;
let myEvent: Event;
result = gfx.fixTarget(myEvent, new gfx.Group());
