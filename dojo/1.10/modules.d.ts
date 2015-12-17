/// <reference path="index.d.ts" />

declare module 'dojo/_base/array' {
	const dojoArray: dojo._base.Array;
	export = dojoArray;
}

declare module 'dojo/_base/Color' {
	const Color: dojo._base.Color;
	export = Color;
}

declare module 'dojo/_base/config' {
	const config: dojo._base.Config;
	export = config;
}

declare module 'dojo/_base/connect' {
	const connect: dojo._base.Connect;
	export = connect;
}

declare module 'dojo/_base/declare' {
	const dojoDeclare: dojo._base.Declare;
	export = dojoDeclare;
}

declare module 'dojo/Deferred' {
	const Deferred: {
		new <T>(): dojo.Deferred<T>;
		<T>(): dojo.Deferred<T>;
	};
	export = Deferred;
}

declare module 'dojo/on' {
	const on: dojo.On;
	export = on;
}

declare module 'dojo/topic' {
	const hub: dojo.Topic;
	export = hub;
}

declare module 'dojo/touch' {
	const touch: dojo.Touch;
	export = touch;
}
