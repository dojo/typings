declare namespace dojo {
	namespace cldr {
		interface Monetary {
			/**
			 * A mapping of currency code to currency-specific formatting information. Returns a unique object with properties: places, round.
			 * code:
			 *      an [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) currency code
			 *
			 * from http://www.unicode.org/cldr/data/common/supplemental/supplementalData.xml:supplementalData/currencyData/fractions
			 */
			getData(code: string): { places: number, round: number };
		}

		interface Supplemental {

			/**
			 * Returns a zero-based index for first day of the week
			 */
			getFirstDayOfWeek(locale?: string): number;

			_region(locale?: string): string;

			/**
			 * Returns a hash containing the start and end days of the weekend
			 */
			getWeekend(locale?: string): { start: number, end: number };
		}
	}
}
