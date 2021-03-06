module.exports = (function(){

	var fs = require('fs'),
		path = require('path');

	return function importFile(fileName, fileMap){

		// To Prevent Circular Imports
		fileMap = fileMap || {};

		// Determine Path for Importing dependent files
		var filePath = path.dirname(fileName),

			// Resolve to get the full path every time
			mapPath = path.resolve(fileName);

		// Add Error Handlers Later...
		if(
			// Check that File Exists
			!fs.existsSync(fileName) ||

			// Check it hasn't been imported yet
			fileMap[mapPath]
		){ return ""; }

		// Mark as Read
		fileMap[mapPath] = 1;

		return	fs.readFileSync(fileName)
				.toString()
				.replace(
					// Regex to match import statements
					/^(?:(?!\/[\/*]))([ \t]*)(.*)import [\"\'](.+)(?:\.js)?[\"\'];(?![^\*]+\*\/)/gm,
					function(match, tabs, prefix, fileName){

						// Replace Import
						return tabs + prefix + importFile(path.resolve(filePath, fileName+".js"), fileMap).replace(/\n/g, "\n"+tabs);
					}
				);
	};

})();