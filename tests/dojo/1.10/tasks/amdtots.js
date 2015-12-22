module.exports = function (grunt) {
	var convert = require('amd-to-es6');
	var fs = require('fs');
	var path = require('path');
	var Applause = require('applause');
	var mkdirp = require('mkdirp');

	var replaceEsImports = Applause.create({
		patterns: [
			{
				match: /import ([a-zA-Z0-9_]+) from ('[^']+');?/g,
				replacement: '$1 = require($2);'
			}
		]
	});

	var replaceRelativePath = Applause.create({
		patterns: [
			{
				match: /require\('(?:\.\.\/)+([^']+)'\)/g,
				replacement: 'require(\'dojo/$1\')'
			}
		]
	});

	grunt.registerMultiTask('amdtots', 'convert amd modules to ts', amdtots);

	function amdtots() {
		var done = this.async();
		var promises = [];
		var options = this.options({});
		this.files.forEach(function (file) {
			var dest = file.dest;
			file.src.forEach(function (file) {
				promises.push(writeFile(dest, convertToTs(file, options)));
			});
		});
		Promise.all(promises).then(function (files) {
			console.log('wrote ' + files.length + ' files');
			done();
		}, function (err) {
			console.warn('failed to write ' + err.file);
			throw err;
		})
	}

	function writeFile(dest, contents) {
		return new Promise(function (resolve, reject) {
			mkdirp(path.dirname(dest), function (err) {
				if (!causedRejection(err)) {
					fs.writeFile(dest, contents, 'utf8', function (err) {
						if (!causedRejection(err)) {
							resolve(dest);
						}
					});
				}
			});

			function causedRejection(err) {
				if (err) {
					reject({
						file: dest,
						error: err
					});
					return true;
				}
			}
		})
	}

	function convertToTs(file, options) {
		var contents = convertToEs6(file, options);
		contents = replaceEs6ToTs(contents);
		return replaceRelativePathing(contents);
	}

	function convertToEs6(filePath, options) {
		var file = fs.readFileSync(filePath, 'utf8');
		return convert(file, options || {});
	}

	function replaceEs6ToTs(src) {
		var replaced = replaceEsImports.replace(src);
		return replaced.content;
	}

	function replaceRelativePathing(src) {
		var replaced = replaceRelativePath.replace(src);
		return replaced.content;
	}
};
