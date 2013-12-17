/* jshint node:true */
'use strict';

module.exports = function( grunt ) {

	// auto load grunt tasks
	require( 'load-grunt-tasks' )( grunt );

	var pluginConfig = {

		// gets the package vars
		pkg: grunt.file.readJSON( 'package.json' ),

		// plugin directories
		dirs: {
			admin: {
				js: 'admin/assets/js',
				css: 'admin/assets/css',
				sass: 'admin/assets/sass',
				images: 'admin/assets/images',
				fonts: 'admin/assets/fonts'
			},
			front: {
				js: 'public/assets/js',
				css: 'public/assets/css',
				sass: 'public/assets/sass',
				images: 'public/assets/images',
				fonts: 'public/assets/fonts'
			}
		},

		// svn settings
		svn_settings: {
			path: '/PATH/TO/YOUR/SVN/REPO/<%= pkg.name %>',
			tag: '<%= svn_settings.path %>/tags/<%= pkg.version %>',
			trunk: '<%= svn_settings.path %>/trunk',
			exclude: [
				'.editorconfig',
				'.git/',
				'.gitignore',
				'.jshintrc',
				'.sass-cache/',
				'node_modules/',
				'admin/assets/sass/',
				'admin/assets/js/admin.js',
				'public/assets/js/public.js',
				'public/assets/sass/',
				'Gruntfile.js',
				'README.md',
				'package.json',
				'*.zip'
			]
		},

		// javascript linting with jshint
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= dirs.admin.js %>/admin.js',
				'<%= dirs.front.js %>/public.js'
			]
		},

		// uglify to concat and minify
		uglify: {
			dist: {
				files: {
					'<%= dirs.admin.js %>/admin.min.js': ['<%= dirs.admin.js %>/admin.js'],
					'<%= dirs.front.js %>/public.min.js': ['<%= dirs.front.js %>/public.js']
				}
			}
		},

		// compass and scss
		compass: {
			options: {
				httpPath: '',
				environment: 'production',
				relativeAssets: true,
				noLineComments: true,
				outputStyle: 'compressed'
			},
			admin: {
				options: {
					sassDir: '<%= dirs.admin.sass %>',
					cssDir: '<%= dirs.admin.css %>',
					imagesDir: '<%= dirs.admin.images %>',
					javascriptsDir: '<%= dirs.admin.js %>',
					fontsDir: '<%= dirs.admin.fonts %>'
				}
			},
			front: {
				options: {
					sassDir: '<%= dirs.front.sass %>',
					cssDir: '<%= dirs.front.css %>',
					imagesDir: '<%= dirs.front.images %>',
					javascriptsDir: '<%= dirs.front.js %>',
					fontsDir: '<%= dirs.front.fonts %>'
				}
			}
		},

		// watch for changes and trigger compass, jshint and uglify
		watch: {
			compass: {
				files: [
					'<%= compass.admin.options.sassDir %>/**',
					'<%= compass.front.options.sassDir %>/**'
				],
				tasks: ['compass:admin', 'compass:front']
			},
			js: {
				files: [
					'<%= jshint.all %>'
				],
				tasks: ['jshint', 'uglify']
			}
		},

		// image optimization
		imagemin: {
			dist: {
				options: {
					optimizationLevel: 7,
					progressive: true
				},
				files: [
					{
						expand: true,
						cwd: '<%= dirs.admin.images %>/',
						src: '**/*.{png,jpg,gif}',
						dest: '<%= dirs.admin.images %>/'
					},
					{
						expand: true,
						cwd: '<%= dirs.front.images %>/',
						src: '**/*.{png,jpg,gif}',
						dest: '<%= dirs.front.images %>/'
					},
					{
						expand: true,
						cwd: './',
						src: 'screenshot-*.png',
						dest: './'
					}
				]
			}
		},

		// rsync commands used to take the files to svn repository
		rsync: {
			options: {
				args: ['--verbose'],
				exclude: '<%= svn_settings.exclude %>',
				syncDest: true,
				recursive: true
			},
			tag: {
				options: {
					src: './',
					dest: '<%= svn_settings.tag %>'
				}
			},
			trunk: {
				options: {
				src: './',
				dest: '<%= svn_settings.trunk %>'
				}
			}
		},

		// shell command to commit the new version of the plugin
		shell: {
			// Remove delete files.
			svn_remove: {
				command: 'svn st | grep \'^!\' | awk \'{print $2}\' | xargs svn --force delete',
				options: {
					stdout: true,
					stderr: true,
					execOptions: {
						cwd: '<%= svn_settings.path %>'
					}
				}
			},
			// Add new files.
			svn_add: {
				command: 'svn add --force * --auto-props --parents --depth infinity -q',
				options: {
					stdout: true,
					stderr: true,
					execOptions: {
						cwd: '<%= svn_settings.path %>'
					}
				}
			},
			// Commit the changes.
			svn_commit: {
				command: 'svn commit -m "updated the plugin version to <%= pkg.version %>"',
				options: {
					stdout: true,
					stderr: true,
					execOptions: {
						cwd: '<%= svn_settings.path %>'
					}
				}
			}
		}
	};

	// initialize grunt config
	// --------------------------
	grunt.initConfig( pluginConfig );

	// register tasks
	// --------------------------

	// default task
	grunt.registerTask( 'default', [
		'jshint',
		'compass',
		'uglify'
	] );

	// deploy task
	grunt.registerTask( 'deploy', [
		'default',
		'rsync:tag',
		'rsync:trunk',
		'shell:svn_remove',
		'shell:svn_add',
		'shell:svn_commit'
	] );
};
