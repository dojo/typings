declare namespace dojox {
	namespace gfx {
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

		interface VectorTextConstructor extends dojo._base.DeclareConstructor<VectorText> {
			new(url?: string): VectorText;
			prototype: VectorText;
		}
	}
}

declare module 'dojox/gfx/VectorText' {
	type VectorText = dojox.gfx.VectorText;
	const VectorText: dojox.gfx.VectorTextConstructor;
	export = VectorText;
}
