module.exports = function (grunt) {
	require('grunt-dojo2').initConfig(grunt, {});
	grunt.registerTask('dev', [ 'tslint', 'ts:dev' ]);
	grunt.registerTask('default', [ 'dev' ]);
};
