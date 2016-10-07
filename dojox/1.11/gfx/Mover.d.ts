declare namespace dojox {
	namespace gfx {
		interface Mover {
			destroy(): void;
			onFirstMove(): void;
			onMouseMove(event: MouseEvent): void;
		}

		interface MoverConstructor extends dojo._base.DeclareConstructor<Mover> {
			new(shape: dojox.gfx.shape.Shape, event: MouseEvent, host: Moveable): Mover;
			prototype: Mover;
		}
	}
}

declare module 'dojox/gfx/Mover' {
	type Mover = dojox.gfx.Mover;
	const Mover: dojox.gfx.MoverConstructor;
	export = Mover;
}
