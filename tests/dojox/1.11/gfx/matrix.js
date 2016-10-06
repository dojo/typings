/// <reference path="../../../../dojox/1.11/modules.d.ts" />
define(["require", "exports", 'dojox/gfx/matrix', 'dojox/gfx/matrix'], function (require, exports, matrix, matrix_1) {
    "use strict";
    var matrix1;
    matrix1 = new matrix.Matrix2D([5, 5]);
    var matrix2;
    matrix2 = new matrix_1.Matrix2D(5);
    var x;
    x = matrix1.dx;
    var typeTest;
    typeTest = [5, 5];
    var typeTest2;
    typeTest2 = 5;
    var flipX;
    flipX = matrix.flipX;
    var clone;
    clone = matrix.clone(matrix1);
    //let point: gfx.Point;
    var point = matrix.multiplyPoint(5, { x: 1, y: 1 });
    x = point.x;
    point = matrix.multiplyPoint(5, 1, 1);
});
