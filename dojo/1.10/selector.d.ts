declare namespace dojo {
	namespace selector {

		/* dojo/selector/_loader */
		interface Loader {
			/**
			 * This module handles loading the appropriate selector engine for the given browser
			 */
			load(id: string, parentRequire: Function, loaded: Function): void; /* TODO: Align with loader api */
		}

		/* dojo/selector/acme */

		interface AcmeQueryEngine {
			<T extends Node>(query: string, root?: NodeOrString): T[];
			filter<T extends Node>(nodeList: T[], filter: string, root?: NodeOrString): T[];
		}

		/* dojo/selector/lite */

		interface LiteQueryEnegine {
			<T extends Node>(query: string, root?: NodeOrString): T[];
			match(node: Node, selector: string, root?: NodeOrString): boolean;
		}
	}
}
