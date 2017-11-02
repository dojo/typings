/// <reference path="../../../dojo/1.11/modules.d.ts" />

declare module dstore {
	export interface FetchArray<T> extends Array<T> {
		totalLength: number;
	}

	export interface FetchPromise<T> extends dojo.promise.Promise<T> {
		totalLength: dojo.promise.Promise<number>;
	}

	export interface ChangeEvent<T> {
		id: any;
		index?: number;
		previousIndex?: number;
		target: T;
		totalLength: number;
		type: string;
	}

	export interface Collection<T> {
		idProperty: string;
		Model: { new (...args: any[]): T; };
		tracking?: { remove(): void; };

		add(object: T, options?: {}): dojo.promise.Promise<T>;
		emit(eventName: string, event: ChangeEvent<T>): boolean;
		fetch(): dstore.FetchPromise<T[]>;
		fetchRange(kwArgs: { start?: number; end?: number; }): dstore.FetchPromise<T[]>;
		filter(query: string | {} | { (item: T, index: number): boolean; }): this;
		forEach(callback: (item: T, index: number) => void, thisObject?: any): dojo.promise.Promise<T[]>;
		get(id: any): dojo.promise.Promise<T>;
		getIdentity(object: T): any;
		on(eventName: string, listener: (event: ChangeEvent<T>) => void): dojo.Handle;
		put(object: T, options?: {}): dojo.promise.Promise<T>;
		remove(id: any): dojo.promise.Promise<Object>;
		sort(property: string | { (a: T, b: T): number; }, descending?: boolean): this;
		track?(): this;
	}

	export interface SyncCollection<T> extends Collection<T> {
		addSync(object: T, options?: {}): T;
		fetchSync(): dstore.FetchArray<T>;
		fetchRangeSync(kwArgs: { start?: number; end?: number; }): dstore.FetchArray<T>;
		filter(query: string | {} | { (item: T, index: number): boolean; }): this;
		getSync(id: any): T;
		putSync(object: T, options?: {}): T;
		removeSync(id: any): boolean;
		sort(property: string | { (a: T, b: T): number; }, descending?: boolean): this;
		track?(): this;
	}
}

declare module 'dstore/Cache' {
	import Store = require('dstore/Store');

	interface Cache<T> extends Store<T> {
		cachingStore: dstore.Collection<T>;
		evict(id: any): void;
	}

	module Cache {
		export interface Constructor extends dojo._base.DeclareConstructor<Cache<any>> {
			new <T>(kwArgs?: Cache.KwArgs<T>): Cache<T>;
		}

		export interface KwArgs<T> extends Store.KwArgs {
			cachingStore?: dstore.Collection<T>;
		}
	}

	const Cache: Cache.Constructor;

	export = Cache;
}

declare module 'dstore/legacy/DstoreAdapter' {
	import Store = require('dstore/Store');

	interface DstoreAdapter<T> {
		constructor(collection: dstore.Collection<T>): DstoreAdapter<T>;
		get(id: any): any;
		put(object: T, options?: {}): any;
		remove(id: any): any;
		query(query: any, options?: {}): any;
	}

	module DstoreAdapter {
		export interface Constructor extends dojo._base.DeclareConstructor<DstoreAdapter<any>> {
			new <T>(store: Store<T>): DstoreAdapter<Store<T>>;
		}
	}

	const DstoreAdapter: DstoreAdapter.Constructor;
	export = DstoreAdapter;
}

declare module 'dstore/Memory' {
	import Store = require('dstore/Store');

	interface Memory<T> extends Store<T>, dstore.SyncCollection<T> {
		data: T[];

		addSync(object: T, options?: {}): T;
		fetchSync(): dstore.FetchArray<T>;
		fetchRangeSync(kwArgs: { start?: number; end?: number; }): dstore.FetchArray<T>;
		filter(query: string | {} | { (item: T, index: number): boolean; }): this;
		getSync(id: any): T;
		putSync(object: T, options?: {}): T;
		removeSync(id: any): boolean;
		setData(data: T[]): void;
		sort(property: string | { (a: T, b: T): number; }, descending?: boolean): this;
		track(): this;
		remove(id: any): dojo.promise.Promise<{}>;
	}

	module Memory {
		export interface Constructor extends dojo._base.DeclareConstructor<Memory<any>> {
			new <T>(kwArgs?: Memory.KwArgs<T>): Memory<T>;
		}

		export interface KwArgs<T> extends Store.KwArgs {
			data?: T[];
		}
	}

	const Memory: Memory.Constructor;

	export = Memory;
}

declare module 'dstore/Trackable' {
	interface Trackable<T> {
		currentRange: any[];
		track(): this;
	}

	module Trackable {
		export interface Constructor extends dojo._base.DeclareConstructor<Trackable<any>> {
			new <T>(...args: any[]): Trackable<T>;
		}
	}

	const Trackable: Trackable.Constructor;

	export = Trackable;
}

declare module 'dstore/Tree' {
	interface Tree<T> {
		mayHaveChildren(object: T): boolean;
		getRootCollection(): dstore.Collection<T>;
		getChildren(object: T): dstore.Collection<T>;
	}

	module Tree {
		export interface Constructor extends dojo._base.DeclareConstructor<Tree<any>> {
			new <T>(...args: any[]): Tree<T>;
		}
	}

	const Tree: Tree.Constructor;

	export = Tree;
}

declare module 'dstore/Promised' {
	import * as Promise from 'dojo/promise/Promise';

	interface Promised<T> {
		get(id: any): Promise<T>;
		put(object: T, options?: {}): Promise<T>;
		add(object: T, options?: {}): Promise<T>;
		remove(id: any): Promise<boolean>;
		fetch(): dstore.FetchPromise<T>;
		fetchRange(args: { start?: number; end?: number; }): dstore.FetchPromise<T>;
	}

	module Promised {
		export interface Constructor extends dojo._base.DeclareConstructor<Promised<any>> {
			new <T>(...args: any[]): Promised<T>;
		}
	}

	const Promised: Promised.Constructor;

	export = Promised;
}

declare module 'dstore/SimpleQuery' {
	interface SimpleQuery<T> {
	}

	module SimpleQuery {
		export interface Constructor extends dojo._base.DeclareConstructor<SimpleQuery<any>> {
			new <T>(...args: any[]): SimpleQuery<T>;
		}
	}

	const SimpleQuery: SimpleQuery.Constructor;

	export = SimpleQuery;
}

declare module 'dstore/Request' {
	import Store = require('dstore/Store');

	interface Request<T> extends Store<T> {
		headers: {};
		parse: (serializedObject: string) => {};
		target: string;
		ascendingPrefix: string;
		descendingPrefix: string;
		accepts: string;

		track(): this;
	}

	module Request {
		export interface Constructor extends dojo._base.DeclareConstructor<Request<any>> {
			new <T>(kwArgs?: Request.KwArgs): Request<T>;
		}
		export interface KwArgs extends Store.KwArgs {
			headers?: typeof Request.prototype.headers;
			parse?: typeof Request.prototype.parse;
			target?: typeof Request.prototype.target;
			ascendingPrefix?: typeof Request.prototype.ascendingPrefix;
			descendingPrefix?: typeof Request.prototype.descendingPrefix;
			accepts?: typeof Request.prototype.accepts;
		}
	}

	const Request: Request.Constructor;

	export = Request;
}

declare module 'dstore/RequestMemory' {
	import Request = require('dstore/Request');
	import Cache = require('dstore/Cache');

	interface RequestMemory<T> extends Request<T>, Cache<T> {
		cachingStore: dstore.Collection<T>;
		evict(id: any): void;

		track(): this;
	}

	module RequestMemory {
		export interface Constructor extends dojo._base.DeclareConstructor<RequestMemory<any>> {
			new <T>(kwArgs?: RequestMemory.KwArgs<T>): RequestMemory<T>;
		}

		export interface KwArgs<T> extends Request.KwArgs, Cache.KwArgs<T> {}
	}

	const RequestMemory: RequestMemory.Constructor;

	export = RequestMemory;
}

declare module 'dstore/Rest' {
	import Request = require('dstore/Request');

	interface Rest<T> extends Request<T> {}

	module Rest {
		export interface Constructor extends dojo._base.DeclareConstructor<Rest<any>> {
			new <T>(kwArgs?: Request.KwArgs): Rest<T>;
		}
	}

	const Rest: Rest.Constructor;

	export = Rest;
}

declare module 'dstore/Store' {
	interface Store<T> extends dstore.Collection<T> {
		idProperty: string;
		Model: { new (...args: any[]): T; };
		total: dojo.promise.Promise<number>;

		add(object: T, options?: {}): dojo.promise.Promise<T>;
		emit(eventName: string, event: dstore.ChangeEvent<T>): boolean;
		fetch(): dstore.FetchPromise<T[]>;
		fetchRange(kwArgs: { start?: number; end?: number; }): dstore.FetchPromise<T[]>;
		filter(query: string | {} | { (item: T, index: number): boolean; }): this;
		forEach(callback: (item: T, index: number) => void, thisObject?: any): dojo.promise.Promise<T[]>;
		get(id: any): dojo.promise.Promise<T>;
		getIdentity(object: T): any;
		on(eventName: string, listener: (event: dstore.ChangeEvent<T>) => void): dojo.Handle;
		put(object: T, options?: {}): dojo.promise.Promise<T>;
		remove(id: any): dojo.promise.Promise<{}>;
		sort(property: string | { (a: T, b: T): number; }, descending?: boolean): this;
	}

	module Store {
		export interface Constructor extends dojo._base.DeclareConstructor<Store<any>> {
			new <T>(kwArgs?: Store.KwArgs): Store<T>;
		}

		export interface KwArgs {
			idProperty?: typeof Store.prototype.idProperty;
			Model?: typeof Store.prototype.Model;
		}
	}

	const Store: Store.Constructor;

	export = Store;
}
