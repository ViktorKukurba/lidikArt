module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: [
        'Gruntfile.js',
        'js/**/*.js',
        '!js/angular-facebook.js'
      ],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    sass: {
      dist: {
        files: {
          'build/lidik-art.css': 'css/lidik-art.scss'
        }
      }
    },
//    watch: {
//      files: ['<%= jshint.files %>'],
//      tasks: ['jshint']
//    },
    requirejs: {
      js: {
        options: {
          uglify2: {
            mangle: false
          },
          baseUrl: 'js',
          mainConfigFile: 'js/main.js',
          name: 'main',
          out: 'build/main.js',
          optimize: 'uglify2'
        }
      }
    },
    watch: {
      styles: {
        files: ['js/**/*.scss', 'js/**/**/*.scss', 'css/*.scss'], // which files to watch
        tasks: ['sass'],
        options: {
          nospawn: true
        }
      },
      js: {
        files: ['js/*.js', 'js/**/*.js', 'js/**/**/*.js'], // which files to watch
        tasks: ['requirejs'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['jshint', 'requirejs', 'sass', 'watch']);

};
