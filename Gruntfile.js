/* jshint node: true */

function mixin(destination) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];
		for (var key in source) {
			destination[key] = source[key];
		}
	}
	return destination;
}

module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-ts');
	grunt.loadNpmTasks('grunt-tslint');

	const tsconfigContent = grunt.file.read('tsconfig.json');
	const tsconfig = JSON.parse(tsconfigContent);
	const tsOptions = mixin({}, tsconfig.compilerOptions, {
		failOnTypeErrors: true,
		fast: 'never'
	});
	tsconfig.filesGlob = tsconfig.filesGlob.map(function (glob) {
		// Remove the leading './' from the glob because grunt-ts
		// sees it and thinks it needs to create a .baseDir.ts which
		// messes up the "dist" compilation
		return /^\.\//.test(glob) ? glob.slice(2) : glob;
	});
	const packageJson = grunt.file.readJSON('package.json');

	grunt.initConfig({
		name: packageJson.name,
		version: packageJson.version,
		tsconfig: tsconfig,
		tsconfigContent: tsconfigContent,
		all: ['<%= tsconfig.filesGlob %>'],
		devDirectory: '<%= tsconfig.compilerOptions.outDir %>',

		ts: {
			options: tsOptions,
			dev: {
				outDir: '<%= devDirectory %>',
				src: [ '<%= all %>' ]
			}
		},

		tslint: {
			options: {
				configuration: grunt.file.readJSON('tslint.json')
			},
			src: {
				src: [
					'<%= all %>'
				]
			}
		}
	});

	grunt.registerTask('dev', [ 'tslint', 'ts:dev' ]);
	grunt.registerTask('default', [ 'dev' ]);
}
