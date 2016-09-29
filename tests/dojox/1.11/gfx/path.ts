/// <reference path="../../../../dojox/1.11/modules.d.ts" />

import { Path, TextPath } from 'dojox/gfx/path';

let path: Path;
path = new Path();
path.moveToFront();
path.moveTo(1, 1).closePath();

let textPath: TextPath;
textPath = new TextPath();
textPath.moveToBack();
textPath.curveTo(1, 1, 2, 2, 3, 3).destroy();
