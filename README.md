# WordPress Plugin Boilerplate #

This is a basic bootstrap to develop WordPress plugins using **Grunt**, **Compass**, **GIT** and **SVN**.  
You will use your GIT repository as plugin development environment and the WordPress plugin repository as production environment.  
Being possible to run commands with the Grunt to deploy its new versions.

This project was made based on [WordPress-Plugin-Boilerplate by tommcfarlin](https://github.com/tommcfarlin/WordPress-Plugin-Boilerplate).

## Requirements: ##

* [Node.js](http://nodejs.org/)
* [Compass](http://compass-style.org/)
* [GIT](http://git-scm.com/)
* [Subversion](http://subversion.apache.org/)

## Installation: ##

Clone this repo:

```bash
$ git clone git@github.com:claudiosmweb/wordpress-plugin-bootstrap.git
```

Install the dependencies of the grunt:

```bash
$ npm install
```

Finally rename the files as you want and create your GIT repository.

## Commands: ##

Lint, compile and compress the files:

```bash
$ grunt
```

Watch the project:

```bash
$ grunt watch
```

Deploy with svn:

```bash
$ grunt deploy
```

## Changelog ##

##### 3.0.0 #####

* Updated the dependencies.
* Fixed the assets directories based on [WordPress-Plugin-Boilerplate by tommcfarlin](https://github.com/tommcfarlin/WordPress-Plugin-Boilerplate).
* Improved the grunt tasks.
* Added .jshintrc with WordPress standards.
* Fixed the `indent_style` to `tab` in .editorconfig file.

##### 2.1.0 #####

* Updated the grunt tasks.
* Improved the rsync tasks.

##### 2.0.0 #####

* Updated the grunt tasks.
* Added .editorconfig.
* Added .jshintrc.
* Removed config.rb in favor to grunt compass task.
* Improved the code.

##### 1.0.0 #####

* Initial version.

## License: ##

WordPress Plugin Boilerplate is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

WordPress Plugin Boilerplate is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

Get a copy of the GNU General Public License in <http://www.gnu.org/licenses/>.
