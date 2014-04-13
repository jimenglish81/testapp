module.exports = function(grunt) {
	
   // Project configuration.
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
  	   requirejs: {
         compile: {
            options: {
	            // main app directory - go up one
	            //build dir
         	   dir: "dist",
         	   // where is the main require file
         	   mainConfigFile: "app/scripts/main.js",
         	   //name: "main",
         	   optimize: "none",
         	   modules: [
         	      {
         	         name: "main",

         	         // modules that are not included by main, but may want to front end load as they are commonly used.
         	         include: [
         	            "jquery"
         	         ],
                     // Use the *shallow* exclude; otherwise, dependencies of
         	         // the included modules will also be excluded from this build. 
         	         // a deep-exclude would override our above include.
         	         excludeShallow: [
         	            "aComponent"
         	         ]
         	      },
	               {
         	         name: "aComponent",
         	         // If we don't exclude these modules, they will be doubly
         	         // defined in our main module (since these are ALSO
         	         // dependencies of our main module).
	                  exclude: [
	                     "jquery"
	                  ]
	               }
	            ],
	            onBuildWrite: function(name, path, contents) {
	               console.log('Writing: ' + name);
	               return contents
	            },
               done: function(done, output) {
                  var duplicates = require('rjs-build-analysis').duplicates(output);

                  if (duplicates.length > 0) {
                   grunt.log.subhead('Duplicates found in requirejs build:');
                   grunt.log.warn(duplicates);
                   done(new Error('r.js built duplicate modules, please check the excludes option.'));
                  }

                  done();
               }
            }
         }
      }
   });

   // Load the plugin that provides the "uglify" task.
   grunt.loadNpmTasks('grunt-contrib-requirejs');

   // Default task(s).
   grunt.registerTask('default', ['requirejs']);

};
