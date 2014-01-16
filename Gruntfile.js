var liveReload = require('connect-livereload');
var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};


module.exports = function(grunt) {

  // Load all plugins named with the "grunt-" prefix
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    watch: {
      sass: {
        files: ['_src/sass/**/*.scss'],
        tasks: ['sass:server', 'concat:server']
      },
      coffee: {
        files: ['_src/coffee/**/*.coffee'],
        tasks: ['coffee:server', 'concat:server']
      },
      reload: {
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

    clean: {
      build: '_build',
      server: '.tmp',
    },

    sass: {
     options: {
        style: 'expanded',
        precision: 15
      },
      build: { 
        files: {
          '.tmp/holding/css/styles.css': '_src/sass/styles.scss'
        }
      },
      server: { 
        files: {
          '.tmp/holding/css/styles.css': '_src/sass/styles.scss'
        }
      }
    },

    coffee: {
      options: {
        join: true
      },
      build: {
        files: {
          '.tmp/holding/js/main.js': ['_src/coffee/**/*.coffee'] 
        }
      },
      server: {
        files: {
          '.tmp/holding/js/main.js': ['_src/coffee/**/*.coffee'] 
        }
      }
    },

    concat: {
      build: {
        files: {
          '_build/js/main.js': ['_src/vendor/**/*.js', '.tmp/holding/js/main.js'],
          '_build/css/styles.css': ['_src/vendor/**/*.css', '.tmp/holding/css/styles.css'],
        },
      },
      server: {
        files: {
          '.tmp/js/main.js': ['_src/vendor/**/*.js', '.tmp/holding/js/main.js'],
          '.tmp/css/styles.css': ['_src/vendor/**/*.css', '.tmp/holding/css/styles.css'],
        },
      }
    },

    uglify: {
      build: {
        files: {
          '_build/js/main.js': ['_build/js/main.js']
        }
      }
    },

    cssmin: {
      add_banner: {
        files: {
          '_build/css/styles.css': ['_build/css/styles.css']
        }
      }
    },

    copy: {
      build: {
        files: [
          {expand: true, cwd: '_src/', src: ['*.html'], dest: '_build/'},
          {expand: true, cwd: '_src/', src: ['img/**'], dest: '_build/'},
        ]
      }
    }
  });


  grunt.registerTask('server', function(target) {
    grunt.task.run([
      'clean:server',         // empty the ".tmp" directory
      'sass:server',          // compile sass
      'coffee:server',        // compile coffee
      'concat:server',        // bring in vendor js/css
      'connect',              // start the server
      'watch'                 // watch for file changes
    ]);
  });


  grunt.registerTask('build', [
    'clean:build',              // empty the "build" directory
    'sass:build',               // compile sass
    'coffee:build',             // compile coffee
    'concat:build',             // bring in vendor js/css
    'uglify',                   // minify js
    'cssmin',                   // minify css
    'copy'                      // copy all other files
  ]);

  grunt.registerTask('default', 'build');

}