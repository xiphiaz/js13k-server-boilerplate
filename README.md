# js13k Server Boilerplate

* Author: Zak Henry <zak@4mation.com.au>

***

## Prerequisites

1.  Git Installed
2.  NodeJS Installed (http://nodejs.org)
    See notes below for extra steps if using Windows Git Bash.

## Quick Start

1. Install Global NodeJS modules (sudo may be needed, if not possible see (http://stackoverflow.com/a/21712034) )
    ```sh
    $ sudo npm install -g grunt-cli
    ```

2. Install Local NodeJS modules
    ```sh
    $ sudo npm install
    ```

3. Run Grunt Watch

    Every change to your code will be automatically linted and moved into the build folder
    ```sh
    $ grunt watch
    ```

4. Run Grunt Compile

    Built code is minified, app js is concatenated and all code is archived into a .zip (Check your output is under 13k!)
    ```sh
    $ grunt
    ```


## Example output
```sh
$ grunt
Running "clean:build" (clean) task
Cleaning "build/"...OK

Running "jshint:src" (jshint) task
>> 2 files lint free.

Running "jshint:gruntfile" (jshint) task
>> 1 file lint free.

Running "jshint:globals" (jshint) task
>> 0 files lint free.

Running "less:build" (less) task
File build/game/app/css/global.css created: 0 B → 21 B

Running "copy:build_assets" (copy) task
Created 1 directories, copied 1 files

Running "copy:build_sandbox_files" (copy) task
Copied 3 files

Running "copy:build_appjs" (copy) task
Copied 2 files

Running "copy:build_serverjs" (copy) task
Copied 2 files

Running "index:build" (index) task

Running "clean:compile" (clean) task
Cleaning "bin/"...OK
Cleaning "compressed/"...OK

Running "less:compile" (less) task
File build/game/app/assets/princess-rally.css created: 21 B → 13 B

Running "copy:compile_sandbox_files" (copy) task
Copied 3 files

Running "copy:compile_assets" (copy) task
Created 1 directories, copied 2 files

Running "copy:compile_serverjs" (copy) task
Created 2 directories, copied 2 files

Running "concat:compile_app_js" (concat) task
File "bin/game/app/princess-rally.js" created.

Running "uglify:compile" (uglify) task
File "bin/game/server/baz/bar.js" created.
File "bin/game/server/server.js" created.

Running "index:compile" (index) task

Running "compress:main" (compress) task
Created compressed/princess-rally.zip (8.1 kB)

Done, without errors.
```

### This toolchain is inspired by:
* ng-boilerplate (http://joshdmiller.github.com/ng-boilerplate)

