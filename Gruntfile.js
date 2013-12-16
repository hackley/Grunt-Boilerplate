// Live Reload
var liveReload = require('connect-livereload');
var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};


module.exports = function(grunt) {

	// Load all plugins named with the "grunt-" prefix
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({

    // Watch for file changes
    // ----------------------------------------------------------------------------
		watch: {
      sass: { 
        // When any scss file changes...
        files: ['_src/sass/**/*.scss'],
        // ...run the sass:server task
        tasks: ['sass:server']
      },
      coffee: {
        // When any coffee file changes...
        files: ['_src/coffee/**/*.coffee'],
        // ...run the coffee:server task
        tasks: ['coffee:server']
      },
      reload: {
        // When any of these files change,
        // refresh the browser.
        files: [
          '.tmp/css/*.css',
          '.tmp/js/*.js',
          '_src/**/*.html',
          '_src/**/*.{js,jpg,png,gif,svg}'
        ],
        options: {
          livereload: true
        }
      }
    },

    // Set up our local server
    // ----------------------------------------------------------------------------
		connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0'
      },
      server: {
        options: {
          middleware: function(connect) {
            return [
              liveReload(),
              mountFolder(connect, '.tmp'),
              mountFolder(connect, '_src')
            ];
          }
        }
      },
    },

    // Empty before a new build
    // ----------------------------------------------------------------------------
		clean: {
      build: '_build',
      server: '.tmp'
    },

    // Compile Sass, with different destinations for 'server' and 'build'
    // ----------------------------------------------------------------------------
    sass: {
  	 options: {
        style: 'compressed',
        precision: 15
      },
	    build: { 
	      files: {
	        '_build/css/styles.css': '_src/sass/styles.scss'
	      }
	    },
	    server: { 
	      files: {
	        '.tmp/css/styles.css': '_src/sass/styles.scss'
	      }
	    }
	  },

    // Compile CoffeeScript, with different destinations for 'server' and 'build'
    // ----------------------------------------------------------------------------
	  coffee: {
	  	options: {
	      join: true
	    },
	  	build: {
		    files: {
		      '_build/js/main.js': ['_src/coffee/**/*.coffee'] 
		    }
		  },
		  server: {
		    files: {
		      '.tmp/js/main.js': ['_src/coffee/**/*.coffee'] 
		    }
		  }
	  },

    // Minify our newly compiled JS (build only)
    // ----------------------------------------------------------------------------
		uglify: {
	    build: {
	      files: {
	        '_build/js/main.js': ['_build/js/main.js']
	      }
	    }
	  },

    // Copy html, images, and other assets (build only)
    // ----------------------------------------------------------------------------
	  copy: {
		  build: {
		    files: [
		      {expand: true, cwd: '_src/', src: ['index.html'], dest: '_build/'},
		      {expand: true, cwd: '_src/', src: ['img/**'], dest: '_build/'},
		      {expand: true, cwd: '_src/', src: ['vendor/**'], dest: '_build/'},
		    ]
		  }
		}
  });

  
  // Register our Grunt tasks
  // ------------------------------------------------------------------------------

	grunt.registerTask('server', function(target) {
    grunt.task.run([
      'clean:server',         // empty the ".tmp" directory
      'sass:server',          // compile sass
      'coffee:server',        // compile coffee
      'connect',              // start up the server
      'watch'                 // watch for file changes
    ]);
  });


  grunt.registerTask('build', [
  	'clean:build',							// empty the "build" directory
    'sass:build', 							// compile sass
    'coffee:build', 						// compile coffee
    'uglify', 									// minify
    'copy'											// copy all other files
  ]);

  grunt.registerTask('default', 'build');

}