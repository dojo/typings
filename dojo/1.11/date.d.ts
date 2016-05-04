declare namespace dojo {
	namespace date {

		/* dojo/date */

		/* TODO: Activate for TS 1.8+ */
		/* type DatePortion = 'date' | 'time' | 'datetime'; */
		/* type DateInterval = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond' | 'quarter' | 'week' | 'weekday'; */

		interface DateBase {
			/**
			 * Returns the number of days in the month used by dateObject
			 */
			getDaysInMonth(dateObject: Date): number;

			/**
			 * Determines if the year of the dateObject is a leap year
			 */
			isLeapYear(dateObject: Date): boolean;

			/**
			 * Get the user's time zone as provided by the browser
			 */
			getTimezoneName(dateObject: Date): string;

			/**
			 * Compare two date objects by date, time, or both.
			 *
			 */
			compare(date1: Date, date2: Date, portion?: string /* DatePortion */): number;

			/**
			 * Add to a Date in intervals of different size, from milliseconds to years
			 */
			add(date: Date, interval: string /* DateInterval */, amount: number): Date;

			/**
			 * Get the difference in a specific unit of time (e.g., number of
			 * months, weeks, days, etc.) between two dates, rounded to the
			 * nearest integer.
			 */
			difference(date1: Date, date2?: Date, interval?: string /* DateInterval */): number;
		}

		/* dojo/date/locale */

		/* TODO: Activate for TS 1.8+ */
		/* type DateLocaleFormatSelector = 'time' | 'date'; */
		/* type DateLocaleFormatLength = 'long' | 'short' | 'medium' | 'full'; */

		interface DateLocaleFormatOptions {

			/**
			 * choice of 'time','date' (default: date and time)
			 */
			selector?: string; /* DateLocaleFormatSelector */

			/**
			 * choice of long, short, medium or full (plus any custom additions).  Defaults to 'short'
			 */
			formatLength?: string; /* DateLocaleFormatLength */

			/**
			 * override pattern with this string
			 */
			datePattern?: string;

			/**
			 * override strings for am in times
			 */
			timePattern?: string;

			/**
			 * override strings for pm in times
			 */
			am?: string;

			/**
			 * override strings for pm in times
			 */
			pm?: string;

			/**
			 * override the locale used to determine formatting rules
			 */
			locale?: string;

			/**
			 * (format only) use 4 digit years whenever 2 digit years are called for
			 */
			fullYear?: boolean;

			/**
			 * (parse only) strict parsing, off by default
			 */
			strict?: boolean;
		}

		interface DateLocale {

			/**
			 * Returns the zone (or offset) for the given date and options.  This
			 * is broken out into a separate function so that it can be overridden
			 * by timezone-aware code.
			 */
			_getZone(dateObject: Date, getName: boolean, options?: DateLocaleFormatOptions): string | number;

			/**
			 * Format a Date object as a String, using locale-specific settings.
			 */
			format(dateObject: Date, options?: DateLocaleFormatOptions): string;

			/**
			 * Builds the regular needed to parse a localized date
			 */
			regexp(options?: DateLocaleFormatOptions): string;

			_parseInfo(options?: DateLocaleFormatOptions): { regexp: string, tokens: string[], bundle: any };

			/**
			 * Convert a properly formatted string to a primitive Date object,
			 * using locale-specific settings.
			 */
			parse(value: string, options?: DateLocaleFormatOptions): Date;

			/**
			 * Add a reference to a bundle containing localized custom formats to be
			 * used by date/time formatting and parsing routines.
			 */
			addCustomFormats(packageName: string, bundleName: string): void;

			_getGregorianBundle(locale: string): GenericObject;

			/* TODO: string literal types used here */
			/**
			 * Used to get localized strings from dojo.cldr for day or month names.
			 */
			getNames(item: string, type: string, context?: string, locale?: string): string[];

			/**
			 * Determines if the date falls on a weekend, according to local custom.
			 */
			isWeekend(dateObject: Date, locale?: string): boolean;

			/**
			 * gets the day of the year as represented by dateObject
			 */
			_getDayOfYear(dateObject: Date): number;

			_getWeekOfYear(dateObject: Date, firstDayOfWeek?: number): number;
		}

		/* dojo/date/stamp */

		interface StampFormatOptions {

			/**
			 * "date" or "time" for partial formatting of the Date object.
			 * Both date and time will be formatted by default.
			 */
			selector?: string /* DateLocaleFormatSelector */;

			/**
			 * if true, UTC/GMT is used for a timezone
			 */
			zulu?: boolean;

			/**
			 * if true, output milliseconds
			 */
			milliseconds?: boolean;
		}

		interface Stamp {
			/**
			 * Returns a Date object given a string formatted according to a subset of the ISO-8601 standard.
			 */
			fromISOString(formattedString: string, defaultTime?: number): Date;

			/**
			 * Format a Date object as a string according a subset of the ISO-8601 standard
			 */
			toISOString(dateObject: Date, options?: StampFormatOptions): string;
		}
	}
}
