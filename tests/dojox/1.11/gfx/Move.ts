/// <reference path="../../../../dojox/1.11/modules.d.ts" />

import * as gfx from 'dojox/gfx';
import * as Moveable from 'dojox/gfx/Moveable';
import * as Mover from 'dojox/gfx/Mover';

let node: Node;
let surface = gfx.createSurface(node, 100, 100);
let rect = surface.createRect();

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
