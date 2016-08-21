declare namespace dojox {
	namespace string {

		/* dojox/string/BidiEngine */

		interface BidiEngine {
			/**
			 * Central public API for Bidi engine. Transforms the text according to
			 * formatIn, formatOut parameters. If formatIn or formatOut parametrs are
			 * not valid throws an exception.
			 */
			bidiTransform(text: string, formatIn: string, formatOut: string): string;

			/**
			 * Determine the base direction of a bidi text according to its first strong
			 * directional character.
			 */
			checkContextual(text: string): string;

			/**
			 * Return true if text contains RTL directed character.
			 */
			hasBidiChar(text: string): boolean;
		}

		interface BidiEngineConstructor {
			new (): BidiEngine;
		}
	}
}
