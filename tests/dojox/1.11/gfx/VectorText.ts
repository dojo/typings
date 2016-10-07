/// <reference path="../../../../dojox/1.11/modules.d.ts" />

import * as VectorText from 'dojox/gfx/VectorText';

let text: VectorText;
text = new VectorText('/some/url');
let height: number;
height = text.getLineHeight(1.5);
