module.exports = (function(){

	var fs = require('fs'),
		path = require('path');

	// To Prevent Circular Imports
	var fileMap = {};

	return function importFile(fileName){

		// Determine Path for Importing dependent files
		var filePath = path.dirname(fileName),

			// Resolve to get the full path every time
			mapPath = path.resolve(filePath, fileName);

		// Add Error Handlers Later...
		if( !fs.existsSync(fileName) || fileMap[mapPath] ){ return ""; }

		// Mark as Read
		fileMap[mapPath] = 1;

		return	fs.readFileSync(fileName)
				.toString()
				.replace(
					// Regex to match import statements
					/(\/{2,})?([ \t]*)(.*)import\b\s[\"\'](.+)(\.js)?[\"\'];/g,
					function(match, commented, tabs, prefix, fileName){

						// JS Doesn't have negative look behind... Ignore if commented
						// Note: Not sure if support for /**/ should be added since it will be commented out anyway
						if( commented ){ return match; }

						// Replace Import
						return tabs + prefix + importFile(path.resolve(filePath, fileName+".js")).replace(/\n/g, "\n"+tabs);
					}
				);
	}

})();