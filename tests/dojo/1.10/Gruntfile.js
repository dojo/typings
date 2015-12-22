/* jshint node: true */

module.exports = function (grunt) {
	grunt.loadTasks('./tasks');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.initConfig({
		amdtots: {
			dojo: {
				files: [{
					expand: true,
					cwd: './node_modules/dojo/tests/unit/',
					src: [ '**/*.js',
						'!**/support/**/*', '!**/resources/**/*', '!i18n.js', '!keys.js', '!node.js', '!all.js' ],
					dest: '_generated/',
					ext: '.ts'
				}]
			}
		},

		clean: {
			dojo: {
				src: [ '_generated/' ]
			}
		}
	});

	grunt.registerTask('default', ['amdtots']);
};
