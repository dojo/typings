declare namespace dojox {
	namespace gfx {
		interface Moveable {
			new(shape: Shape, options: MoveableOptions): Moveable;

			destroy(): void;
			onFirstMove(mover: Mover): void;
			onMouseDown(event: MouseEvent): void;
			onMouseMove(event: MouseEvent): void;
			onMouseUp(event: MouseEvent): void;
			onMove(move: Mover, shift: Translation): void;
			onMoved(move: Mover, shift: Translation): void;
			onMoveStart(mover: Mover): void;
			onMoveStop(mover: Mover): void;
			onMoving(move: Mover, shift: Translation): void;
		}

		interface MoveableOptions {
			delay?: number;
			mover?: Mover;
		}
	}
}

declare module 'dojox/gfx/Moveable' {
	const moveable: dojox.gfx.Moveable;
	export = moveable;
}
