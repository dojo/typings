declare namespace doh {
	/* TODO: This is a very rough job of typing, there maybe little value in typing D.O.H */
	interface Robot {
		_robotLoaded: boolean;
		_robotInitialized: boolean;
		_spaceReceived: boolean;
		_primePump: boolean;
		_killApplet: boolean;
		killRobot(): void;
		_runsemaphore: {
			lock: string[];
			unlock(): string;
		};
		startRobot(): boolean;
		_loaded: any;
		_initRobot(r: this): void;
		_started: any;
		_run(frame: HTMLFrameElement): void;
		_initKeyboard(): void;
		_onKeyboard(): void;
		_initWheel(): void;
		_setDocumentBounds(docScreenX: number, docScreenY: number): void;
		_notified(keystring: string): void;
		_appletDead: boolean;
		_assertRobot(): void;
		_mouseMove(x: number, y: number, absolute: boolean, duration?: number): void;
		sequence(f: Function, delay?: number, duration?: number): void;
		typeKeys(chars: string | number, delay?: number, duration?: number): void;
		keyPress(charOrCode: number, delay?: number, modifiers?: Object, asynchronous?: boolean): void;
		keyDown(charOrCode: number, delay?: number): void;
		keyUp(charOrCode: number, delay?: number): void;
		mouseClick(buttons: Object, delay?: number): void;
		mousePress(buttons: Object, delay?: number): void;
		mouseMoveTo(point: Object, delay?: number, duration?: number, absolute?: boolean): void;
		mouseMove(x: number, y: number, delay?: number, duration?: number, absolute?: boolean): void;
		mouseRelease(buttons: Object, delay?: number): void;
		mouseWheelSize: number;
		mouseWheel(wheelAmt: number, delay?: number, duration?: number): void;
		setClipboard(data: string, format?: string): void;
	}
}
