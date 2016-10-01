declare namespace dojox {
	namespace gfx {
		// TODO: we only want this to happen when the 'dojox/gfx/registry' module is actually loaded
		interface Gfx extends Registry {}

		interface Registry {
			byId(id: string): dojox.gfx.Shape;
			dispose(shape: dojox.gfx.Shape, recurse?: boolean): void;
			register(shape: dojox.gfx.Shape): number;
		}

		// TODO: we only want this to happen when the 'dojox/gfx/registry' module is actually loaded
		interface Shape {
			getUid(): number;
		}
	}
}

declare module 'dojox/gfx/registry' {
	const registry: dojox.gfx.Registry;
	export = registry;
}
