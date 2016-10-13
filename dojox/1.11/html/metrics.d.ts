declare namespace dojox {
	namespace html {
		namespace metrics {
			interface FontMeasurements {
				'100%': number;
				'12pt': number;
				'16px': number;
				'1em': number;
				'1ex': number;
				large: number;
				medium: number;
				small: number;
				'x-large': number;
				'xx-large': number;
				'x-small': number;
				'xx-small': number;

			}

			interface Metrics {
				getCachedFontMeasurements(recalculate?: boolean): FontMeasurements;
				getFontMeasurements(): FontMeasurements;
				getScrollbar(): dojo.DomGeometryWidthHeight;
				getTextBox(text: string, style?: Object, className?: string): dojo.DomGeometryXYBox;
				initOnFontResize(): void;
				onFontResize(event: Event): void;
			}
		}
	}
}

declare module 'dojox/html/metrics' {
	const metrics: dojox.html.metrics.Metrics;
	export = metrics;
}
