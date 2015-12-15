/// <reference path="index.d.ts" />

declare namespace dojo {
	namespace _base {
		interface Declare {
			<A, B, C>(className: string, superClass: [ dojo.GenericConstructor<A>, dojo.GenericConstructor<B> ], props: C): dojo.GenericConstructor<A&B&C>;
			<A, B, C>(superClass: [ dojo.GenericConstructor<A>, dojo.GenericConstructor<B> ], props: C): dojo.GenericConstructor<A&B&C>;
			<A, B>(className: string, superClass: dojo.GenericConstructor<A>, props: B): dojo.GenericConstructor<A&B>;
			<A, B>(superClass: dojo.GenericConstructor<A>, props: B): dojo.GenericConstructor<A&B>;
			<A>(className: string, superClass: dojo.GenericConstructor<any>|dojo.GenericConstructor<any>[], props: any): dojo.GenericConstructor<A>;
			<A>(superClass: dojo.GenericConstructor<any>|dojo.GenericConstructor<any>[], props: any): dojo.GenericConstructor<A>;
			(className: string, superClass: any[], props: any): dojo.GenericConstructor<any>;
			(superClass: any[], props: any): dojo.GenericConstructor<any>;
		}
	}
}