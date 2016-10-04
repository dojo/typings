declare namespace dojox {
	namespace gfx {
		interface Mover {
			new(shape: Shape, event: MouseEvent, host: Moveable): Mover;

			destroy(): void;
			onFirstMove(): void;
			onMouseMove(event: MouseEvent): void;
		}
	}
}

declare module 'dojox/gfx/Mover' {
	const mover: dojox.gfx.Mover;
	export = mover;
}
