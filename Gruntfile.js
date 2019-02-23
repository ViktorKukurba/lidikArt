
var grunt = require('grunt');
var sass = require('node-sass');

// module.exports = function(grunt) {

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
      options: {
        implementation: sass,
        sourceMap: true
      },
      dist: {
        files: {
          'build/lidik-art.css': 'css/lidik-art.scss'
        }
      }
    },
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
    },
    replace: {
      dist: {
        options: {
          patterns: [{
            match: /<base href="\/"><\/base>/,
            replacement: '<base href="/lidikArt/"></base>'
          }, {
            match: /data-main="js\/main.js"/,
            replacement: 'data-main="main.js"'
          }, {
            match: /bower_components\/requirejs\/require.js/,
            replacement: 'require.js'
          }, {
            match: /build/,
            replacement: 'lidikArt'
          }]
        },
        files: [
          {expand: true, flatten: true, src: ['index.html'], dest: 'build/'}
        ]
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, flatten: true, src: ['bower_components/requirejs/require.js'], dest: 'build/', filter: 'isFile'},
          {expand: true, src: ['js/*.html', 'js/**/*.html', 'languages/**', 'fonts/**', 'images/**'], dest: 'build/', filter: 'isFile'},
        ],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['jshint', 'requirejs', 'sass', 'watch']);
  grunt.registerTask('build', ['jshint', 'requirejs', 'sass', 'replace', 'copy']);

// };
