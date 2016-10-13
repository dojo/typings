/// <reference path="../../../../dojox/1.11/modules.d.ts" />

import * as filters from 'dojox/gfx/filters';

let filter: dojox.gfx.filters.Filter;
filter = filters.blurs.blur1();

let filterPrimitive = filters.feBlend({
	in: 'in',
	in2: 'in2',
	mode: 'mode'
});

let x: string;
x = filterPrimitive.x;
