module.exports = function (grunt) {
	require('grunt-dojo2').initConfig(grunt, {
		dtsGenerator: {
			options: {
				main: 'dojo-core/main'
			}
		}
	});
	grunt.registerTask('dev', [ 'tslint', 'ts:dev' ]);
	grunt.registerTask('default', [ 'dev' ]);
};
