/// <reference path="../../../../dojox/1.11/modules.d.ts" />

import * as gfx from 'dojox/gfx';

let node: Node;
let surface: dojox.gfx.Surface = gfx.createSurface(node, 100, 100);
surface = gfx.createSurface(node, '100px', '100px');
