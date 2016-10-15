/// <reference path="../../../../dojox/1.11/modules.d.ts" />

import * as gfx from 'dojox/gfx';
import * as Moveable from 'dojox/gfx/Moveable';
import * as Mover from 'dojox/gfx/Mover';
import SimpleRectangle = dojox.gfx.SimpleRectangle;

let node: Node;
let surface = gfx.createSurface(node, 100, 100);
const options: SimpleRectangle = {
	height: 100,
	width: 100,
	x: 0,
	y: 0
};
let rect = surface.createRect(options);

let mover: Mover;
mover = new Mover();

let moveableRect: Moveable;
moveableRect = new Moveable(rect, {
	delay: 5,
	mover: mover
});

moveableRect.onMoveStart = function(mover: Mover) {
	mover.destroy();
};
