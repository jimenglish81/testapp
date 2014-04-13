module.exports = function(grunt) {
	
   // Project configuration.
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
  	   requirejs: {
         compile: {
            options: {
	            // build dir
         	   dir: "dist",
         	   // where is the main require file
         	   mainConfigFile: "app/scripts/main.js",
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
      },
      bower: {
         install: {
            options: {
               layout: function(type, component) {
                  console.log('installing:', component, ' of type ', type);
                  return component;
               },
               cleanup: true,
               targetDir: 'app/scripts/vendor'
            }
         }
      },
      clean: {
         build: {
            src: [ 
               'lib',
               'dist/build.txt',
               'npm-debug.log'
            ]
         }
      },
      uglify: {
         build: {
            options: {
              banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            target: {
               files: [{
                  expand: true,
                  src: ['**/*.js'],
                  dest: 'dist/',
                  cwd: 'dist/',
                  ext: '.min.js',
                  extDot: 'first'
               }]
            }
         }
      }
   });

   // Load tasks
   grunt.loadNpmTasks('grunt-contrib-requirejs');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-bower-task');
   grunt.loadNpmTasks('grunt-contrib-clean');
   
   // Default task(s).
   grunt.registerTask('default', [
      'bower:install', 
      'requirejs:compile', 
      'clean:build',
      'uglify:build'
   ]);

};
