/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    /**
     * The `build_dir` folder is where our projects are compiled during
     * development and the `compile_dir` folder is where our app resides once it's
     * completely built.
     */
    build_dir: 'build',
    compile_dir: 'bin',
    archive_dir: 'compressed',

    /**
     * This is a collection of file patterns that refer to our app code (the
     * stuff in `src/`). These file paths are used in the configuration of
     * build tasks. `js` is all project javascript, less tests. `ctpl` contains
     * our reusable components' (`src/common`) template HTML files, while
     * `atpl` contains the same, but for our app's code. `html` is just our
     * main HTML file, `less` is our main stylesheet, and `unit` contains our
     * app's unit tests.
     */
    app_src: 'src/game/app',
    app_files: {

        js: ['src/game/app/**/*.js'],

        html: ['src/game/app/index.html'],

        app_less: ['src/game/app/global.less'],

        files_from_src: ['src/game/app/.htaccess']
    },

    server_src: 'src/game/server',
    server_files: {
        js : ['src/game/server/**/*.js']
    }

};
