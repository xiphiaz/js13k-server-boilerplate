module.exports = function (grunt) {

    /**
     * Load required Grunt tasks. These are installed based on the versions listed
     * in `package.json` when you do `npm install` in this directory.
     */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-conventional-changelog');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-compress');

    /**
     * Load in our build configuration file.
     */
    var userConfig = require('./build.config.js');

    /**
     * This is the configuration object Grunt uses to give each plugin its
     * instructions.
     */
    var taskConfig = {
        /**
         * We read in our `package.json` file so we can access the package name and
         * version. It's already there, so we don't repeat ourselves here.
         */
        pkg: grunt.file.readJSON("package.json"),

        /**
         * The banner is the comment that is placed at the top of our compiled
         * source files. It is first processed as a Grunt template, where the `<%=`
         * pairs are evaluated based on this very configuration object.
         */
        meta: {
            banner: '/**\n' +
                ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * <%= pkg.homepage %>\n' +
                ' *\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' * Licensed <%= pkg.license.type %> <<%= pkg.license.url %>>\n' +
                ' */\n'
        },

        /**
         * Creates a changelog on a new version.
         */
        changelog: {
            options: {
                dest: 'CHANGELOG.md',
                template: 'changelog.tpl'
            }
        },

        /**
         * Increments the version number, etc.
         */
        bump: {
            options: {
                files: [
                    "package.json",
                    "bower.json"
                ],
                commit: false,
                commitMessage: 'chore(release): v%VERSION%',
                commitFiles: [
                    "package.json",
                    "client/bower.json"
                ],
                createTag: false,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'origin'
            }
        },

        /**
         * The directories to delete when `grunt clean` is executed.
         */
        clean: {
            build: [
                '<%= build_dir %>/'
            ],
            compile: [
                '<%= compile_dir %>/',
                '<%= archive_dir %>/'
            ]
        },

        /**
         * The `copy` task just copies files from A to B. We use it here to copy
         * our project assets (images, fonts, etc.) and javascripts into
         * `build_dir`, and then to copy the assets to `compile_dir`.
         */
        copy: {
            build_sandbox_files:{
                files: [
                    {
                        cwd: 'src',
                        src: [ '**/*.json', '*.svg' ],
                        dest: '<%= build_dir %>/',
                        expand: true
                    }
                ]
            },
            build_appjs: {
                files: [
                    {
                        cwd: '<%= app_src %>',
                        src: ['**/*.js'],
                        dest: '<%= build_dir %>/game/app/',
                        expand: true
                    }
                ]
            },
            build_assets: {
                files: [
                    {
                        cwd: '<%= app_src %>/assets',
                        src: ['**'],
                        dest: '<%= build_dir %>/game/app/assets/',
                        expand: true
                    }
                ]
            },
            build_serverjs: {
                files: [
                    {
                        cwd: '<%= server_src %>',
                        src: ['**/*.js'],
                        dest: '<%= build_dir %>/game/server/',
                        expand: true
                    }
                ]
            },
            //compilation phase
            compile_sandbox_files:{
                files: [
                    {
                        cwd: '<%= build_dir %>',
                        src: [ '**/*.json', '*.svg' ],
                        dest: '<%= compile_dir %>/',
                        expand: true
                    }
                ]
            },
            compile_assets: {
                files: [
                    {
                        cwd: '<%= build_dir %>/game/app/assets',
                        src: ['**'],
                        dest: '<%= compile_dir %>/game/app/assets',
                        expand: true
                    }
                ]
            },
            compile_serverjs: {
                files: [
                    {
                        cwd: '<%= build_dir %>/game/server',
                        src: ['**'],
                        dest: '<%= compile_dir %>/game/server',
                        expand: true
                    }
                ]
            }
        },

        /**
         * `grunt concat` concatenates multiple source files into a single file.
         */
        concat: {
            /**
             * The `compile_js` target is the concatenation of our application source
             * code and all specified vendor source code into a single file.
             */
            compile_app_js: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                src: [
                    'module.prefix',
                    '<%= build_dir %>/game/app/**/*.js',
                    'module.suffix'
                ],
                dest: '<%= compile_dir %>/game/app/<%= pkg.name %>.js'
            }
        },

        /**
         * Minify the sources!
         */
        uglify: {
            compile: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                files: [
                    {
                        cwd: '<%= compile_dir %>/game/app',
                        src: '**/*.js',
                        dest: '<%= compile_dir %>/game/app',
                        expand: true
                    },
                    {
                        cwd: '<%= compile_dir %>/game/server',
                        src: '**/*.js',
                        dest: '<%= compile_dir %>/game/server',
                        expand: true
                    }
                ]
            }
        },

        /**
         * `grunt-contrib-less` handles our LESS compilation and uglification automatically.
         * Only our `main.less` file is included in compilation; all other files
         * must be imported from this file.
         */
        less: {
            build: {
                files : [
                    {
                        cwd: 'src/game/app',
                        src: '**/*.less',
                        dest: '<%= build_dir %>/game/app/css',
                        expand: true,
                        ext: '.css'
                    }
                ],

                options: {
                }
            },
            compile: {
                src: ['<%= build_dir %>/game/app/css/**/*.css', '<%= build_dir %>/game/app/css/global.css'],
                dest: '<%= build_dir %>/game/app/assets/<%= pkg.name %>.css',
                options: {
                    compile: false,
                    compress: true
                }

            }
        },

        /**
         * `jshint` defines the rules of our linter as well as which files we
         * should check. This file, all javascript sources, and all our unit tests
         * are linted based on the policies listed in `options`. But we can also
         * specify exclusionary patterns by prefixing them with an exclamation
         * point (!); this is useful when code comes from a third party but is
         * nonetheless inside `src/`.
         */
        jshint: {
            src: [
                '<%= app_files.js %>'
            ],
            gruntfile: [
                'Gruntfile.js'
            ],
            options: {
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true,
                debug: true
            },
            globals: {}
        },

        /**
         * The `index` task compiles the `index.html` file as a Grunt template. CSS
         * and JS files co-exist here but they get split apart later.
         */
        index: {

            /**
             * During development, we don't want to have wait for compilation,
             * concatenation, minification, etc. So to avoid these steps, we simply
             * add all script files directly to the `<head>` of `index.html`. The
             * `src` property contains the list of included files.
             */
            build: {

                dir: '<%= build_dir %>',
                src: [
                    '<%= build_dir %>/game/app/**/*.js',
                    '!<%= build_dir %>/game/app/js/namespace.js',
                    '!<%= build_dir %>/game/app/js/main.js',
                    '<%= build_dir %>/game/app/global.css',
                    '<%= build_dir %>/game/app/**/*.css'
                ]
            },

            /**
             * When it is time to have a completely compiled application, we can
             * alter the above to include only a single JavaScript and a single CSS
             * file. Now we're back!
             */
            compile: {
                dir: '<%= compile_dir %>',
                src: [
                    '<%= concat.compile_app_js.dest %>',
                    '<%= less.compile.dest %>'
                ]
            }
        },

        // make a zipfile
        compress: {
            main: {
                options: {
                    archive: '<%= archive_dir %>/<%= pkg.name %>.zip',
//                    mode: 'gzip',
                    pretty: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= compile_dir %>',
                        src: ['**'],
                        dest: '/'
                    } // makes all src relative to cwd
                ]
            }
        },


        /**
         * And for rapid development, we have a watch set up that checks to see if
         * any of the files listed below change, and then to execute the listed
         * tasks when they do. This just saves us from having to type "grunt" into
         * the command-line every time we want to see what we're working on; we can
         * instead just leave "grunt watch" running in a background terminal. Set it
         * and forget it, as Ron Popeil used to tell us.
         *
         * But we don't need the same thing to happen for all the files.
         */
        delta: {
            /**
             * By default, we want the Live Reload to work for all tasks; this is
             * overridden in some tasks (like this file) where browser resources are
             * unaffected. It runs by default on port 35729, which your browser
             * plugin should auto-detect.
             */
            options: {
                livereload: true
            },

            /**
             * When the Gruntfile changes, we just want to lint it. In fact, when
             * your Gruntfile changes, it will automatically be reloaded!
             */
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile'],
                options: {
                    livereload: false
                }
            },

            /**
             * When our JavaScript source files change, we want to run lint them and
             * run our unit tests.
             */
            jssrc: {
                files: [
                    '<%= app_files.js %>'
                ],
                tasks: ['jshint:src', 'copy:build_appjs']
            },

            /**
             * When assets are changed, copy them. Note that this will *not* copy new
             * files, so this is probably not very useful.
             */
            assets: {
                files: [
                    'src/assets/**/*'
                ],
                tasks: ['copy:build_assets']
            },

            /**
             * When index.html changes, we need to compile it.
             */
            html: {
                files: ['<%= app_files.html %>'],
                tasks: ['index:build']
            },

            /**
             * When the CSS files change, we need to compile and minify them.
             */
            less: {
                files: ['src/**/*.less'],
                tasks: ['less:build']
            }
        }
    };

    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

    /**
     * In order to make it safe to just compile or copy *only* what was changed,
     * we need to ensure we are starting from a clean, fresh build. So we rename
     * the `watch` task to `delta` (that's why the configuration var above is
     * `delta`) and then add a new task called `watch` that does a clean build
     * before watching for changes.
     */
    grunt.renameTask('watch', 'delta');
    grunt.registerTask('watch', ['build', 'delta']);

    /**
     * The default task is to build and compile.
     */
    grunt.registerTask('default', ['build', 'compile']);

    /**
     * The `build` task gets your app ready to run for development and testing.
     */
    grunt.registerTask('build', [
        'clean:build', 'jshint', 'less:build',
        'copy:build_assets', 'copy:build_sandbox_files','copy:build_appjs', 'copy:build_serverjs',
        'index:build'
    ]);

    /**
     * The `compile` task gets your app ready for deployment by concatenating and
     * minifying your code.
     */
    grunt.registerTask('compile', [
        'clean:compile', 'less:compile', 'copy:compile_sandbox_files', 'copy:compile_assets', 'copy:compile_serverjs',
        'concat', 'uglify', 'index:compile', 'compress'
    ]);

    /**
     * A utility function to get all app JavaScript sources.
     */
    function filterForJS(files) {
        files.push(grunt.config('build_dir')+'/'+grunt.config('app_files.main_js'));


        return files.filter(function (file) {
            return file.match(/\.js$/);
        });
    }

    /**
     * A utility function to get all app CSS sources.
     */
    function filterForCSS(files) {
        return files.filter(function (file) {
            return file.match(/^(?=.*.css).*$/);
        });
    }

    /**
     * The index.html template includes the stylesheet and javascript sources
     * based on dynamic names calculated in this Gruntfile. This task assembles
     * the list into variables for the template to use and then runs the
     * compilation.
     */
    grunt.registerMultiTask('index', 'Process index.html template', function () {

        var dirRE = new RegExp('^(' + grunt.config('build_dir') + '|' + grunt.config('compile_dir') + ')\/game\/', 'g');
        var jsFiles = filterForJS(this.filesSrc).map(function (file) {
            return file.replace(dirRE, '');
        });
        var cssFiles = filterForCSS(this.filesSrc).map(function (file) {
            return file.replace(dirRE, '');
        });

        console.log('filtered files are', jsFiles);


        grunt.file.copy('src/game/app/index.html', this.data.dir + '/game/index.html', {
            process: function (contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config('pkg.version')
                    }
                });
            }
        });
    });

};
