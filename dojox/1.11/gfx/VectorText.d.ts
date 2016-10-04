declare namespace dojox {
	namespace gfx {
		interface Gfx {
			defaultVectorFont: VectorFont;
			defaultVectorText: VectorText;
			vectorFontFitting: {
				NONE: string;
				FLOW: string;
				FIT: string;
			};

			getVectorFont(url: string): VectorFont;
		}

		interface VectorFont {
			family: string;
			size: string;
			type: string;
		}

		interface VectorText {
			align: string;
			decoration: string;
			fitting: number; // TODO enum? vectorFontFitting
			height: number;
			leading: number;
			text: string;
			type: string;
			width: number;
			x: number;
			y: number;

			new(url: string): this;

			draw(
				group: dojox.gfx.shape.Container,
				text: Text,
				font: Font,
				fill: Fill,
				stroke: Stroke
			): Group;
			getBaseLine(scale?: number): number;
			getCenterLine(scale?: number): number;
			getLineHeight(scale?: number): number;
			getWidth(text: string, scale?: number): number;
			initialized(): boolean;
			load(url: string): this;
			onLoad(font: VectorText): void;
			onLoadBegin(url: string): void;
		}
	}
}

declare module 'dojox/gfx/VectorText' {
	const vectorFont: dojox.gfx.VectorFont;
	export = vectorFont;
}
