dojoConfig = {
	async: true,
	baseUrl: 'node_modules',
	isDebug: true,
	packages: [ 'dojo' ],
	selectorEngine: 'lite',
	tlmSiblingOfDojo: true,
	deps: [ '_build/node' ]
};

require("./node_modules/dojo/dojo.js");
