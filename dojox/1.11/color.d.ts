declare namespace dojox {

	namespace color {

		namespace api {
			interface ColorModel {
				/**
				 * Optionally initialize the color model from a list of data items and using a function
				 * that returns the value used to compute the color for a given item.
				 */
				initialize(items: any[], colorFunc: Function): void;

				/**
				 * return the color for a given data value.
				 */
				getColor(value: number): dojo._base.Color;
			}

			interface ColorModelConstructor extends dojo._base.DeclareConstructor<ColorModel> {
				new (): ColorModel;
			}
		}

		/* dojox/color/_base */

		interface CMYColor {
			c: number;
			m: number;
			y: number;
		}

		interface CMYKColor extends CMYColor {
			k: number;
		}

		interface HSLColor {
			h: number;
			s: number;
			l: number;
		}

		interface HSVColor {
			h: number;
			s: number;
			v: number;
		}

		interface Color {
			Color: dojo._base.Color;
			/**
			 * Blend colors end and start with weight from 0 to 1, 0.5 being a 50/50 blend,
			 * can reuse a previously allocated Color object for the result
			 */
			blendColors(start: Color, end: Color, weight: number, obj?: Color): dojo._base.Color;

			/**
			 * Returns a `Color` instance from a string of the form
			 * "rgb(...)" or "rgba(...)". Optionally accepts a `Color`
			 * object to update with the parsed value and return instead of
			 * creating a new object.
			 */
			fromRgb(color: string, obj?: Color): dojo._base.Color;

			/**
			 * Converts a hex string with a '#' prefix to a color object.
			 * Supports 12-bit #rgb shorthand. Optionally accepts a
			 * `Color` object to update with the parsed value.
			 */
			fromHex(color: string, obj?: Color): dojo._base.Color;

			/**
			 * Builds a `Color` from a 3 or 4 element array, mapping each
			 * element in sequence to the rgb(a) values of the color.
			 */
			fromArray(color: dojo._base.ColorValue | dojo._base.ColorValueAlpha, obj?: Color): dojo._base.Color;

			/**
			 * Parses `str` for a color value. Accepts hex, rgb, and rgba
			 * style color values.
			 */
			fromString(str: string, obj?: Color): dojo._base.Color;

			greyscale(g: number, a?: number): dojo._base.Color;

			/** Create a dojox.color.Color from a CMY defined color.
			 * All colors should be expressed as 0-100 (percentage)
			 */
			fromCmy(color: [ number, number, number ] | CMYColor): dojo._base.Color;
			fromCmy(cyan: number, magenta: number, yellow: number): dojo._base.Color;

			/**
			 * Create a dojox.color.Color from a CMYK defined color.
			 * All colors should be expressed as 0-100 (percentage)
			 */
			fromCmyk(color: [ number, number, number, number ] | CMYKColor): dojo._base.Color;
			fromCmyk(cyan: number, magenta: number, yellow: number, black: number): dojo._base.Color;

			/**
			 * Create a dojox.color.Color from an HSL defined color.
			 * hue from 0-359 (degrees), saturation and luminosity 0-100.
			 */
			fromHsl(color: [ number, number, number ] | HSLColor): dojo._base.Color;
			fromHsl(hue: number, saturation: number, luminosity: number): dojo._base.Color;

			/**
			 * Create a dojox.color.Color from an HSV defined color.
			 * hue from 0-359 (degrees), saturation and value 0-100.
			 */
			fromHsv(color: [ number, number, number ] | HSVColor): dojo._base.Color;
			fromHsv(hue: number, saturation: number, value: number): dojo._base.Color;
		}

		/* dojox/color/Colorspace */

		interface XYZColor {
			x: number;
			y: number;
			z: number;
		}

		interface XYColor {
			x: number;
			y: number;
		}

		type ColorMatrix = [ [ number, number, number ], [ number, number, number ], [ number, number, number ] ];

		interface ColorspaceOptions {
			profile?: string;
			whitepoint?: string;
			observer?: string;
			adaptor?: string;
		}

		interface Colorspace {
			whitepoint(wpName: string, observer?: string): XYZColor;
			tempToWhitepoint(t: number): XYColor;
			primaries(kwArgs?: ColorspaceOptions): any;
			adapt(kwArgs?: ColorspaceOptions): XYZColor;
			matrix(to: string, primary: any): ColorMatrix;
			epsilon(useApprox?: boolean): number;
			kappa(useApprox?: boolean): number;
			convert(color: any, from: string, to: string, kwArgs?: ColorspaceOptions): any;
		}

		interface Color {
			Colorspace: Colorspace;
			fromXYZ(xyz: XYZColor, kwArgs?: ColorspaceOptions): dojo._base.Color;
		}
	}
}

declare namespace dojo {

	namespace _base {

		/* dojox/color/_base */

		interface Color {
			/**
			 * Convert this Color to a CMY definition.
			 */
			toCmy(): dojox.color.CMYColor;

			/**
			 * Convert this Color to a CMYK definition.
			 */
			toCmyk(): dojox.color.CMYKColor;

			/**
			 * Convert this Color to an HSL definition.
			 */
			toHsl(): dojox.color.HSLColor;

			/**
			 * Convert this Color to an HSV definition.
			 */
			toHsv(): dojox.color.HSVColor;
		}

		/* dojox/color/Colorspace */

		interface Color {
			toXYZ(kwArgs?: dojox.color.ColorspaceOptions): dojox.color.XYZColor;
		}
	}
}

declare module 'dojox/color/api/ColorModel' {
	type ColorModel = dojox.color.api.ColorModel;
	const ColorModel: dojox.color.api.ColorModelConstructor;
	export = ColorModel;
}

declare module 'dojox/color/_base' {
	const cx: dojox.color.Color;
	export = cx;
}

declare module 'dojox/color/Colorspace' {
	const Colorspace: dojox.color.Colorspace;
	export = Colorspace;
}
