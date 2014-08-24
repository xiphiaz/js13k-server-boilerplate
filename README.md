# js13k Server Boilerplate

* Author: Zak Henry <zak@4mation.com.au>

***

## Prerequisites

1.  Git Installed
2.  NodeJS Installed (http://nodejs.org)
    See notes below for extra steps if using Windows Git Bash.

## Quick Start

1.  Install Global NodeJS modules (sudo may be needed, if not possible see (http://stackoverflow.com/a/21712034) )
```sh
$ sudo npm install -g grunt-cli
```

2.  Install Local NodeJS modules
```sh
$ sudo npm install
```

3. Run Grunt Watch
   Every change to your code will be automatically linted and moved into the build folder
```sh
$ grunt watch
```

3. Run Grunt Compile
   Built code is minified, app js is concatenated and all code is archived into a .zip (Check your output is under 13k!)
```sh
$ grunt
```


### This toolchain is inspired by:
* ng-boilerplate (http://joshdmiller.github.com/ng-boilerplate)

