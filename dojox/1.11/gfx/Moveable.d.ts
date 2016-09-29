declare namespace dojox {
	namespace gfx {
		interface Moveable {
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

		interface MoveableConstructor extends dojo._base.DeclareConstructor<Moveable> {
			new(shape: dojox.gfx.shape.Shape, options: MoveableOptions): Moveable;
			prototype: Moveable;
		}

		interface MoveableOptions {
			delay?: number;
			mover?: Mover;
		}
	}
}

declare module 'dojox/gfx/Moveable' {
	type Moveable = dojox.gfx.Moveable;
	const Moveable: dojox.gfx.MoveableConstructor;
	export = Moveable;
}
