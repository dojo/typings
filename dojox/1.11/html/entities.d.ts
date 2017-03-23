declare namespace dojox {
	namespace html {
		namespace entities {

			type CharCodeAndEntityName = [string, string];

			interface Entities {

				html: CharCodeAndEntityName[];

				latin: CharCodeAndEntityName[];

				/**
				 * Function to obtain an entity encoding for a specified character
				 */
				decode(string: string, map?: CharCodeAndEntityName[]): string;

				/**
				 * Function to obtain an entity encoding for a specified character
				 */
				encode(string: string, map?: CharCodeAndEntityName[]): string;
			}
		}
	}
}

declare module 'dojox/html/entities' {
	const entities: dojox.html.entities.Entities;
	export = entities;
}
