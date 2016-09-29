/// <reference path="../../../../dojox/1.11/modules.d.ts" />

import { createSurface } from 'dojox/gfx';
import { Shape, Surface } from 'dojox/gfx/shape';
import * as utils from 'dojox/gfx/utils';

let node: Node;
let parent: Shape;
let shape: Shape;
let shapeDescriptor: dojox.gfx.utils.ShapeDescriptor;
let shapeDescriptors: dojox.gfx.utils.ShapeDescriptor[];
let surface: Surface;

shape = utils.deserialize(parent, shapeDescriptor);

surface = createSurface(node, 100, 100);
shapeDescriptors = utils.serialize(surface);
