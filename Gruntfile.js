module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        sourceMap: true,
        sourceComments: 'map',
        outputStyle: 'compressed',
        banner: '/*! <%= pkg.name %> <%= pkg.version %> --- Minified CSS */\n'
      },
      dist: {
        files: {
          'css/lunacy.min.css' : ['src/*.scss'],
          'css/site.min.css' : ['src/site.scss']
        }
      }
    },
    jshint: {
      src: ['src/*.js']
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> --- Minified JS */\n'
      },
      dist: {
        files: {
          'js/lunacy.min.js': ['src/*.js']
        }
      }
    },
    watch: {
      css: {
        files: ['src/*.scss'],
        tasks: ['sass']
      },
      scripts: {
        files: ['src/*.js'],
        //tasks: ['jshint', 'uglify']
        tasks: ['uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass', 'watch', 'uglify', 'jshint']);

};