/// <reference path="../../../../dojo/1.11/modules.d.ts" />
/// <reference path="../../../../dojox/1.11/modules.d.ts" />

import { Fill, Point } from 'dojox/gfx';
import * as gradutils from 'dojox/gfx/gradutils';

let fill: Fill;
let point: Point;
let color: dojo._base.Color;

color = gradutils.getColor(fill, point);
