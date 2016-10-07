/// <reference path="../../../../dojo/1.11/modules.d.ts" />
/// <reference path="../../../../dojox/1.11/modules.d.ts" />

import * as fx from 'dojox/gfx/fx';

let anim: dojo._base.Animation;
anim = fx.animateFill({
	node: 'myNodeId',
	properties: {
		a: 1,
		b: 2
	}
});

