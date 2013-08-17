"use strict";

module.exports = function(grunt) {

    // auto load grunt tasks
    require('load-grunt-tasks')(grunt);

    var pluginConfig = {

        // gets the package vars
        pkg: grunt.file.readJSON("package.json"),

        // plugin directories
        dirs: {
            js:     "assets/js",
            css:    "assets/css",
            sass:   "assets/sass",
            images: "assets/images",
        },

        // svn settings
        svn_settings: {
            path: "/PATH/TO/YOUR/SVN/REPO/<%= pkg.name %>",
            tag: "<%= svn_settings.path %>/tags/<%= pkg.version %>",
            trunk: "<%= svn_settings.path %>/trunk",
            exclude: [
                ".editorconfig",
                ".git/",
                ".gitignore",
                ".jshintrc",
                ".sass-cache/",
                "node_modules/",
                "assets/sass/",
                "Gruntfile.js",
                "README.md",
                "package.json",
                "config.rb",
                "*.zip"
            ]
        },

        // javascript linting with jshint
        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            all: [
                "Gruntfile.js",
                "<%= dirs.js %>/admin.js",
                "<%= dirs.js %>/main.js"
            ]
        },

        // uglify to concat and minify
        uglify: {
            dist: {
                files: {
                    "<%= dirs.js %>/admin.min.js": ["<%= dirs.js %>/admin.js"],
                    "<%= dirs.js %>/main.min.js": ["<%= dirs.js %>/main.js"]
                }
            }
        },

        // compass and scss
        compass: {
            dist: {
                options: {
                    config: "config.rb",
                    force: true,
                    outputStyle: "compressed"
                }
            }
        },

        // watch for changes and trigger compass, jshint and uglify
        watch: {
            compass: {
                files: [
                    "<%= dirs.sass %>/**"
                ],
                tasks: ["compass"]
            },
            js: {
                files: [
                    "<%= jshint.all %>"
                ],
                tasks: ["jshint", "uglify"]
            }
        },

        // image optimization
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7,
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: "<%= dirs.images %>/",
                    src: "**",
                    dest: "<%= dirs.js %>/"
                }]
            }
        },

        // rsync commands used to take the files to svn repository
        rsync: {
            tag: {
                src: "./",
                dest: "<%= svn_settings.tag %>",
                recursive: true,
                exclude: "<%= svn_settings.exclude %>"
            },
            trunk: {
                src: "./",
                dest: "<%= svn_settings.trunk %>",
                recursive: true,
                exclude: "<%= svn_settings.exclude %>"
            }
        },

        // shell command to commit the new version of the plugin
        shell: {
            svn_add: {
                command: 'svn add --force * --auto-props --parents --depth infinity -q',
                options: {
                    stdout: true,
                    stderr: true,
                    execOptions: {
                        cwd: "<%= svn_settings.path %>"
                    }
                }
            },
            svn_commit: {
                command: "svn commit -m 'updated the plugin version to <%= pkg.version %>'",
                options: {
                    stdout: true,
                    stderr: true,
                    execOptions: {
                        cwd: "<%= svn_settings.path %>"
                    }
                }
            }
        }
    };

    // initialize grunt config
    // --------------------------
    grunt.initConfig(pluginConfig);

    // register tasks
    // --------------------------

    // default task
    grunt.registerTask("default", [
        "jshint",
        "compass",
        "uglify"
    ]);

    // deploy task
    grunt.registerTask("deploy", [
        "default",
        "rsync:tag",
        "rsync:trunk",
        "shell:svn_add",
        "shell:svn_commit"
    ]);

};
