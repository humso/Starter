module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // package.json https://www.npmjs.com/package/npm-check-updates
    // package.json Simply change every dependency's version to *, then run npm update --save.

    // Compile sass – Done
    // Minify css – *might need to remove the .min for shopify – Done
    // Create a destribution task – Done

    // image optimisation - imagemin – Done
    // compile imagemin – Done

    // js hint - A Static Code Analysis Tool for JavaScript – Done, better to have it for Atom
    // js concat - concatenate the source files to create a one single file – Done
    // js uglify - minify js code

    // Something that would be nice to know…
    // browser reload – Live CSS reload &amp; Browser Syncing
    // Minify HTML
    // Minify SVG
    // Gzip – Compress files and folders


    // Set up variables for app source and app destination
    app: {
      scss_src:     'src/scss',
      img_src:      'src/images',
      js_src:       'src/js',
      assets_dest:  'dist/assets',
      banner:       '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
    },


    // Compile Sass
    sass: {
      dist: {
          options: {
              lineNumbers: true,
              style: 'expanded',
              sourcemap: 'none'
          },
          files: [{
              expand: true,
              cwd: '<%= app.scss_src %>',
              src: ['*.scss'],
              dest: '<%= app.assets_dest %>',
              ext: '.css'
          }]
        }
      },

      // Minify css
      cssmin: {
        dist: {
          files: [{
            expand: true,
            cwd: '<%= app.assets_dest %>',
            src: ['*.css'],
            dest: '<%= app.assets_dest %>',
            ext: '.css'
          }]
        }
      },

      // Minify Images
      imagemin: {
        dist: {
          files: [{
            expand: true,
            cwd: '<%= app.img_src %>',
            src: ['**/*.{png,jpg,gif}'],
            dest: '<%= app.assets_dest %>'
          }]
        }
      },

      // concatenate javascript from the plugins folder
      concat: {
        options: {
          stripBanners: false,
          banner: '<%= app.banner %>',
        },
        dist: {
          src: ['<%= app.js_src %>/plugins/*.js', '<%= app.js_src %>/*.js' ],
          dest: '<%= app.assets_dest %>/scripts.js'
        }
      },

      // uglify
      uglify: {
        options: {
          banner: '<%= app.banner %>'
        },
        dist: {
          files: [{
            expand: true,
            cwd: '<%= app.assets_dest %>',
            src: '**/*.js',
            dest: '<%= app.assets_dest %>'
          }]
        }
      },


      // Watch files when you type grunt watch on terminal
      watch: {
        scripts: {
          files: ['<%= app.js_src %>/*.js'],
          tasks: ['concat']
        },
        styles: {
          files: [ '<%= app.scss_src %>/**/*.scss'],
          tasks: [ 'sass' ]
        },
        images: {
          files: [ '<%= app.img_src %>/*.{png,jpg,gif'],
          tasks: [ 'newer:imagemin' ]
        }
      }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');

  // Builds with default and distribution configurations
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('dist', ['sass:dist', 'cssmin:dist', 'imagemin:dist', 'concat:dist', 'uglify:dist']);

};
