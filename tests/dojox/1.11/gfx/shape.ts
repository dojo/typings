/// <reference path="../../../../dojox/1.11/modules.d.ts" />

import * as gfx from 'dojox/gfx';
import * as shape from 'dojox/gfx/shape';
import { Clip, Circle, Surface } from 'dojox/gfx/shape';
import SimpleCircle = dojox.gfx.SimpleCircle;

let node: Node;
let surface: Surface;
surface = gfx.createSurface(node, 100, 100);

let circle: shape.Circle;
circle = new shape.Circle();
const options: SimpleCircle = {
	cx: 1,
	cy: 1,
	r: 10
};
circle = shape.Creator.createCircle(options);
circle = surface.createCircle(options);

let clip: Clip;
circle.setClip(clip);

let handle = circle.on('click', function(event: Event) {});
handle.remove();

let context = {};
handle = circle.connect('click', context, 'handler');
circle.disconnect(handle);

shape.Container.add(circle);
shape.Container.remove(circle, true);

// TODO: should these work?
// let anyShape: shape.Shape;
// anyShape = <Circle> circle;
// anyShape.shape.cx;

let box: gfx.SimpleRectangle;
box = shape.Container.getBoundingBox();

let myFixTarget: dojox.gfx.FixTarget;
myFixTarget = shape.fixCallback(circle, function() {}, context, 'method');
