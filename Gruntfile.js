module.exports = function(grunt) {

  grunt.initConfig({
    // Server
    connect: {
      dev: {
        options: {
          base: ['.', 'app/src', 'app/dev'],
          port: 1337,
          livereload: true
        }
      },

      dist: {
        options: {
          base: ['app/dist'],
          port: 1337,
          keepalive: true
        }
      }
    },

    sass: {
      dev: {
        files: { 'app/dev/css/styles.css': 'app/src/scss/main.scss' }
      },
      dist: {
        files: { 'app/dist/css/styles.css': 'app/src/scss/main.scss' }
      }
    },

    watch: {
      scripts: {
        files: ['app/src/js/**/*.js'],
        tasks: ['concat:dev'],
        options: { livereload: true }
      },
      styles: {
        files: ['app/src/scss/**/*.scss'],
        tasks: ['sass:dev'],
        options: { livereload: true }
      },
      views: {
        files: ['app/src/views/**/*.html', 'app/development.html'],
        options: { livereload: true }
      }
    },

    open: {
      dev: {
        path: 'http://localhost:1337/app/development.html'
      }
    },

    copy: {
      dist: {
        files: [
          { src: 'index.html', dest: 'app/dist' },
          { expand: true, cwd: 'app/src/views', src: '**', dest: 'app/dist/views/' },
          { expand: true, cwd: 'app/assets', src: '**', dest: 'app/dist/assets/' }
        ]
      }
    },

    ngtemplates: {
      glApp: {
        cwd: 'src',
        src: 'app/views/**/*.html',
        dest: 'app/dist/js/templates.js'
      }
    },

    // Concat
    concat: {
      dev: {
        src: ['app/src/js/*.js', 'app/src/js/controllers/*.js'],
        dest: 'app/dev/js/app.js'
      },

      dist: {
        src: [
          'app/bower_components/angular/angular.js',
          'app/bower_components/angular-route/angular-route.js',
          'app/src/js/*.js',
          'app/src/js/controllers/*.js',
          'app/dist/js/templates.js'
        ],
        dest: 'app/dist/js/app.js'
      },
    },

  });


  grunt.registerTask('build:dev', [
    'sass:dev',
    'concat:dev'
  ]);

  grunt.registerTask('build:dist', [
    'sass:dist',
    'concat:dist',
    'copy:dist',
    'ngtemplates'
  ]);

  grunt.registerTask('server', [
    'build:dev',
    'connect:dev',
    'open',
    'watch'
  ]);

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-open');
}
