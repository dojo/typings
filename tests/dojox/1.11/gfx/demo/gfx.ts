/// <reference path="../../../../../dojo/1.11/modules.d.ts" />
/// <reference path="../../../../../dojox/1.11/modules.d.ts" />

import * as gfx from 'dojox/gfx';

let rectOptions = {
	x: 0,
	y: 0,
	height: 100,
	width: 100
};

let node = document.createElement('div');
document.body.appendChild(node);

let surface = gfx.createSurface(node, 300, 300);
let rect = surface.createRect(rectOptions);
rect.setFill([255, 0, 0, 0.5]);
rect.setStroke({
	color: 'blue',
	join: 'round',
	width: 10
});
rect.setTransform({
	dx: 100,
	dy: 100
});
rect.on('click', function() {
	console.log('clicked red');
});
