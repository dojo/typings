declare namespace dojox {
	namespace xml {
		interface DomParser {
			parse: (xml: string) => Document;
		}
	}
}

declare module 'dojox/xml/DomParser' {
	const DomParser: dojox.xml.DomParser;
	export = DomParser;
}
