/// <reference path="../../../../dojox/1.11/modules.d.ts" />

import * as registry from 'dojox/gfx/registry';
import { Shape } from 'dojox/gfx/shape';

let shape: Shape;
shape = new Shape();

let id: string;
id = registry.register(shape);

shape = registry.byId(id);
registry.dispose(shape, true);
