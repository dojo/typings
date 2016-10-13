declare namespace dojox {
	namespace xml {
		interface DomParser {
			parse: (xml: string) => Document;
		}
	}
}

declare module 'dojox/xml/DomParser' {
	const domParser: dojox.xml.DomParser;
	export = domParser;
}
