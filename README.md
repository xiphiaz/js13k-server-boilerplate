# 4mation AngularJS  Boilerplate

* Developer: 4mation Technologies
* Author: Zak Henry <zak@4mation.com.au>

***

## Prerequisites

1.  Git Installed
2.  NodeJS Installed (http://nodejs.org)
    See notes below for extra steps if using Windows Git Bash.

## Quick Start

1.  Install Global NodeJS modules (sudo may be needed, if not possible see (http://stackoverflow.com/a/21712034) )
```sh
$ sudo npm install -g grunt-cli bower karma
```

2.  Install Local NodeJS modules
```sh
$ sudo npm install
```

3. Install Vendor JS/CSS Files
```sh
$ bower install
```

4. Run Grunt Watch
   More info in Deployment Notes below
```sh
$ grunt watch
```

6.  Set up a Hosts rule for `127.0.0.1 local.app.example.com`

7.  Restart Apache, and go to http://local.app.example.com in your browser.

## Deployment Notes

* Running `grunt watch` will watch individual files in your `/src` directory. When a change is made, the change is compiled to the `/build` directory.
* Some changes to files (dir name changes, filename changes etc) will not be picked up by the delta watcher. If your change is not picked up, re-run grunt watch (Ctrl+c to cancel watch)
* To build a minified copy of the site for deployment, execute `grunt` by itself. This will compile to the `/bin` directory.


## Project Notes

### Windows Machines
On windows it's great to do everything through the Git Bash prompt. You'll need to establish a few paths for this.
1.  Go to System > Advanced Config > Environment Variables
2.  Edit Path and copy the contents. You will need to reformat the paths from `C:\directory\path` to `/c/directory/path`
3.  Add the following to `.bash_profile` (create it if it doesn't exist) in your user directory (eg. `C:/Users/Dave`)
```sh
export PATH="/C/Program Files/nodejs:/C/Users/_YOUR_USER_DIRECTORY_/AppData/Roaming/npm:$PATH"
export FIREFOX_BIN="/C/Program Files (x86)/Mozilla Firefox/firefox.exe"
```
5.  Save and then restart Bash


### This project is build on:
* angular-js
* ng-boilerplate (http://joshdmiller.github.com/ng-boilerplate)


### To install a new UI module, use Bower:
```sh
$ bower install YOUR_MODULE_NAME --save-dev
```