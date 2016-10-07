declare namespace dojox {
	namespace gfx {
		interface Registry {
			byId(id: string): dojox.gfx.shape.Shape;
			dispose(shape: dojox.gfx.shape.Shape, recurse?: boolean): void;
			register(shape: dojox.gfx.shape.Shape): string;
		}
	}
}

declare module 'dojox/gfx/registry' {
	const registry: dojox.gfx.Registry;
	export = registry;
}
