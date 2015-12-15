/// <reference path="index.d.ts" />

declare module 'dojo/_base/declare' {
	let dojoDeclare: dojo._base.Declare;
	export = dojoDeclare;
}

declare module 'dojo/touch' {
	let touch: dojo.Touch;
	export = touch;
}