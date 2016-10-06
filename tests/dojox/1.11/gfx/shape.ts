/// <reference path="../../../../dojox/1.11/modules.d.ts" />

import * as gfx from 'dojox/gfx';
import * as shape from 'dojox/gfx/shape';

let circle: shape.Circle;
circle = new shape.Circle();
circle = shape.Creator.createCircle();

let handle = circle.on('click', function(event: Event) {});
handle.remove();

let context = {};
handle = circle.connect('click', context, 'handler');
circle.disconnect(handle);

shape.Container.add(circle);
shape.Container.remove(circle, true);

let box: gfx.Rectangle;
box = shape.Container.getBoundingBox();

let myFixTarget: dojox.gfx.FixTarget;
myFixTarget = shape.fixCallback(circle, function() {}, context, 'method');
