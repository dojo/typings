/// <reference path="index.d.ts" />

declare module 'dojo/_base/array' {
	const dojoArray: dojo._base.Array;
	export = dojoArray;
}

declare module 'dojo/_base/Color' {
	const Color: dojo._base.ColorConstructor;
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

declare module 'dojo/_base/Deferred' {
	const Deferred: dojo._base.DeferredConstructor;
	export = Deferred;
}

declare module 'dojo/_base/event' {
	const event: dojo._base.EventModule;
	export = event;
}

declare module 'dojo/_base/fx' {
	const fx: dojo._base.Fx;
	export = fx;
}

declare module 'dojo/_base/html' {
	const dojo: dojo._base.Dojo;
	export = dojo;
}

/* TODO: dojo/_base/json */

declare module 'dojo/_base/kernel' {
	const dojo: dojo._base.Dojo;
	export = dojo;
}

declare module 'dojo/_base/lang' {
	const lang: dojo._base.Lang;
	export = lang;
}

declare module 'dojo/_base/loader' {
	const loader: dojo._base.Loader;
	export = loader;
}

/* TODO: dojo/_base/NodeList */

/* TODO: dojo/_base/query */

declare module 'dojo/_base/sniff' {
	const has: dojo.Has;
	export = has;
}

declare module 'dojo/_base/unload' {
	const unload: dojo._base.Unload;
	export = unload;
}

declare module 'dojo/_base/url' {
	const url: dojo._base.Url;
	export = url;
}

declare module 'dojo/_base/window' {
	const window: dojo._base.Window;
	export = window;
}

declare module 'dojo/_base/xhr' {
	const xhr: dojo._base.Xhr;
	export = xhr;
}

declare module 'dojo/AdapterRegistry' {
	const AdapterRegistry: dojo.AdapterRegistryConstructor;
	export = AdapterRegistry;
}

declare module 'dojo/aspect' {
	const aspect: dojo.Aspect;
	export = aspect;
}

declare module 'dojo/back' {
	const back: dojo.Back;
	export = back;
}

declare module 'dojo/behavior' {
	const behavior: dojo.Behavior;
	export = behavior;
}

declare module 'dojo/cache' {
	const cache: dojo.Cache;
	export = cache;
}

declare module 'dojo/cldr/monetary' {
	const monetary: dojo.cldr.Monetary;
	export = monetary;
}

declare module 'dojo/cldr/supplemental' {
	const supplemental: dojo.cldr.Supplemental;
	export = supplemental;
}

declare module 'dojo/colors' {
	const Color: dojo._base.ColorConstructor;
	export = Color;
}

declare module 'dojo/cookie' {
	const cookie: dojo.Cookie;
	export = cookie;
}

declare module 'dojo/currency' {
	const currency: dojo.Currency;
	export = currency;
}

declare module 'dojo/data/api/Identity' {
	const Identity: dojo.data.api.IdentityConstructor;
	export = Identity;
}

declare module 'dojo/data/api/Item' {
	const Item: dojo.data.api.ItemConstructor;
	export = Item;
}

declare module 'dojo/data/api/Notification' {
	const Notification: dojo.data.api.NotificationConstructor;
	export = Notification;
}

declare module 'dojo/data/api/Read' {
	const Read: dojo.data.api.ReadConstructor;
	export = Read;
}

declare module 'dojo/data/api/Request' {
	const Request: dojo.data.api.RequestConstructor;
	export = Request;
}

declare module 'dojo/data/api/Write' {
	const Write: dojo.data.api.WriteConstructor;
	export = Write;
}

declare module 'dojo/data/util/filter' {
	const filter: dojo.data.util.Filter;
	export = filter;
}

declare module 'dojo/data/util/simpleFetch' {
	const simpleFetch: dojo.data.util.SimpleFetch;
	export = simpleFetch;
}

declare module 'dojo/data/util/sorter' {
	const sorter: dojo.data.util.Sorter;
	export = sorter;
}

declare module 'dojo/data/ItemFileReadStore' {
	const ItemFileReadStore: dojo.data.ItemFileReadStoreConstructor;
	export = ItemFileReadStore;
}

declare module 'dojo/data/ItemFileWriteStore' {
	const ItemFileWriteStore: dojo.data.ItemFileWriteStoreConstructor;
	export = ItemFileWriteStore;
}

declare module 'dojo/data/ObjectStore' {
	const ObjectStore: dojo.data.ObjectStoreConstructor;
	export = ObjectStore;
}

declare module 'dojo/date' {
	const date: dojo.date.Date;
	export = date;
}

declare module 'dojo/date/locale' {
	const dateLocale: dojo.date.DateLocale;
	export = dateLocale;
}

declare module 'dojo/date/stamp' {
	const stamp: dojo.date.Stamp;
	export = stamp;
}

declare module 'dojo/debounce' {
	const debounce: dojo.Debounce;
	export = debounce;
}

declare module 'dojo/Deferred' {
	const Deferred: dojo.DeferredConstructor;
	export = Deferred;
}

declare module 'dojo/DeferredList' {
	const DeferredList: dojo.DeferredListConstructor;
	export = DeferredList;
}

declare module 'dojo/dnd/autoscroll' {
	const autoscroll: dojo.dnd.AutoScroll;
	export = autoscroll;
}

declare module 'dojo/dnd/AutoSource' {
	const AutoSource: dojo.dnd.AutoSourceConstructor;
	export = AutoSource;
}

declare module 'dojo/dnd/Avatar' {
	const Avatar: dojo.dnd.AvatarConstructor;
	export = Avatar;
}

declare module 'dojo/dnd/common' {
	const common: dojo.dnd.Common;
	export = common;
}

declare module 'dojo/dnd/Container' {
	const Container: dojo.dnd.ContainerConstructor;
	export = Container;
}

declare module 'dojo/dnd/Manager' {
	const Manager: dojo.dnd.ManagerConstructor;
	export = Manager;
}

declare module 'dojo/dnd/Moveable' {
	const Moveable: dojo.dnd.Moveable;
	export = Moveable;
}

declare module 'dojo/dnd/Mover' {
	const Mover: dojo.dnd.MoverConstructor;
	export = Mover;
}

declare module 'dojo/dnd/Selector' {
	const Selector: dojo.dnd.SelectorConstructor;
	export = Selector;
}

declare module 'dojo/dnd/Source' {
	const Source: dojo.dnd.Source;
	export = Source;
}

declare module 'dojo/dnd/Target' {
	const Target: dojo.dnd.TargetConstructor;
	export = Target;
}

declare module 'dojo/dnd/TimedMoveable' {
	const TimedMoveable: dojo.dnd.TimedMoveableConstructor;
	export = TimedMoveable;
}

declare module 'dojo/dojo' {
	const require: dojo.Require;
	export = require;
}

declare module 'require' {
	const require: dojo.Require;
	export = require;
}

declare module 'dojo/dom' {
	const dom: dojo.Dom;
	export = dom;
}

declare module 'dojo/dom-attr' {
	const domAttr: dojo.DomAttr;
	export = domAttr;
}

declare module 'dojo/dom-class' {
	const domClass: dojo.DomClass;
	export = domClass;
}

declare module 'dojo/dom-construct' {
	const domConstruct: dojo.DomConstruct;
	export = domConstruct;
}

declare module 'dojo/dom-form' {
	const domForm: dojo.DomForm;
	export = domForm;
}

declare module 'dojo/dom-geometry' {
	const domGeom: dojo.DomGeometry;
	export = domGeom;
}

declare module 'dojo/dom-prop' {
	const domProp: dojo.DomProp;
	export = domProp;
}

declare module 'dojo/dom-style' {
	const domStyle: dojo.DomStyle;
	export = domStyle;
}

declare module 'dojo/domReady' {
	const domReady: dojo.DomReady;
	export = domReady;
}

declare module 'dojo/domReady!' {
	const callback: any;
	export = callback;
}

declare module 'dojo/errors/CancelError' {
	const CancelError: dojo.errors.CancelErrorConstructor;
	export = CancelError;
}

declare module 'dojo/errors/create' {
	const create: dojo.errors.Create;
	export = create;
}

declare module 'dojo/errors/RequestError' {
	const RequestError: dojo.errors.RequestErrorConstructor;
	export = RequestError;
}

declare module 'dojo/errors/RequestTimeoutError' {
	const RequestTimeoutError: dojo.errors.RequestTimeoutErrorConstructor;
	export = RequestTimeoutError;
}

declare module 'dojo/Evented' {
	const Evented: dojo.EventedConstructor;
	export = Evented;
}

declare module 'dojo/gears' {
	const gears: dojo.Gears;
	export = gears;
}

declare module 'dojo/has' {
	const has: dojo.Has;
	export = has;
}

declare module 'dojo/hash' {
	const hash: dojo.Hash;
	export = hash;
}

declare module 'dojo/hccss' {
	const hccss: dojo.Has;
	export = hccss;
}

declare module 'dojo/html' {
	const html: dojo.Html;
	export = html;
}

declare module 'dojo/i18n' {
	const i18n: dojo.I18n;
	export = i18n;
}

declare module 'dojo/io/iframe' {
	const iframe: dojo.io.IFrame;
	export = iframe;
}

declare module 'dojo/io/script' {
	const script: dojo.io.Script;
	export = script;
}

declare module 'dojo/io-query' {
	const ioQuery: dojo.IoQuery;
	export = ioQuery;
}

declare module 'dojo/json' {
	const json: dojo.Json;
	export = json;
}

declare module 'dojo/keys' {
	const keys: dojo.Keys;
	export = keys;
}

declare module 'dojo/loadInit' {
	const loadInit: dojo.LoadInit;
	export = loadInit;
}

declare module 'dojo/loadInit!' {
	const loadInit: (mid: string, require: any, loaded: (...modules: any[]) => void) => void;
	export = loadInit;
}

declare module 'dojo/main' {
	const main: dojo._base.Dojo;
	export = main;
}

declare module 'dojo/mouse' {
	const mouse: dojo.Mouse;
	export = mouse;
}

declare module 'dojo/NodeList' {
	const NodeList: dojo.NodeListConstructor;
	export = NodeList;
}

declare module 'dojo/number' {
	const number: dojo.Number;
	export = number;
}

declare module 'dojo/on' {
	const on: dojo.On;
	export = on;
}

declare module 'dojo/on/asyncEventListener' {
	const asyncEventListener: dojo.on.AsyncEventListener;
	export = asyncEventListener;
}

declare module 'dojo/on/debounce' {
	const debounce: dojo.on.Debounce;
	export = debounce;
}

declare module 'dojo/on/throttle' {
	const throttle: dojo.on.Throttle;
	export = throttle;
}

declare module 'dojo/parser' {
	const parser: dojo.Parser;
	export = parser;
}

declare module 'dojo/promise/all' {
	const all: dojo.promise.All;
	export = all;
}

declare module 'dojo/promise/first' {
	const first: dojo.promise.First;
	export = first;
}

declare module 'dojo/promise/instrumentation' {
	const instrumentation: dojo.promise.Instrumentation;
	export = instrumentation;
}

declare module 'dojo/promise/Promise' {
	const Promise: dojo.promise.PromiseConstructor;
	export = Promise;
}

declare module 'dojo/promise/tracer' {
	const tracer: dojo.promise.Tracer;
	export = tracer;
}

declare module 'dojo/query' {
	const query: dojo.Query;
	export = query;
}

/* modules for included selector engines */

declare module 'dojo/query!acme' {
	const query: dojo.Query;
	export = query;
}

declare module 'dojo/query!lite' {
	const query: dojo.Query;
	export = query;
}

declare module 'dojo/ready' {
	const ready: dojo.Ready;
	export = ready;
}

declare module 'dojo/regexp' {
	const regexp: dojo.RegExpModule;
	export = regexp;
}

declare module 'dojo/request' {
	const request: dojo.request.Request;
	export = request;
}

declare module 'dojo/request/default' {
	const def: dojo.request.Default;
	export = def;
}

declare module 'dojo/request/default!' {
	const def: dojo.request.Request;
	export = def;
}

declare module 'dojo/request/handlers' {
	const handlers: dojo.request.Handlers;
	export = handlers;
}

declare module 'dojo/request/node' {
	const node: dojo.request.Node;
	export = node;
}

declare module 'dojo/request/registry' {
	const registry: dojo.request.Registry;
	export = registry;
}

declare module 'dojo/request/script' {
	const script: dojo.request.Script;
	export = script;
}

declare module 'dojo/request/util' {
	const util: dojo.request.Util;
	export = util;
}

declare module 'dojo/request/watch' {
	const watch: dojo.request.Watch;
	export = watch;
}

declare module 'dojo/request/xhr' {
	const xhr: dojo.request.Xhr;
	export = xhr;
}

declare module 'dojo/require' {
	const require: dojo.RequirePlugin;
	export = require;
}

declare module 'dojo/robot' {
	const robot: dojo.Robot;
	export = robot;
}

declare module 'dojo/robotx' {
	const robotx: dojo.RobotX;
	export = robotx;
}

declare module 'dojo/router' {
	const router: dojo.router.RouterBase;
	export = router;
}

declare module 'dojo/router/RouterBase' {
	const RouterBase: dojo.router.RouterBaseConstructor;
	export = RouterBase;
}

declare module 'dojo/selector/_loader' {
	const loader: dojo.selector.Loader;
	export = loader;
}

declare module 'dojo/selector/_loader!' {
	const lite: dojo.selector.LiteQueryEnegine;
	export = lite;
}

declare module 'dojo/selector/_loader!acme' {
	const acme: dojo.selector.AcmeQueryEngine;
	export = acme;
}

declare module 'dojo/selector/_loader!lite' {
	const lite: dojo.selector.LiteQueryEnegine;
	export = lite;
}

declare module 'dojo/selector/acme' {
	const acme: dojo.selector.AcmeQueryEngine;
	export = acme;
}

declare module 'dojo/selector/lite' {
	const lite: dojo.selector.LiteQueryEnegine;
	export = lite;
}

declare module 'dojo/sniff' {
	const sniff: dojo.Has;
	export = sniff;
}

declare module 'dojo/store/api/Store' {
	const Store: dojo.store.api.StoreConstructor;
	export = Store;
}

declare module 'dojo/store/util/QueryResults' {
	const QueryResults: dojo.store.util.QueryResultsFunction;
	export = QueryResults;
}

declare module 'dojo/store/util/SimpleQueryEngine' {
	const SimpleQueryEngine: dojo.store.util.SimpleQueryEngine;
	export = SimpleQueryEngine;
}

declare module 'dojo/store/Memory' {
	const Memory: dojo.store.MemoryConstructor;
	export = Memory;
}

declare module 'dojo/text' {
	const text: dojo.Text;
	export = text;
}

declare module 'dojo/topic' {
	const hub: dojo.Topic;
	export = hub;
}

declare module 'dojo/touch' {
	const touch: dojo.Touch;
	export = touch;
}

declare module 'dojo/when' {
	const when: dojo.When;
	export = when;
}

declare module 'dojo/window' {
	const window: dojo.WindowModule;
	export = window;
}
